import React from "react";
/* models */
import { InvestmentParams } from "../models/InvestmentParams";
/* utils */
import { isFormIncomplete } from "../validation";

interface Props {
  formState: InvestmentParams;
  touched: Record<string, boolean>;
  errors: string[];
  onResetForm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hasSubmitted: boolean;
}

const FormButtons: React.FC<Props> = ({
  formState,
  errors,
  touched,
  onResetForm,
  hasSubmitted,
}) => {
  const changesWereMade = () => Object.keys(touched).length > 0;

  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-end gap-4">
        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className={`px-6 py-3 mt-4 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            hasSubmitted || errors.length > 0 || isFormIncomplete(formState)
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
              : hasSubmitted
              ? "Form has been submitted. Please update your selections before submitting again"
              : "Submit investment calculation form"
          }
        >
          Submit
        </button>

        {/* CLEAR BUTTON */}
        <button
          type="button"
          onClick={onResetForm}
          className={`px-6 py-3 mt-4 font-semibold rounded-md bg-red-600 focus:outline-none focus:ring-2 focus:ring-white hover:bg-red-700 cursor-pointer`}
          aria-label="Reset form"
        >
          Reset
        </button>
      </div>

      <div className="col-span-1 md:col-span-2">
        {/* ERROR HANDLING */}
        {(hasSubmitted || Object.keys(touched).length === 4) &&
          (errors.length > 0 || isFormIncomplete(formState)) && (
            <p className="text-red-500 rounded-lg py-2 px-2 mt-1 bg-[rgba(0,0,0,0.7)] text-center font-medium text-lg">
              Please correctly fill in all fields
            </p>
          )}

        {hasSubmitted && !changesWereMade() && !isFormIncomplete(formState) && (
          <p className="text-center md:text-end">
            Please update your selections before submitting again
          </p>
        )}
      </div>
    </>
  );
};

export default FormButtons;
