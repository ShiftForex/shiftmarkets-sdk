import { BigNumber } from 'bignumber.js';

type BigNumberable = string | number | BigNumber;

export const toPositiveBigNumber = (value: BigNumberable) => new BigNumber(value);
/**
 * Set values as BigNumber by exact keys
 * @param object
 * @param keys
 */
export const fieldToBN = <T = object>(obj: T, ...fields: (keyof T)[]) => {
  if (!obj) return;
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const value = obj[field] as unknown as string;
    if (!value) continue;
    obj[field] = toPositiveBigNumber(value) as any;
  }
};
