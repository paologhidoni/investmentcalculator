import React, { useState, Dispatch, SetStateAction } from "react";
import { InvestmentParams } from "../models/InvestmentParams";

interface Props {
  onSetInvestmentParams: Dispatch<SetStateAction<InvestmentParams | null>>;
}

const Inputform: React.FC<Props> = ({ onSetInvestmentParams }) => {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [annualInvestment, setAnnualInvestment] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [investmentDuration, setInvestmentDuration] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedInitialInvestment = parseInt(initialInvestment);
    const parsedAnnualInvestment = parseInt(annualInvestment);
    const parsedExpectedReturn = parseInt(expectedReturn);
    const parsedInvestmentDuration = parseInt(investmentDuration);

    onSetInvestmentParams({
      initialInv: parsedInitialInvestment,
      annualInv: parsedAnnualInvestment,
      expectedReturn: parsedExpectedReturn,
      invDuration: parsedInvestmentDuration,
    });
  };

  const validateInput = (inputId: string, inputValue: string) => {
    setErrors((prev) => {
      const parsedInput = parseInt(inputValue);
      const errors = [...prev];

      if (isNaN(parsedInput) || parsedInput < 0) {
        if (!errors.includes(inputId)) {
          errors.push(inputId);
        }
      } else {
        const inputElIndex = errors.indexOf(inputId);
        if (inputElIndex !== -1) {
          errors.splice(inputElIndex, 1);
        }
      }
      return errors;
    });

    setTouched((prev) => ({
      ...prev,
      [inputId]: true,
    }));
  };

  return (
    <section className="col-span-1 row-span-1 p-6 rounded-lg">
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* INITIAL INVESTMENT */}
        <div className="flex flex-col">
          <label
            htmlFor="initial-investment"
            className="mb-2 text-lg font-semibold"
          >
            Initial investment
          </label>

          <input
            value={initialInvestment}
            min="0"
            onChange={(e) => {
              setInitialInvestment(e.target.value);
              validateInput(e.target.id, e.target.value);
            }}
            type="number"
            id="initial-investment"
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.includes("initial-investment")
                ? "border-red-500 focus:ring-red-500"
                : ""
            }`}
          />

          {errors.includes("initial-investment") && (
            <p className="text-red-500">Please fill in this field.</p>
          )}
        </div>

        {/* ANNUAL INVESTMENT */}
        <div className="flex flex-col">
          <label
            htmlFor="annual-investment"
            className="mb-2 text-lg font-semibold"
          >
            Annual investment
          </label>

          <input
            value={annualInvestment}
            min="0"
            onChange={(e) => {
              setAnnualInvestment(e.target.value);
              validateInput(e.target.id, e.target.value);
            }}
            type="number"
            id="annual-investment"
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.includes("annual-investment")
                ? "border-red-500 focus:ring-red-500"
                : ""
            }`}
          />

          {errors.includes("annual-investment") && (
            <p className="text-red-500">Please fill in this field.</p>
          )}
        </div>

        {/* EXPECTED RETURN */}
        <div className="flex flex-col">
          <label
            htmlFor="expected-return"
            className="mb-2 text-lg font-semibold"
          >
            Expected return
          </label>

          <input
            value={expectedReturn}
            min="0"
            onChange={(e) => {
              setExpectedReturn(e.target.value);
              validateInput(e.target.id, e.target.value);
            }}
            type="number"
            id="expected-return"
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.includes("expected-return")
                ? "border-red-500 focus:ring-red-500"
                : ""
            }`}
          />

          {errors.includes("expected-return") && (
            <p className="text-red-500">Please fill in this field.</p>
          )}
        </div>

        {/* INVESTMENT DURATION */}
        <div className="flex flex-col">
          <label htmlFor="duration" className="mb-2 text-lg font-semibold">
            Duration
          </label>
          <input
            value={investmentDuration}
            min="0"
            onChange={(e) => {
              setInvestmentDuration(e.target.value);
              validateInput(e.target.id, e.target.value);
            }}
            type="number"
            id="duration"
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.includes("duration")
                ? "border-red-500 focus:ring-red-500"
                : ""
            }`}
          />
          {errors.includes("duration") && (
            <p className="text-red-500">Please fill in this field.</p>
          )}{" "}
        </div>

        <button
          type="submit"
          className={`px-6 py-3 mt-4 cursor-pointer bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed}`}
          disabled={
            errors.length > 0 ||
            !initialInvestment ||
            !annualInvestment ||
            !expectedReturn ||
            !investmentDuration
          }
        >
          Submit
        </button>
        {(errors.length > 0 ||
          (Object.keys(touched).length === 4 && // Ensure all fields are touched
            (!initialInvestment ||
              !annualInvestment ||
              !expectedReturn ||
              !investmentDuration))) && (
          <p className="text-red-500">Please fill in all fields.</p>
        )}
      </form>
    </section>
  );
};

export default Inputform;
