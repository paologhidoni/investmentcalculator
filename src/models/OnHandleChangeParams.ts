import { Currency } from "./Currency";
export type OnHandleChangeParams = (
  inputId: string,
  inputValue: string | keyof typeof Currency
) => void;
