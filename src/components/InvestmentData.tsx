import React from "react";

/* models */
import { InvestmentResults } from "../models/InvestmentResults";

interface Props {
  investmentResults: InvestmentResults | null;
}

const InvestmentData: React.FC<Props> = ({ investmentResults }) => {
  return (
    <section id="investment-data">
      <div className="col-span-1 md:row-span-2 p-6 bg-white rounded-lg text-gray-700">
        {/* Single Grid for Header + Data */}
        <div className="grid grid-cols-[50px_auto_auto_auto] gap-1.5 text-center">
          {/* Header Row */}
          <div className="font-medium">Year</div>
          <div className="font-medium">Investment</div>
          <div className="font-medium">Returns</div>
          <div className="font-medium">Tot Investment</div>

          {/* Data Rows */}
          {investmentResults &&
            investmentResults.yearsProjection.map((entry, index) => (
              <React.Fragment key={entry.id}>
                <div className="font-medium italic">{entry.year}</div>
                <div>{entry.yearlyInvestment}</div>
                <div>{entry.returns}</div>
                <div>{entry.investmentTotal}</div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentData;
