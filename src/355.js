/**
 * Initialize your data structure here.
 */
var Twitter = function() {
  this.userPool = new UserPool(User, Tweet);
  this.sliceLimit = 10;
};

/**
 * Compose a new tweet.
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
  const user = this.userPool.get(userId);
  user.post(tweetId);
};

/**
 * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent.
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
  const user = this.userPool.get(userId);
  const userFollowing = user.following.map(id => this.userPool.get(id));
  const userPosts = user.posts.slice(0 - this.sliceLimit);
  const userFollowingPosts = [];
  for (let following of userFollowing) {
    userFollowingPosts.push(...following.posts.slice(0 - this.sliceLimit));
  }
  const allPosts = [...userPosts, ...userFollowingPosts];
  allPosts
    .sort((tweetA, tweetB) => tweetA.timestamp - tweetB.timestamp)
    .reverse();
  return allPosts.slice(0, this.sliceLimit).map(tweet => tweet.id);
};

/**
 * Follower follows a followee. If the operation is invalid, it should be a no-op.
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
  const user = this.userPool.get(followerId);
  user.follow(followeeId);
};

/**
 * Follower unfollows a followee. If the operation is invalid, it should be a no-op.
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
  const user = this.userPool.get(followerId);
  user.unfollow(followeeId);
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */

class User {
  constructor(id, Tweet) {
    this.id = id;
    this.following = [];
    this.followers = [];
    this.Tweet = Tweet;
    this.posts = [];
    this.tweet = new Tweet(id);
  }

  follow(id) {
    if (this.hasFollowed(id)) {
      return;
    }
    this.following.push(id);
  }

  unfollow(id) {
    if (this.isSelf(id)) {
      return;
    }
    const index = this.following.findIndex(followingId => followingId === id);
    if (index > -1) {
      this.following.splice(index, 1);
    }
  }

  post(tweetId) {
    if (this.hasTweeted(tweetId)) {
      return;
    }
    this.posts.push(new this.Tweet(this.id, tweetId));
  }

  isSelf(id) {
    return id === this.id;
  }

  hasTweeted(tweetId) {
    return this.posts.some(tweet => tweet.id === tweetId);
  }

  hasFollowed(id) {
    if (this.isSelf(id)) {
      return true;
    }
    return this.following.includes(id);
  }
}

class Tweet {
  constructor(useId, tweetId) {
    this.useId = useId;
    this.id = tweetId;
    this.timestamp = Tweet.counter++;
  }
}

Tweet.counter = 0;

class UserPool {
  constructor(User, Tweet) {
    this.User = User;
    this.Tweet = Tweet;
    this.userHash = {};
  }

  add(userId) {
    if (this.userHash[userId]) {
      return;
    }
    this.userHash[userId] = new this.User(userId, this.Tweet);
  }

  get(userId) {
    const user = this.userHash[userId];
    if (!user) {
      this.add(userId);
      return this.get(userId);
    }
    return user;
  }
}
