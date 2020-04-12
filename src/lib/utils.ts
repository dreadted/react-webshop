import packageJSON from "../../package.json";

export const APP_INFO = {
  name: packageJSON.name,
  version: packageJSON.version,
  homepage: packageJSON.homepage,
  root: packageJSON.homepage.slice(packageJSON.homepage.lastIndexOf("/"))
};

export const getCurrencyFormat: (number: number) => string = (number: number) =>
  new Intl.NumberFormat("se-SV", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);

export const getOrderIdFormat: (
  number: number | undefined
) => string = number => String(number).replace(/(.)(?=(\d{5})+$)/g, "$1-");
