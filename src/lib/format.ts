const currencyFormatter = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number, currency = "CZK") {
  if (currency !== "CZK") {
    return new Intl.NumberFormat("cs-CZ", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return currencyFormatter.format(amount);
}

export function formatAreaSqm(area: number) {
  return `${area.toLocaleString("cs-CZ")} m²`;
}

export function formatBedsBaths(beds: number, baths: number) {
  return `${beds} bd · ${baths} ba`;
}

