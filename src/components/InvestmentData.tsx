import React from "react";
import { GrMoney } from "react-icons/gr";
import { formatCurrency } from "../util";

/* components */
import FinalResults from "./FinalResults";

/* models */
import { InvestmentResults } from "../models/InvestmentResults";

interface Props {
  investmentResults: InvestmentResults | null;
}

const InvestmentData: React.FC<Props> = ({ investmentResults }) => {
  return (
    <section className="p-2 md:p-6 bg-gray-100 rounded-lg text-gray-700 ">
      {!investmentResults?.yearsProjection.length && (
        <div className="text-center text-(--secondary-color)">
          <GrMoney
            className="text-8xl inline my-12"
            aria-label="Investment results will be displayed here, once the form is submitted."
          />
        </div>
      )}

      {investmentResults && investmentResults.yearsProjection.length > 0 && (
        <>
          <FinalResults investmentResults={investmentResults} />

          <div>
            {/* Single Grid for Header + Data */}
            <div className="grid bg-(--secondary-color) text-white px-1 py-4 rounded-sm grid-cols-[60px_auto_auto_auto] gap-1.5 text-center text-xs lg:text-base">
              {/* Header Row */}
              <h3 className="font-bold">Year</h3>
              <h3 className="font-bold">Investment</h3>
              <h3 className="font-bold">Returns</h3>
              <h3 className="font-bold">Tot Investment</h3>

              {/* Data Rows */}
              {investmentResults.yearsProjection.map((entry) => (
                <React.Fragment key={entry.id}>
                  <div className="font-medium italic">{entry.year}</div>
                  <div>
                    {formatCurrency(
                      entry.yearlyInvestment,
                      investmentResults.currency
                    )}
                  </div>
                  <div>
                    {formatCurrency(entry.returns, investmentResults.currency)}
                  </div>
                  <div>
                    {formatCurrency(
                      entry.investmentTotal,
                      investmentResults.currency
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default InvestmentData;
