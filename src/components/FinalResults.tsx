import React from "react";
/* models */
import { InvestmentResults } from "../models/InvestmentResults";

interface Props {
  investmentResults: InvestmentResults | null;
}

const FinalResults: React.FC<Props> = ({ investmentResults }) => {
  return (
    <div className="grid grid-cols-3 text-center mb-2 md:mb-3 bg-(--primary-color) px-1 py-3 border-x-4 border-(--secondary-color) rounded-sm text-xs lg:text-base">
      <h2 className="font-bold mb-1">Tot contributions</h2>
      <h2 className="font-bold mb-1">Tot returns</h2>
      <h2 className="font-bold mb-1">Final value</h2>

      <div className="font-medium">{investmentResults?.totalContributions}</div>
      <div className="font-medium">{investmentResults?.totalReturns}</div>
      <div className="font-medium">
        {investmentResults?.finalInvestmentValue}
      </div>
    </div>
  );
};

export default FinalResults;
