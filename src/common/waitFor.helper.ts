/**
 * Wait for milliseconds
 * @param n {number}
 */
export function waitFor(n: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, n);
  });
}
