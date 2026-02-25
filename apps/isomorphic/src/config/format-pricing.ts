export const formatPrice = (
  value?: number | string | null,
  decimals: number = 2,
  showSymbol: boolean = true
): string => {
  if (value === null) {
    return '-';
  }
  if (value === undefined || value === '')
    return showSymbol ? '₹ 0.00' : '0.00';

  const num = Number(value);
  if (Number.isNaN(num)) return showSymbol ? '₹ 0.00' : '0.00';

  const formatted = num.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return showSymbol ? `₹ ${formatted}` : formatted;
};
