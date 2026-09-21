export function formatNgn(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function formatNgnShort(value: number): string {
  if (value >= 1000) {
    const k = value / 1000;
    return `₦${Number.isInteger(k) ? k : k.toFixed(1)}k`;
  }
  return `₦${value.toLocaleString("en-NG")}`;
}
