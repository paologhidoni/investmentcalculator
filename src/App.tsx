import { useState } from "react";
import "./App.css";
/* components */
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import InvestmentData from "./components/InvestmentData";
import InvestmentChart from "./components/InvestmentChart";
import Footer from "./components/Footer";
/* models */
import { InvestmentParams } from "./models/InvestmentParams";
import { InvestmentResults } from "./models/InvestmentResults";
/* utils */
import { initialFormState } from "./util";

function App() {
  const [formState, setFormState] =
    useState<InvestmentParams>(initialFormState);
  const [investmentResults, setInvestmentResults] =
    useState<InvestmentResults | null>(null);

  const resetInvesmentData = (): void => {
    setInvestmentResults(null);
  };

  return (
    <>
      <Header />

      <div className="px-4 bg-(--secondary-color) min-h-screen text-white">
        <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-5xl mx-auto pt-6 pb-22 gap-6">
          <div className="flex flex-col gap-6">
            {/* Input Form */}
            <InputForm
              formState={formState}
              setFormState={setFormState}
              setInvestmentResults={setInvestmentResults}
              onResetInvestmentData={resetInvesmentData}
            />

            {/* Chart */}
            <InvestmentChart investmentResults={investmentResults} />
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
