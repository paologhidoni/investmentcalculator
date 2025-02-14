import { useState, useEffect } from "react";
import "./App.css";

/* components */
import Header from "./components/Header";
import Inputform from "./components/InputForm";

/* models */
import { InvestmentParams } from "./models/InvestmentParams";

function App() {
  const [investmentParams, setInvestmentParams] =
    useState<null | InvestmentParams>(null);

  useEffect(() => {
    console.log(investmentParams);
  }, [investmentParams]);

  return (
    <>
      <Header />

      <div className="px-4 bg-(--secondary-color) min-h-screen text-white">
        <main className="md:max-w-5xl mx-auto py-6 grid grid-cols-2 grid-rows-2 gap-6">
          {/* Input Form */}
          <Inputform onSetInvestmentParams={setInvestmentParams} />

          {/* Placeholder for Data (spans both rows vertically) */}
          <div className="col-span-1 row-span-2 p-6 bg-white rounded-lg">
            <h2 className="font-semibold text-lg mb-4">Investment Data</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-gray-700">Year</div>
              <div className="text-gray-700">Investment</div>
              <div className="text-gray-700">Returns</div>
              <div className="text-gray-700">2024</div>
              <div className="text-gray-700">$1,000</div>
              <div className="text-gray-700">$100</div>
            </div>
          </div>

          {/* Placeholder for chart */}
          <div className="col-span-1 row-span-1 p-6 bg-gray-100 rounded-lg">
            <h2 className="font-semibold text-lg mb-4">Investment Chart</h2>
            <div className="bg-gray-300 h-40 rounded-lg"></div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
