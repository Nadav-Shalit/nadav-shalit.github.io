export function getScore(timeRemaing, targetTime) {
  return Math.round((1 - timeRemaing / (targetTime * 1000)) * 100).toFixed(0);
}
