import React from "react";
/* models */
import { InvestmentResults } from "../models/InvestmentResults";

interface Props {
  investmentResults: InvestmentResults | null;
}

const FinalResults: React.FC<Props> = ({ investmentResults }) => {
  return (
    <div className="grid grid-cols-3 text-center mb-2 md:mb-3 bg-(--primary-color) px-1 py-3 border-x-4 border-(--secondary-color) rounded-b-sm font-bold">
      {/* Tot contributions */}
      <div
        aria-label={`Total investment contributions: ${investmentResults?.totalContributions}`}
      >
        <h2
          className="mb-0.5 text-sm md:text-base"
          aria-hidden={true}
          tabIndex={-1}
        >
          Tot contributions
        </h2>
        <span
          className="text-[0.9rem] md:text-base italic"
          aria-hidden={true}
          tabIndex={-1}
        >
          {investmentResults?.totalContributions}
        </span>
      </div>

      {/* Tot interest */}
      <div
        aria-label={`Total investment interest: ${investmentResults?.totalReturns}`}
      >
        <h2
          className="mb-0.5 text-sm md:text-base"
          aria-hidden={true}
          tabIndex={-1}
        >
          Tot interest
        </h2>
        <span
          className="text-[0.9rem] md:text-base italic"
          aria-hidden={true}
          tabIndex={-1}
        >
          {investmentResults?.totalReturns}
        </span>
      </div>

      {/* Final value */}
      <div
        aria-label={`Final investment value: ${investmentResults?.finalInvestmentValue}`}
      >
        <h2
          className="mb-0.5 text-sm md:text-base"
          aria-hidden={true}
          tabIndex={-1}
        >
          Final value
        </h2>
        <span
          className="text-[0.9rem] md:text-base italic"
          aria-hidden={true}
          tabIndex={-1}
        >
          {investmentResults?.finalInvestmentValue}
        </span>
      </div>
    </div>
  );
};

export default FinalResults;
