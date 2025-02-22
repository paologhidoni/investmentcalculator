import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { v4 as uuidv4 } from "uuid";
/* components */
import Input from "./Input";
import FormButtons from "./FormButtons";
/* models */
import { InvestmentParams } from "../models/InvestmentParams";
import { InvestmentResults } from "../models/InvestmentResults";
import { Currency } from "../models/Currency";
import { OnHandleChangeParams } from "../models/OnHandleChangeParams";
import { YearlyProjection } from "../models/YearlyProjection";
import { currencies } from "../models/Currency";
/* utils */
import { initialFormState, formatCurrency } from "../util";
/* fields validation */
import {
  isInvalidInput,
  isFormIncomplete,
  isInvestmentDurationInvalid,
} from "../validation";

interface Props {
  formState: InvestmentParams;
  setFormState: Dispatch<SetStateAction<InvestmentParams>>;
  setInvestmentResults: Dispatch<SetStateAction<InvestmentResults | null>>;
}

const InputForm: React.FC<Props> = ({
  formState,
  setFormState,
  setInvestmentResults,
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const initialInvRef = useRef<HTMLInputElement | null>(null);
  const annualInvRef = useRef<HTMLInputElement | null>(null);
  const expectedRetRef = useRef<HTMLInputElement | null>(null);
  const invDurationRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched((prev) => {
      return { ...prev, ["submit-btn"]: true };
    });

    if (errors.length === 0 && !isFormIncomplete(formState)) {
      const parsedInitialInvestment = parseFloat(formState.initialInvestment);
      const parsedAnnualInvestment = parseFloat(formState.annualInvestment);
      const parsedExpectedReturn = parseFloat(formState.expectedReturn);
      const parsedInvestmentDuration = parseFloat(formState.investmentDuration);

      const yearlyProjections: YearlyProjection[] = [];
      let userContribution = parsedInitialInvestment;
      let investmentTotal = parsedInitialInvestment;
      let totalReturns = 0;

      // Loop to calculate projections
      for (let year = 1; year <= parsedInvestmentDuration; year++) {
        const yearlyReturn = (investmentTotal * parsedExpectedReturn) / 100;
        userContribution += parsedAnnualInvestment;
        investmentTotal += yearlyReturn + parsedAnnualInvestment;
        totalReturns += yearlyReturn;

        yearlyProjections.push({
          id: uuidv4(),
          year: new Date().getUTCFullYear() + year,
          yearlyInvestment: parsedAnnualInvestment,
          returns: yearlyReturn,
          investmentTotal: investmentTotal,
        });
      }

      // Set the investment results
      setInvestmentResults({
        initialInvestment: formatCurrency(
          parsedAnnualInvestment,
          formState.investmentCurrency
        ),
        yearsProjection: yearlyProjections,
        totalContributions: formatCurrency(
          userContribution,
          formState.investmentCurrency
        ),
        totalReturns: formatCurrency(
          totalReturns,
          formState.investmentCurrency
        ),
        finalInvestmentValue: formatCurrency(
          investmentTotal,
          formState.investmentCurrency
        ),
        currency: formState.investmentCurrency as keyof typeof Currency,
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

  const handleChange: OnHandleChangeParams = (inputId, inputValue) => {
    // extrapolate id to identfy field to update in state
    const splitId = inputId.split("-");
    const id =
      splitId[0] + splitId[1][0].toUpperCase() + splitId[1].substring(1);

    setFormState((prev) => {
      return {
        ...prev,
        [id]: inputValue,
      };
    });
  };

  // keep track of which field has been interacted with
  const handleBlur = (inputId: string) => {
    setTouched((prev) => {
      return { ...prev, [inputId]: true };
    });
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setErrors([]);
    setTouched({});
    setInvestmentResults(null);
  };

  const checkValidation = () => {
    const newErrors: string[] = [];

    if (
      isInvalidInput(formState.initialInvestment, touched["initial-investment"])
    )
      newErrors.push("initial-investment");
    if (
      isInvalidInput(formState.annualInvestment, touched["annual-investment"])
    )
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

    setErrors(newErrors);
  };

  // update errors state when the value of an input changes, if it has been interacted with
  useEffect(() => {
    checkValidation();
  }, [formState, touched]);

  return (
    <section className="col-span-1 row-span-1 p-0 md:p-6 rounded-lg">
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* INITIAL INVESTMENT */}
        <Input
          id="initial-investment"
          label="Initial investment"
          value={formState.initialInvestment}
          onHandleChange={handleChange}
          errors={errors}
          handleBlur={handleBlur}
          touched={touched}
          ref={initialInvRef}
          validationFunc={isInvalidInput}
        />

        {/* ANNUAL INVESTMENT */}
        <Input
          id="annual-investment"
          label="Annual investment"
          value={formState.annualInvestment}
          onHandleChange={handleChange}
          errors={errors}
          handleBlur={handleBlur}
          touched={touched}
          ref={annualInvRef}
          validationFunc={isInvalidInput}
        />

        {/* EXPECTED RETURN */}
        <Input
          id="expected-return"
          label="Expected yearly return (%)"
          value={formState.expectedReturn}
          onHandleChange={handleChange}
          errors={errors}
          handleBlur={handleBlur}
          touched={touched}
          ref={expectedRetRef}
          validationFunc={isInvalidInput}
        />

        {/* INVESTMENT DURATION */}
        <Input
          id="investment-duration"
          label="Investment duration (years)"
          value={formState.investmentDuration}
          onHandleChange={handleChange}
          errors={errors}
          handleBlur={handleBlur}
          touched={touched}
          ref={invDurationRef}
          step={"1"}
          validationFunc={isInvestmentDurationInvalid}
        />

        {/* CURRENCY SELECTOR */}
        <Input
          type="select"
          id="investment-currency"
          label="Currency"
          value={formState.investmentCurrency}
          onHandleChange={handleChange}
          errors={errors}
          handleBlur={handleBlur}
          options={currencies}
        ></Input>

        {/* FORM BUTTONS */}
        <FormButtons
          formState={formState}
          errors={errors}
          touched={touched}
          onResetForm={resetForm}
        />
      </form>
    </section>
  );
};

export default InputForm;
