"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldToDate = void 0;
exports.fieldToDate = (obj, field) => {
    if (!obj)
        return;
    const value = obj[field];
    if (!value)
        return;
    obj[field] = new Date(value);
};
