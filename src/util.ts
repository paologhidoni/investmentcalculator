export const formatCurrency = (num: number, currency = "GBP") => {
  const formattedCurrency = num.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // Remove the currency symbol and add a non-breaking space manually
  const symbol = formattedCurrency.replace(/[0-9.,]/g, "").trim(); // Extract the currency symbol
  const value = formattedCurrency.replace(symbol, "").trim(); // Extract the value without the symbol

  return symbol + "\u00A0" + value; // \u00A0 is the non-breaking space
};
