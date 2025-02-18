import { forwardRef } from "react";
import { Currency } from "../models/Currency";
import { HandleValueUpdate } from "../models/HandleValueUpdate";

interface Props {
  id: string;
  label: string;
  value: string;
  handleValueUpdate: HandleValueUpdate;
  errors: string[];
  handleBlur: (id: string) => void;
  type?: string;
  options?: string[];
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      value,
      handleValueUpdate,
      errors = [],
      handleBlur,
      type = "text",
      options,
    },
    ref
  ) => {
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
              handleValueUpdate(e.target.value as keyof typeof Currency)
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
            onChange={(e) =>
              type === "select"
                ? handleValueUpdate(e.target.value as keyof typeof Currency)
                : handleValueUpdate(e.target.value)
            }
            type={type === "number" ? "number" : "text"}
            step="any"
            min="0"
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-[45px] ${
              errors.includes(id) ? "border-red-500 focus:ring-red-500" : ""
            }`}
            aria-describedby={errors.includes(id) ? `${id}-error` : undefined}
          />
        )}

        {errors.includes(id) && (
          <p id={`${id}-error`} className="text-red-500" aria-live="assertive">
            Please fill in this field.
          </p>
        )}
      </div>
    );
  }
);

export default Input;
