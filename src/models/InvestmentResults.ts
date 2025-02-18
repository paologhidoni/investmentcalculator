import { YearlyProjection } from "./YearlyProjection";

export interface InvestmentResults {
  initialInvestment: number;
  yearsProjection: YearlyProjection[];
  totalContributions: number; // tracks only what the user invested over time
  totalReturns: number;
  finalInvestmentValue: number;
}
