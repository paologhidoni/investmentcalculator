import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

/* components */
import Header from "./components/Header";
import Inputform from "./components/InputForm";
import InvestmentData from "./components/InvestmentData";
import InvestmentChart from "./components/InvestmentChart";
import Footer from "./components/Footer";

/* models */
import { InvestmentParams } from "./models/InvestmentParams";
import { InvestmentResults } from "./models/InvestmentResults";
import { YearlyProjection } from "./models/YearlyProjection";
import { Currency } from "./models/Currency";

/* utils */
import { formatCurrency } from "./util";

function App() {
  const [investmentParams, setInvestmentParams] =
    useState<null | InvestmentParams>(null);
  const [investmentResults, setInvestmentResults] =
    useState<InvestmentResults | null>(null);
  const [currency, setCurrency] = useState<keyof typeof Currency>(Currency.USD);

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
        yearlyInvestment: annualInv,
        returns: yearlyReturn,
        investmentTotal: investmentTotal,
      });
    }

    setInvestmentResults({
      initialInvestment: formatCurrency(initialInv, currency),
      yearsProjection: yearlyProjections,
      totalContributions: formatCurrency(userContribution, currency),
      totalReturns: formatCurrency(totalReturns, currency),
      finalInvestmentValue: formatCurrency(investmentTotal, currency),
      currency: currency as keyof typeof Currency,
    });
  };

  const resetInvestmentResults = () => {
    setInvestmentResults(null);
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
        <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-5xl mx-auto pt-6 pb-22 gap-6">
          <div className="flex flex-col gap-6">
            {/* Input Form */}
            <Inputform
              onSetInvestmentParams={setInvestmentParams}
              resetInvestmentResults={resetInvestmentResults}
              currency={currency as keyof typeof Currency}
              setCurrency={setCurrency}
            />

            {/* Placeholder for chart */}
            <InvestmentChart
              investmentResults={investmentResults}
              currency={
                (investmentParams?.currency as keyof typeof Currency) ||
                Currency.USD
              }
            />
          </div>

          {/* Ivestment Data */}
          <InvestmentData investmentResults={investmentResults} />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
