export function parseAmount(amount: string) {
  const value = Number(amount.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

export function formatAmount(value: number) {
  return `$${value}`;
}
