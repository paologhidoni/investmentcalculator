import { useState, useRef, useEffect } from "react";
import "./App.css";
/* components */
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import InvestmentData from "./components/InvestmentData";
import InvestmentChart from "./components/InvestmentChart";
import Footer from "./components/Footer";
import ScrollToTopBtn from "./components/ScrollToTopBtn";
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
  const resultsRef = useRef<HTMLElement>(null);
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  const resetInvesmentData = (): void => {
    setInvestmentResults(null);
  };

  /* show / hide scrollToTopBtn */
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled past the viewport height
      if (window.scrollY > window.innerHeight) {
        setIsScrolledPast(true);
      } else {
        setIsScrolledPast(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header />

      <div className="px-4 bg-(--secondary-color) min-h-screen text-white">
        <main className="grid grid-cols-1 md:max-w-5xl mx-auto pt-6 pb-22 gap-6">
          <div className="flex flex-col gap-6">
            {/* Input Form */}
            <InputForm
              formState={formState}
              setFormState={setFormState}
              setInvestmentResults={setInvestmentResults}
              onResetInvestmentData={resetInvesmentData}
              ref={resultsRef}
            />

            {/* Chart */}
            <InvestmentChart
              investmentResults={investmentResults}
              ref={resultsRef}
            />
          </div>

          {/* Ivestment Data */}
          <InvestmentData investmentResults={investmentResults} />
        </main>

        <Footer />
      </div>

      {isScrolledPast && <ScrollToTopBtn />}
    </>
  );
}

export default App;
