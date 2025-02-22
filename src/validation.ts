import { InvestmentParams } from "./models/InvestmentParams";

// check if the form is incomplete for styling and validation
export const isFormIncomplete = (formState: InvestmentParams): boolean => {
  if (
    formState["investmentDuration"] === "0" ||
    formState["investmentDuration"] === ""
  )
    return true;

  let inputs = [
    "initialInvestment",
    "annualInvestment",
    "expectedReturn",
    "investmentDuration",
  ];

  return inputs.every((input) => {
    const value = formState[input as keyof InvestmentParams].trim();
    return value === "" || value === "0";
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
