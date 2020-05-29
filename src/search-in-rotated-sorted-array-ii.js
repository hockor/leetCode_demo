function search(nums, target) {
  const [first] = nums;
  const last = nums[nums.length - 1];
  if (target < first && target > last) {
    return false;
  }
  if (target === first || target === last) {
    return true;
  }
  if (target > first) {
    let lastNum = first;
    for (let i = 1; i < nums.length; i++) {
      const current = nums[i];
      if (target === current) {
        return true;
      }
      if (current < lastNum) {
        return false;
      }
      lastNum = current;
    }
  }
  if (target < last) {
    let lastNum = last;
    for (let i = nums.length - 2; i >= 0; i--) {
      const current = nums[i];
      if (target === current) {
        return true;
      }
      if (current > lastNum) {
        return false;
      }
      lastNum = current;
    }
  }
  return false;
}
