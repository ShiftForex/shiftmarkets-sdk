"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldToBN = exports.toPositiveBigNumber = void 0;
const bignumber_js_1 = require("bignumber.js");
exports.toPositiveBigNumber = (value) => new bignumber_js_1.BigNumber(value);
/**
 * Set values as BigNumber by exact keys
 * @param object
 * @param keys
 */
exports.fieldToBN = (obj, ...fields) => {
    if (!obj)
        return;
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const value = obj[field];
        if (!value)
            continue;
        obj[field] = exports.toPositiveBigNumber(value);
    }
};
