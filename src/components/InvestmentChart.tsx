import React, { useState, useEffect, forwardRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChartArea } from "react-icons/fa";
import { InvestmentResults } from "../models/InvestmentResults";
import { formatCurrency } from "../util";
/* models */
import { Currency, CurrencySymbol } from "../models/Currency";
/* components */
import RenderLegend from "./RenderLegend";
import FinalResults from "./FinalResults";

interface Props {
  investmentResults: InvestmentResults | null;
}

const InvestmentChart = forwardRef<HTMLElement, Props>(
  ({ investmentResults }, ref) => {
    const [chartData, setChartData] = useState<any[]>([]);
    const [hiddenLines, setHiddenLines] = useState<Record<string, boolean>>({
      investmentTotal: false,
      yearlyInvestment: false,
      returns: false,
    });

    const resultsRef = ref as React.RefObject<HTMLElement>;

    // Get the currency symbol
    const currencySymbol = investmentResults
      ? CurrencySymbol[investmentResults.currency]
      : CurrencySymbol[Currency.USD];

    useEffect(() => {
      if (investmentResults) {
        const updatedChartData = investmentResults.yearsProjection.map(
          (entry) => ({
            year: entry.year,
            investmentTotal: entry.investmentTotal,
            yearlyInvestment: entry.yearlyInvestment,
            returns: entry.returns,
          })
        );
        setChartData(updatedChartData);
      } else {
        setChartData([]);
      }
    }, [investmentResults]);

    // Handle legend click to toggle visibility
    const handleLegendClick = (dataKey: string) => {
      setHiddenLines((prev) => ({
        ...prev,
        [dataKey]: !prev[dataKey],
      }));
    };

    return (
      <section
        ref={resultsRef}
        className="p-2 md:p-6 bg-gray-100 rounded-lg text-gray-700"
      >
        {!chartData.length ? (
          <div className="text-center text-(--secondary-color)">
            <FaChartArea className="text-8xl inline my-12" />
          </div>
        ) : (
          <>
            <FinalResults investmentResults={investmentResults} />
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ dy: 10 }} />
                <YAxis
                  tick={{ dx: -5 }}
                  tickFormatter={(value) => {
                    if (value >= 1_000_000) {
                      return `${currencySymbol}${
                        (value / 1_000_000) % 1 === 0
                          ? value / 1_000_000
                          : (value / 1_000_000).toFixed(1)
                      }M`;
                    } else if (value >= 1_000) {
                      return `${currencySymbol}${
                        (value / 1_000) % 1 === 0
                          ? value / 1_000
                          : (value / 1_000).toFixed(1)
                      }K`;
                    }
                    return `${currencySymbol}${value.toFixed(0)}`;
                  }}
                />
                <Tooltip
                  formatter={(value) => {
                    return formatCurrency(
                      value as number,
                      investmentResults
                        ? investmentResults.currency
                        : Currency.USD
                    );
                  }}
                />
                <Legend
                  content={
                    <RenderLegend
                      payload={[]}
                      hiddenLines={hiddenLines}
                      onLegendClick={handleLegendClick}
                    />
                  }
                />

                <Line
                  type="monotone"
                  dataKey="investmentTotal"
                  stroke={
                    hiddenLines.investmentTotal
                      ? "transparent"
                      : "var(--secondary-color)"
                  }
                  activeDot={{ r: 8 }}
                  name="Total Investment"
                />
                <Line
                  type="monotone"
                  dataKey="yearlyInvestment"
                  stroke={
                    hiddenLines.yearlyInvestment
                      ? "transparent"
                      : "var(--primary-color_t2)"
                  }
                  name="Annual Investment"
                />
                <Line
                  type="monotone"
                  dataKey="returns"
                  stroke={
                    hiddenLines.returns
                      ? "transparent"
                      : "var(--tertiary-color)"
                  }
                  name="Annual Return Growth"
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </section>
    );
  }
);

export default InvestmentChart;
