"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitFor = void 0;
/**
 * Wait for milliseconds
 * @param n {number}
 */
function waitFor(n) {
    return new Promise((resolve) => {
        setTimeout(resolve, n);
    });
}
exports.waitFor = waitFor;
//# sourceMappingURL=waitFor.helper.js.map