import React from "react";
import { GrMoney } from "react-icons/gr";
import { formatCurrency } from "../util";
/* components */
import FinalResults from "./FinalResults";
/* models */
import { InvestmentResults } from "../models/InvestmentResults";
import Heading from "./Heading";

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
          <Heading id="investment-breakdown-heading">
            Investment Breakdown
          </Heading>
          <FinalResults investmentResults={investmentResults} />

          <div>
            {/* TABLE */}
            <div
              role="table"
              className="bg-(--secondary-color) text-white px-1 py-4 rounded-sm text-center text-xs lg:text-base space-y-1.5"
              aria-labelledby="investment-breakdown-heading"
            >
              {/* Header Row */}
              <div role="rowgroup">
                <div
                  role="row"
                  className="grid grid-cols-[60px_1fr_1fr_1fr] gap-x-1.5 gap-y-1.5"
                >
                  <h3 className="font-bold" role="columnheader">
                    Year
                  </h3>
                  <h3 className="font-bold" role="columnheader">
                    Contribution
                  </h3>
                  <h3 className="font-bold" role="columnheader">
                    Interest
                  </h3>
                  <h3 className="font-bold" role="columnheader">
                    Investment Value
                  </h3>
                </div>
              </div>

              {/* Data Rows */}
              <div role="rowgroup">
                {investmentResults.yearsProjection.map((entry, i) => (
                  <div
                    role="row"
                    key={entry.id}
                    className={`grid grid-cols-[60px_1fr_1fr_1fr] gap-x-1.5 mb-1.5 ${
                      i % 2 === 0 ? "bg-[--secondary-color_t2]" : ""
                    }`}
                  >
                    <div
                      role="rowheader"
                      className={`font-medium italic ${
                        i % 2 === 0 ? "bg-(--secondary-color_t2)" : ""
                      }`}
                    >
                      {entry.year}
                    </div>
                    <div
                      role="cell"
                      className={`${
                        i % 2 === 0 ? "bg-(--secondary-color_t2)" : ""
                      }`}
                    >
                      {formatCurrency(
                        entry.yearlyInvestment,
                        investmentResults.currency
                      )}
                    </div>
                    <div
                      role="cell"
                      className={`${
                        i % 2 === 0 ? "bg-(--secondary-color_t2)" : ""
                      }`}
                    >
                      {formatCurrency(
                        entry.interest,
                        investmentResults.currency
                      )}
                    </div>
                    <div
                      role="cell"
                      className={`${
                        i % 2 === 0 ? "bg-(--secondary-color_t2)" : ""
                      }`}
                    >
                      {formatCurrency(
                        entry.investmentTotal,
                        investmentResults.currency
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default InvestmentData;
