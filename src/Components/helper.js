function getTicket(n) {
  let arr = [n];
  for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * 10);
  }
  return arr;
}

function sum(arr) {
  return arr.reduce((sum, val) => sum + val);
}
export { getTicket, sum };
