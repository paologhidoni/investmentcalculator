import { YearlyProjection } from "./YearlyProjection";

export interface InvestmentResults {
  initialInvestment: string;
  yearsProjection: YearlyProjection[];
  totalContributions: string; // tracks only what the user invested over time
  totalReturns: string;
  finalInvestmentValue: string;
}
