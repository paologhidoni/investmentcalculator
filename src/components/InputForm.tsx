import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
  forwardRef,
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
import { initialFormState, formatCurrency, navigate } from "../util";
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
  onResetInvestmentData: () => void;
}

const InputForm = forwardRef<HTMLElement, Props>(
  (
    { formState, setFormState, setInvestmentResults, onResetInvestmentData },
    ref
  ) => {
    const [errors, setErrors] = useState<string[]>([]);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    /* refs */
    const initialInvRef = useRef<HTMLInputElement | null>(null);
    const annualInvRef = useRef<HTMLInputElement | null>(null);
    const expectedRetRef = useRef<HTMLInputElement | null>(null);
    const invDurationRef = useRef<HTMLInputElement | null>(null);
    const resultsRef = ref as React.RefObject<HTMLElement>;
    const formRef = useRef<HTMLElement>(null);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setHasSubmitted(true);

      if (errors.length === 0 && !isFormIncomplete(formState)) {
        const parsedInitialInvestment = parseFloat(formState.initialInvestment);
        const parsedAnnualInvestment = parseFloat(formState.annualInvestment);
        const parsedExpectedReturn = parseFloat(formState.expectedReturn);
        const parsedInvestmentDuration = parseFloat(
          formState.investmentDuration
        );

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

        // reset touched
        setTouched({});

        // navigate user to results (chart and data)
        navigate(resultsRef, 200, false, "start");
      }

      // navigate user to first erroring field if we have errors
      if (errors.length > 0) {
        const firstErrorId = errors[0];
        switch (firstErrorId) {
          case "initial-investment":
            navigate(initialInvRef, 50, true);
            break;
          case "annual-investment":
            navigate(annualInvRef, 50, true);
            break;
          case "expected-return":
            navigate(expectedRetRef, 50, true);
            break;
          case "investment-duration":
            navigate(invDurationRef, 50, true);
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

      // reset "hasSubmitted" so that we can also reset "investmentResults" when user changes input values
      setHasSubmitted(false);
    };

    // keep track of which field has been interacted with
    const handleBlur = (inputId: string) => {
      setTouched((prev) => {
        return { ...prev, [inputId]: true };
      });
    };

    const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      setFormState(initialFormState);
      setErrors([]);
      setTouched({});
      setInvestmentResults(null);
      setHasSubmitted(false);

      // navigate user to form
      navigate(formRef, 200);
    };

    const checkValidation = () => {
      const newErrors: string[] = [];

      if (
        isInvalidInput(
          formState.initialInvestment,
          touched["initial-investment"]
        )
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

      if (!hasSubmitted) {
        onResetInvestmentData();
      }

      // Reset hasSubmitted if user interacts with the form after submission
      if (hasSubmitted && Object.keys(touched).length > 0) {
        setHasSubmitted(false);
      }
    }, [formState, touched]);

    return (
      <section ref={formRef} className="p-0 md:p-6 rounded-lg">
        <form
          onSubmit={handleFormSubmit}
          className="grid gri-cols-1 md:grid-cols-2 gap-4"
        >
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
            step="1"
            validationFunc={isInvestmentDurationInvalid}
            min="1"
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
            hasSubmitted={hasSubmitted}
          />
        </form>
      </section>
    );
  }
);

export default InputForm;
