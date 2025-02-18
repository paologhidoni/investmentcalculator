import { Currency } from "./Currency";
export type HandleValueUpdate = (value: string | keyof typeof Currency) => void;
