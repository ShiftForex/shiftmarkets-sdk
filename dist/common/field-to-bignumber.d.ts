import { BigNumber } from 'bignumber.js';
declare type BigNumberable = string | number | BigNumber;
export declare const toPositiveBigNumber: (value: BigNumberable) => BigNumber;
/**
 * Set values as BigNumber by exact keys
 * @param object
 * @param keys
 */
export declare const fieldToBN: <T = object>(obj: T, ...fields: (keyof T)[]) => void;
export {};
