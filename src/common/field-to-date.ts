export const fieldToDate = <T = object>(obj: T, field: keyof T) => {
  if (!obj) return;
  const value = obj[field] as unknown as string;
  if (!value) return;
  obj[field] = new Date(value) as any;
}
