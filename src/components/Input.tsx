import { Dispatch, SetStateAction, forwardRef } from "react";

interface Props {
  id: string;
  label: string;
  value: string;
  handleValueUpdate: Dispatch<SetStateAction<string>>;
  errors: string[];
  handleBlur: (id: string) => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, label, value, handleValueUpdate, errors, handleBlur }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-2 text-lg font-semibold">
          {label}
        </label>

        <input
          ref={ref}
          onBlur={() => handleBlur(id)}
          value={value}
          step="any"
          min="0"
          onChange={(e) => {
            handleValueUpdate(e.target.value);
          }}
          type="number"
          id={id}
          className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.includes(id) ? "border-red-500 focus:ring-red-500" : ""
          }`}
          aria-describedby={errors.includes(id) ? `${id}-error` : undefined}
        />

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
