"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identificator = void 0;
const randomString = () => Math.random().toString(36).substring(2, 15);
exports.identificator = () => `${randomString()}${randomString()}`;
//# sourceMappingURL=identificator.helper.js.map