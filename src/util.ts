export const formatCurrency = (num: number, currency = "USD") => {
  return num.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
