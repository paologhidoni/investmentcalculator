import { InvestmentParams } from "./models/InvestmentParams";
import { InvestmentResults } from "./models/InvestmentResults";
import { YearlyProjection } from "./models/YearlyProjection";
import { Currency } from "./models/Currency";
import { v4 as uuidv4 } from "uuid";

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

export const calculateInvestmentResults = (
  formState: InvestmentParams
): InvestmentResults => {
  // parse inputs and validate
  const parsedInitialInvestment = parseFloat(formState.initialInvestment);
  const parsedAnnualInvestment = parseFloat(formState.annualInvestment);
  const parsedExpectedReturn = parseFloat(formState.expectedReturn);
  const parsedInvestmentDuration = parseFloat(formState.investmentDuration);

  const yearlyProjections: YearlyProjection[] = [];
  let totalContributions = parsedInitialInvestment;
  let investmentTotal = parsedInitialInvestment;
  let totalReturns = 0;

  // Loop to generate projections
  for (let year = 0; year < parsedInvestmentDuration; year++) {
    const interestEarnedInYear = (investmentTotal * parsedExpectedReturn) / 100;
    totalContributions += parsedAnnualInvestment;
    investmentTotal += interestEarnedInYear + parsedAnnualInvestment;
    totalReturns += interestEarnedInYear;

    yearlyProjections.push({
      id: uuidv4(),
      year: year + 1,
      yearlyInvestment: parsedAnnualInvestment,
      interest: interestEarnedInYear,
      investmentTotal,
    });
  }

  // format results to currency strings
  const initialInvestment = formatCurrency(
    parsedInitialInvestment,
    formState.investmentCurrency
  );
  const finalInvestmentValue = formatCurrency(
    investmentTotal,
    formState.investmentCurrency
  );
  const formattedTotalContributions = formatCurrency(
    totalContributions,
    formState.investmentCurrency
  );
  const formattedTotalReturns = formatCurrency(
    totalReturns,
    formState.investmentCurrency
  );

  return {
    initialInvestment,
    yearsProjection: yearlyProjections,
    totalContributions: formattedTotalContributions,
    totalReturns: formattedTotalReturns,
    finalInvestmentValue,
    currency: formState.investmentCurrency as keyof typeof Currency,
  };
};
