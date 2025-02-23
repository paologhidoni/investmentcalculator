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

export const initialFormState: InvestmentParams = {
  initialInvestment: "",
  annualInvestment: "",
  expectedReturn: "",
  investmentDuration: "",
  investmentCurrency: "USD",
};

export const navigate = (
  targetRef: React.RefObject<HTMLElement | HTMLInputElement | null>,
  timeout: number = 100,
  focus: boolean = false,
  scrollBlock: ScrollLogicalPosition = "center",
  behavior: ScrollBehavior = "smooth"
): void => {
  setTimeout(() => {
    if (targetRef.current && targetRef.current.offsetHeight > 0) {
      targetRef.current.scrollIntoView({ behavior, block: scrollBlock });
    }
  }, timeout);

  if (focus) {
    setTimeout(() => {
      if (targetRef.current) targetRef.current.focus();
    }, timeout + 400);
  }
};
