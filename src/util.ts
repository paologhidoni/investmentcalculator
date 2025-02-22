import { InvestmentParams } from "./models/InvestmentParams";

export const formatCurrency = (num: number, currency = "GBP"): string => {
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

// check if the form is incomplete for styling and validation
export const isFormIncomplete = (formState: InvestmentParams): boolean => {
  return (
    !formState.initialInvestment ||
    !formState.annualInvestment ||
    !formState.expectedReturn ||
    !formState.investmentDuration
  );
};

// check input value is an invalid number and the field has been interacted with at least once, to give feedback
export const isInvalidInput = (
  inputId: string,
  inputValue: string,
  touched: Record<string, boolean>
): boolean => {
  return touched[inputId] && (parseFloat(inputValue) < 0 || inputValue === "");
};

export const initialFormState: InvestmentParams = {
  initialInvestment: "0",
  annualInvestment: "0",
  expectedReturn: "0",
  investmentDuration: "0",
  investmentCurrency: "USD",
};
