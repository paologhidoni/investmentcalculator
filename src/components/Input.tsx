import { forwardRef } from "react";
/* models */
import { Currency } from "../models/Currency";
import { OnHandleChangeParams } from "../models/OnHandleChangeParams";

interface Props {
  id: string;
  label: string;
  value: string;
  onHandleChange: OnHandleChangeParams;
  errors: string[];
  handleBlur: (id: string) => void;
  touched?: Record<string, boolean>;
  type?: "number" | "select";
  options?: string[];
  step?: string;
  validationFunc?: (inputValue: string, touched: boolean) => string | null;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      value,
      onHandleChange,
      errors = [],
      handleBlur,
      touched,
      type = "number",
      options,
      step = "any",
      validationFunc = null,
    },
    ref
  ) => {
    const validationError = validationFunc
      ? validationFunc(value, touched ? touched[id] : false)
      : null;

    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-2 text-lg font-semibold">
          {label}
        </label>

        {/* Conditional rendering for different input types */}
        {type === "select" ? (
          <select
            id={id}
            value={value}
            onBlur={() => handleBlur(id)}
            onChange={(e) =>
              onHandleChange(id, e.target.value as keyof typeof Currency)
            }
            className={
              "px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-[45px]"
            }
            aria-describedby={errors.includes(id) ? `${id}-error` : undefined}
          >
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            ref={ref}
            value={value}
            onBlur={() => handleBlur(id)}
            onChange={(e) => onHandleChange(id, e.target.value)}
            type={type}
            step={step}
            min="0"
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-[45px] ${
              errors.includes(id) ? "border-red-500 focus:ring-red-500" : ""
            }`}
            aria-describedby={errors.includes(id) ? `${id}-error` : undefined}
          />
        )}

        {validationError !== null && (
          <p
            id={`${id}-error`}
            className="text-red-500 rounded-lg py-2 px-2 mt-1 bg-[rgba(0,0,0,0.7)] text-center font-medium text-lg"
            aria-live="assertive"
          >
            {validationError}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
