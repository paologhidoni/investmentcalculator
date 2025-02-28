import React from "react";
/* models */
import { InvestmentResults } from "../models/InvestmentResults";

interface Props {
  investmentResults: InvestmentResults | null;
}

const FinalResults: React.FC<Props> = ({ investmentResults }) => {
  return (
    <div className="grid grid-cols-3 text-center mb-2 md:mb-3 bg-(--primary-color) px-1 py-3 border-x-4 border-(--secondary-color) rounded-sm font-bold">
      <h2 className="mb-1 text-sm md:text-base">Tot contributions</h2>
      <h2 className="mb-1 text-sm md:text-base">Tot interest</h2>
      <h2 className="mb-1 text-sm md:text-base">Final value</h2>

      <div className="text-[0.9rem] md:text-base italic">
        {investmentResults?.totalContributions}
      </div>
      <div className="text-[0.9rem] md:text-base italic">
        {investmentResults?.totalReturns}
      </div>
      <div className="text-[0.9rem] md:text-base italic">
        {investmentResults?.finalInvestmentValue}
      </div>
    </div>
  );
};

export default FinalResults;
