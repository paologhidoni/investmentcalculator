import { InvestmentParams } from "./models/InvestmentParams";

// check if the form is incomplete for styling and validation
export const isFormIncomplete = (formState: InvestmentParams): boolean => {
  let inputs = [
    "initialInvestment",
    "annualInvestment",
    "expectedReturn",
    "investmentDuration",
  ];

  return inputs.some((input) => {
    const value = formState[input as keyof InvestmentParams].trim();
    return value === "";
  });
};

export const isInvestmentDurationInvalid = (
  inputValue: string,
  inputTouched: boolean
): string | null => {
  if (inputTouched) {
    if (inputValue.trim() === "" || inputValue.trim() === "0") {
      return "Investment duration must be at least 1 year.";
    } else if (!Number.isInteger(parseFloat(inputValue))) {
      const enteredNum = parseFloat(inputValue);
      return `Enter an integer number, the closest values are ${Math.floor(
        enteredNum
      )} or ${Math.ceil(enteredNum)}`;
    }
  }

  return null;
};

export const isInvalidInput = (
  inputValue: string,
  inputTouched: boolean
): string | null => {
  if (
    inputTouched &&
    (inputValue.trim() === "" || parseFloat(inputValue) < 0)
  ) {
    return "Please enter a valid number (0 is allowed)";
  }

  return null;
};

export const checkValidation = (
  formState: InvestmentParams,
  touched: Record<string, boolean>
) => {
  const newErrors: string[] = [];

  if (
    isInvalidInput(formState.initialInvestment, touched["initial-investment"])
  )
    newErrors.push("initial-investment");
  if (isInvalidInput(formState.annualInvestment, touched["annual-investment"]))
    newErrors.push("annual-investment");
  if (isInvalidInput(formState.expectedReturn, touched["expected-return"]))
    newErrors.push("expected-return");
  if (
    isInvestmentDurationInvalid(
      formState.investmentDuration,
      touched["investment-duration"]
    )
  )
    newErrors.push("investment-duration");

  return newErrors;
};
