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
            <table
              role="table"
              className="block bg-(--secondary-color) text-white px-1 py-4 rounded-sm text-center text-xs lg:text-base space-y-1.5"
              aria-labelledby="investment-breakdown-heading"
            >
              {/* Header Row */}
              <thead role="rowgroup" className="block">
                <tr
                  role="row"
                  className="grid grid-cols-[0.4fr_1.2fr_1.2fr_1.2fr] gap-x-1.5 gap-y-1.5"
                >
                  <th className="font-bold" role="columnheader">
                    Year
                  </th>
                  <th className="font-bold" role="columnheader">
                    Contribution
                  </th>
                  <th className="font-bold" role="columnheader">
                    Interest
                  </th>
                  <th className="font-bold" role="columnheader">
                    Investment Value
                  </th>
                </tr>
              </thead>

              {/* Data Rows */}
              <tbody role="rowgroup" className="block">
                {investmentResults.yearsProjection.map((entry, i) => (
                  <tr
                    role="row"
                    key={entry.id}
                    className={`grid grid-cols-[0.4fr_1.2fr_1.2fr_1.2fr] gap-x-1.5 mb-1.5 ${
                      i % 2 === 0 ? "bg-[--secondary-color_t2]" : ""
                    }`}
                  >
                    <td
                      role="rowheader"
                      className={`font-medium italic ${
                        i % 2 === 0 ? "bg-(--secondary-color_t2)" : ""
                      }`}
                    >
                      {entry.year}
                    </td>
                    <td
                      role="cell"
                      className={`${
                        i % 2 === 0 ? "bg-(--secondary-color_t2)" : ""
                      }`}
                    >
                      {formatCurrency(
                        entry.yearlyInvestment,
                        investmentResults.currency
                      )}
                    </td>
                    <td
                      role="cell"
                      className={`${
                        i % 2 === 0 ? "bg-(--secondary-color_t2)" : ""
                      }`}
                    >
                      {formatCurrency(
                        entry.interest,
                        investmentResults.currency
                      )}
                    </td>
                    <td
                      role="cell"
                      className={`${
                        i % 2 === 0 ? "bg-(--secondary-color_t2)" : ""
                      }`}
                    >
                      {formatCurrency(
                        entry.investmentTotal,
                        investmentResults.currency
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default InvestmentData;
