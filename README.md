# INVESTMENT CALCULATOR

An interactive **Investment Calculator** built with **React + TypeScript**, allowing users to visualize the growth of their investments over time with dynamic charts. <a href="https://paologhidoni.github.io/investmentcalculator/" target="_blank">🚀 Live Demo: Investment Calculator</a>

<img src="./public/investmentcalculator.png" alt="Investment Calculator Preview"/>

## 🚀 Features

- 👥 **User Input Form** – Enter **initial investment**, **annual contributions**, **expected growth rate**, and **duration**.
- 📉 **Year-to-Year Investment Breakdown** – Displays:
  - **Year** – Each investment year is listed sequentially.
  - **Annual Investment** – Contributions made for each year.
  - **Returns** – The yearly profit from compounded interest.
  - **Total Investment** – The cumulative value over time.
- 📊 **Interactive Chart** – Visualize investment growth over time using Recharts. Displays:
  - **Total Investment** (cumulative value over time)
  - **Annual Investment** (yearly contributions)
  - **Annual Return Growth** (compounded interest/profit)
- 📋 **Custom Legend** – Toggle different investment metrics in the graph.
- 💲 **Currency Formatting** – Supports multiple currencies with proper formatting.

## 🛠️ Tech Stack

- **React + TypeScript** – For a strongly typed, scalable frontend.
- **Recharts** – To render interactive charts.
- **Tailwind CSS** – For styling and layout.
- **Vitest** – For testing.

## 🚀 Accessibility Achievement

I'm proud to share that this project has achieved a **100% accessibility** score on Lighthouse. By focusing on accessibility best practices, I've worked to create an inclusive experience for everyone, regardless of their needs.

This achievement reflects:

- Adherence to WCAG guidelines.
- Optimization of semantic HTML.
- Full keyboard navigability.
- Testing and optimization for VoiceOver on macOS to ensure content is read clearly and navigable.
- Effective ARIA attributes.

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/investment-calculator.git
   ```

2. Cd into project and install dependencies.

   ```bash
   cd investmentcalculator
   npm install
   ```

3. Run the app

   ```bash
   npm run dev
   ```

## Investment Projection Breakdown

Below is an example of how the investment projection is calculated and displayed:

| Year | Investment for the Year             | Return for the Year | Total Investment at Year-End |
| ---- | ----------------------------------- | ------------------- | ---------------------------- |
| 2026 | Initial + Annual Contribution       | Calculated Return   | Updated Total                |
| 2027 | Updated Total + Annual Contribution | Calculated Return   | Updated Total                |
| 2028 | Updated Total + Annual Contribution | Calculated Return   | Updated Total                |
| 2029 | Updated Total + Annual Contribution | Calculated Return   | Updated Total                |
| 2030 | Updated Total + Annual Contribution | Calculated Return   | Updated Total                |

### Explanation of Columns:

- **Year**: The year of the projection.
- **Investment for the Year**: The total amount invested in that year (initial investment plus annual contributions).
- **Return for the Year**: The calculated return for that year, based on the total investment and expected return rate.
- **Total Investment at Year-End**: The total investment at the end of the year, including the initial investment, annual contributions, and the returns.

This breakdown helps you track how your investment grows over time and understand the impact of both contributions and returns.

## 🎯 Goals:

- [x] Build an accessible responsive form for the user to interact with the investment calculator.
- [x] Display the calculated data, year by year.
- [x] Visually display the investment prograssion in a chart.

## 🔥 Future Enhancements

- [ ] Add **Dark Mode**.
- [ ] Implement **export to PDF/CSV** feature.
- [ ] Allow users to select different **compounding frequencies** (monthly, quarterly, yearly).
- [ ] Allow users to adjust **annual investment** dynamically and update the data & chart in real time.
- [ ] Add **tootltips** to explain each field.
- [ ] Make it a full stack app with **authentication** and feature to **save investment calculation**.
