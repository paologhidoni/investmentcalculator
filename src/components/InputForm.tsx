import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";

/* models */
import { InvestmentParams } from "../models/InvestmentParams";
import { InvestmentResults } from "../models/InvestmentResults";
import { Currency } from "../models/Currency";
import { HandleValueUpdate } from "../models/HandleValueUpdate";

/* components */
import Input from "./Input";

interface Props {
  onSetInvestmentParams: Dispatch<SetStateAction<InvestmentParams | null>>;
  resetInvestmentResults: Dispatch<SetStateAction<InvestmentResults | null>>;
  currency: keyof typeof Currency;
  setCurrency: Dispatch<SetStateAction<keyof typeof Currency>>;
}

const currencies = Object.values(Currency);

const Inputform: React.FC<Props> = ({
  onSetInvestmentParams,
  resetInvestmentResults,
  currency,
  setCurrency,
}) => {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [annualInvestment, setAnnualInvestment] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [investmentDuration, setInvestmentDuration] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const initialInvRef = useRef<HTMLInputElement | null>(null);
  const annualInvRef = useRef<HTMLInputElement | null>(null);
  const expectedRetRef = useRef<HTMLInputElement | null>(null);
  const invDurationRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errors.length === 0 && !isFormIncomplete()) {
      const parsedInitialInvestment = parseFloat(initialInvestment);
      const parsedAnnualInvestment = parseFloat(annualInvestment);
      const parsedExpectedReturn = parseFloat(expectedReturn);
      const parsedInvestmentDuration = parseFloat(investmentDuration);

      onSetInvestmentParams({
        initialInv: parsedInitialInvestment,
        annualInv: parsedAnnualInvestment,
        expectedReturn: parsedExpectedReturn,
        invDuration: parsedInvestmentDuration,
        currency,
      });
    }

    // navigate user to first erroring field if we have errors
    if (errors.length > 0) {
      const firstErrorId = errors[0];
      switch (firstErrorId) {
        case "initial-investment":
          initialInvRef.current?.focus();
          break;
        case "annual-investment":
          annualInvRef.current?.focus();
          break;
        case "expected-return":
          expectedRetRef.current?.focus();
          break;
        case "investment-duration":
          invDurationRef.current?.focus();
          break;
        default:
          break;
      }
    }
  };

  // check if the form is incomplete for styling and validation
  const isFormIncomplete = (): boolean => {
    return (
      !initialInvestment ||
      !annualInvestment ||
      !expectedReturn ||
      !investmentDuration
    );
  };

  // keep track of which field has been interacted with
  const handleBlur = (inputId: string) => {
    setTouched((prev) => {
      return { ...prev, [inputId]: true };
    });
  };

  // check input value is an invalid number and the field has been interacted with at least once, to give feedback
  const isInvalidInput = (inputId: string, inputValue: string): boolean => {
    const parsedInput = parseFloat(inputValue);
    return touched[inputId] && (isNaN(parsedInput) || parsedInput < 0);
  };

  const resetForm = () => {
    setInitialInvestment("");
    setAnnualInvestment("");
    setExpectedReturn("");
    setInvestmentDuration("");
    setErrors([]);
    setTouched({});
    setCurrency(Currency.USD);
    resetInvestmentResults(null);
  };

  // update errors state when the value of an input changes, if it has been interacted with
  useEffect(() => {
    const newErrors: string[] = [];

    if (isInvalidInput("initial-investment", initialInvestment))
      newErrors.push("initial-investment");
    if (isInvalidInput("annual-investment", annualInvestment))
      newErrors.push("annual-investment");
    if (isInvalidInput("expected-return", expectedReturn))
      newErrors.push("expected-return");
    if (isInvalidInput("investment-duration", investmentDuration))
      newErrors.push("investment-duration");

    setErrors(newErrors);
  }, [
    initialInvestment,
    annualInvestment,
    expectedReturn,
    investmentDuration,
    touched,
  ]);

  return (
    <section className="col-span-1 row-span-1 p-0 md:p-6 rounded-lg">
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* INITIAL INVESTMENT */}
        <Input
          id="initial-investment"
          label="Initial investment"
          value={initialInvestment}
          handleValueUpdate={setInitialInvestment}
          errors={errors}
          handleBlur={handleBlur}
          ref={initialInvRef}
        />

        {/* ANNUAL INVESTMENT */}
        <Input
          id="annual-investment"
          label="Annual investment"
          value={annualInvestment}
          handleValueUpdate={setAnnualInvestment}
          errors={errors}
          handleBlur={handleBlur}
          ref={annualInvRef}
        />

        {/* EXPECTED RETURN */}
        <Input
          id="expected-return"
          label="Expected yearly return (%)"
          value={expectedReturn}
          handleValueUpdate={setExpectedReturn}
          errors={errors}
          handleBlur={handleBlur}
          ref={expectedRetRef}
        />

        {/* INVESTMENT DURATION */}
        <Input
          id="investment-duration"
          label="Investment duration (years)"
          value={investmentDuration}
          handleValueUpdate={setInvestmentDuration}
          errors={errors}
          handleBlur={handleBlur}
          ref={invDurationRef}
        />

        {/* CURRENCY SELECTOR */}
        <Input
          type="select"
          id="currency"
          label="Currency"
          value={currency}
          handleValueUpdate={setCurrency as HandleValueUpdate}
          errors={errors}
          handleBlur={handleBlur}
          options={currencies}
        ></Input>

        <div className="flex flex-wrap justify-between">
          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className={`px-6 py-3 mt-4 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.length > 0 || isFormIncomplete()
                ? "bg-gray-600 hover:bg-gray-700 text-gray-200 cursor-not-allowed"
                : " bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
            } }`}
            tabIndex={0}
            aria-disabled={errors.length > 0 || isFormIncomplete()}
            aria-label={
              errors.length > 0
                ? "Submit, button disabled due to invalid input"
                : isFormIncomplete()
                ? "Submit, button disabled - all fields are required"
                : "Submit investment calculation form"
            }
          >
            Submit
          </button>

          {/* CLEAR BUTTON */}
          <button
            onClick={resetForm}
            className={`px-6 py-3 mt-4 font-semibold rounded-md bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-700 cursor-pointer`}
            aria-label="Reset form"
          >
            Reset
          </button>
        </div>

        {(errors.length > 0 ||
          (Object.keys(touched).length === 4 && // Ensure all fields have been interacted with before giving fedback
            isFormIncomplete())) && (
          <p className="text-red-500">Please fill in all fields.</p>
        )}
      </form>
    </section>
  );
};

export default Inputform;
