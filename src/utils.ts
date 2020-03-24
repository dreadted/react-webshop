export const getCurrencyFormat: (number: number) => string = (number: number) =>
  new Intl.NumberFormat("se-SV", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
