export function numberToPrice(number: number) {
  return Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency', maximumFractionDigits: 0 }).format(number);
}
