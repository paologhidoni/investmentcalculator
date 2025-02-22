import React from "react";
/* models */
import { InvestmentParams } from "../models/InvestmentParams";
/* utils */
import { isFormIncomplete } from "../validation";

interface Props {
  formState: InvestmentParams;
  touched: Record<string, boolean>;
  errors: string[];
  onResetForm: () => void;
}

const FormButtons: React.FC<Props> = ({
  formState,
  errors,
  touched,
  onResetForm,
}) => {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className={`px-6 py-3 mt-4 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.length > 0 || isFormIncomplete(formState)
              ? "bg-gray-600 hover:bg-gray-700 text-gray-200 cursor-not-allowed"
              : " bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
          } }`}
          tabIndex={0}
          aria-disabled={errors.length > 0 || isFormIncomplete(formState)}
          aria-label={
            errors.length > 0
              ? "Submit, button disabled due to invalid input"
              : isFormIncomplete(formState)
              ? "Submit, button disabled - all fields are required"
              : "Submit investment calculation form"
          }
        >
          Submit
        </button>

        {/* CLEAR BUTTON */}
        <button
          type="button"
          onClick={onResetForm}
          className={`px-6 py-3 mt-4 font-semibold rounded-md bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-700 cursor-pointer`}
          aria-label="Reset form"
        >
          Reset
        </button>
      </div>

      {(touched["submit-btn"] || Object.keys(touched).length === 4) &&
        (errors.length > 0 || isFormIncomplete(formState)) && (
          <p className="text-red-500 rounded-lg py-2 px-2 mt-1 bg-[rgba(0,0,0,0.5)] text-center font-medium text-lg">
            Please correctly fill in all fields
          </p>
        )}
    </>
  );
};

export default FormButtons;
