export function formatMoney(value: number | undefined | null) {
  if (!value) return "M 0.00";
  return `M${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function shortenText(text: string, maxLength: number = 60) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
}
