export function formatMoney(value: number | undefined | null) {
  if (!value) return "M 0.00";
  return `M${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
