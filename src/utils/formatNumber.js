export function formatNumber(number) {
    if (!number) return number;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  