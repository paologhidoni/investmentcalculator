import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

/* components */
import Header from "./components/Header";
import Inputform from "./components/InputForm";
import InvestmentData from "./components/InvestmentData";

/* models */
import { InvestmentParams } from "./models/InvestmentParams";
import { InvestmentResults } from "./models/InvestmentResults";
import { YearlyProjection } from "./models/YearlyProjection";

/* utils */
import { formatCurrency } from "./util";

function App() {
  const [investmentParams, setInvestmentParams] =
    useState<null | InvestmentParams>(null);
  const [investmentResults, setInvestmentResults] =
    useState<InvestmentResults | null>(null);

  const calculateProjection = (investmentParams: InvestmentParams) => {
    const { initialInv, annualInv, expectedReturn, invDuration } =
      investmentParams;
    const yearlyProjections: YearlyProjection[] = [];
    let userContribution = initialInv;
    let investmentTotal = initialInv;
    let totalReturns = 0;

    for (let year = 1; year <= invDuration; year++) {
      const yearlyReturn = (investmentTotal * expectedReturn) / 100;
      userContribution += annualInv;
      investmentTotal += yearlyReturn + annualInv;
      totalReturns += yearlyReturn;

      yearlyProjections.push({
        id: uuidv4(),
        year: new Date().getUTCFullYear() + year,
        yearlyInvestment: formatCurrency(annualInv),
        returns: formatCurrency(yearlyReturn),
        investmentTotal: formatCurrency(investmentTotal),
      });
    }

    setInvestmentResults({
      initialInvestment: initialInv,
      yearsProjection: yearlyProjections,
      totalContributions: userContribution,
      totalReturns: totalReturns,
      finalInvestmentValue: investmentTotal,
    });
  };

  useEffect(() => {
    if (investmentParams) {
      calculateProjection(investmentParams);
    }
  }, [investmentParams]);

  return (
    <>
      <Header />

      <div className="px-4 bg-(--secondary-color) min-h-screen text-white">
        <main className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:max-w-5xl mx-auto py-6  gap-6">
          {/* Input Form */}
          <Inputform onSetInvestmentParams={setInvestmentParams} />

          {/* Placeholder for Data (spans both rows vertically) */}
          <InvestmentData investmentResults={investmentResults} />

          {/* Placeholder for chart */}
          <div className="p-6 bg-gray-100 rounded-lg">
            <div className="bg-gray-300 h-40 rounded-lg"></div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
