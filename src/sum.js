function sum(...nums) {
  return nums.reduce((acc, curr) => {
    if(typeof curr != "number") throw new TypeError('sum() expects only numbers!');
    return acc + curr;
  }, 0);
  
}

module.exports = sum;
