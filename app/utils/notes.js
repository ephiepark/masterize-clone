// @flow

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export function shuffleArray<T>(a: Array<T>): Array<T> {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // $FlowFixMe
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
