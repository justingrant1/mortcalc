import { Suspense } from "react"
import HomeClient from "./HomeClient"
import type { Metadata } from "next"
import JsonLd from "./JsonLd"

export const metadata: Metadata = {
  title: "Mortgage Calculator 2026 | Free Monthly Payment Calculator",
  description:
    "Calculate your exact monthly mortgage payment in seconds. Free mortgage calculator with taxes, insurance, PMI, HOA fees, and down payment assistance. Updated rates for 2026.",
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <header className="w-full text-center py-4 md:py-6 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Free Mortgage Calculator 2026</h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Calculate your monthly mortgage payment with our free, easy-to-use calculator. Updated with current 2026 rates
          and market conditions.
        </p>
      </header>

      <main id="calculator" role="main" aria-label="Mortgage Calculator">
        <Suspense fallback={<div className="text-center py-8 text-gray-500">Loading calculator...</div>}>
          <HomeClient />
        </Suspense>
        <noscript>
          <div className="max-w-md mx-auto my-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <p className="text-gray-800 font-medium">
              JavaScript is required to use this mortgage calculator. Please enable JavaScript in your browser settings
              and reload the page.
            </p>
          </div>
        </noscript>
      </main>

      <footer className="max-w-3xl mx-auto px-4 py-10 text-sm text-gray-600">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">About Our Free Mortgage Calculator</h2>
        <p className="mb-4">
          Our free mortgage calculator helps you estimate your monthly mortgage payment with accuracy. Updated for 2026,
          it reflects current market rates and lending conditions. Simply enter your home&apos;s price, down payment,
          loan term, and interest rate to get started. You can also include additional costs like property taxes, home
          insurance, HOA fees, and PMI for a complete monthly payment calculation.
        </p>

        <h3 className="text-base font-semibold text-gray-800 mb-2">How to Use This Mortgage Calculator</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Enter the purchase price of your home</li>
          <li>Input your down payment (as a percentage or dollar amount)</li>
          <li>Specify your loan&apos;s interest rate and term (15 or 30 years are most common)</li>
          <li>Add optional monthly property taxes and homeowners insurance costs</li>
          <li>View your estimated monthly payment instantly — no sign-up required</li>
        </ul>

        <h3 className="text-base font-semibold text-gray-800 mb-2">Understanding Your Mortgage Payment</h3>
        <p className="mb-4">
          Your monthly mortgage payment is made up of several components. The principal is the portion that reduces your
          loan balance, while the interest is the cost of borrowing. Together, these form the core of your payment,
          calculated using the standard amortization formula. If your down payment is less than 20%, lenders typically
          require Private Mortgage Insurance (PMI), which protects the lender in case of default.
        </p>

        <h3 className="text-base font-semibold text-gray-800 mb-2">Mortgage Rates in 2026</h3>
        <p className="mb-4">
          Mortgage interest rates in 2026 continue to be influenced by Federal Reserve monetary policy, inflation data,
          and broader economic conditions. Rates vary by loan type — conventional, FHA, VA, and USDA loans each carry
          different rate structures. Your personal rate will also depend on your credit score, debt-to-income ratio, and
          the size of your down payment. Use our calculator to model different rate scenarios and find a payment that
          fits your budget.
        </p>

        <h3 className="text-base font-semibold text-gray-800 mb-2">Tips for Lowering Your Monthly Payment</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>
            <strong>Increase your down payment</strong> — A larger down payment reduces your loan amount and may
            eliminate PMI
          </li>
          <li>
            <strong>Choose a longer loan term</strong> — A 30-year mortgage has lower monthly payments than a 15-year
            mortgage
          </li>
          <li>
            <strong>Improve your credit score</strong> — Higher credit scores qualify for lower interest rates
          </li>
          <li>
            <strong>Shop multiple lenders</strong> — Rate differences of even 0.25% can save thousands over the life of
            the loan
          </li>
          <li>
            <strong>Consider buying points</strong> — Paying discount points upfront can lower your rate permanently
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-800 mb-2">Frequently Asked Questions</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-medium text-gray-700">What is a good down payment on a house?</p>
            <p className="text-gray-600 mt-1">
              A 20% down payment is traditionally recommended because it eliminates PMI and results in a lower monthly
              payment. However, many loan programs allow down payments as low as 3% (conventional) or 3.5% (FHA),
              making homeownership accessible with less upfront cash.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">How much house can I afford?</p>
            <p className="text-gray-600 mt-1">
              A common guideline is that your total monthly housing costs (mortgage, taxes, insurance) should not exceed
              28% of your gross monthly income. Use our calculator to test different home prices and find a payment
              within your budget.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">What is the difference between a 15-year and 30-year mortgage?</p>
            <p className="text-gray-600 mt-1">
              A 15-year mortgage has higher monthly payments but you pay significantly less interest over the life of
              the loan and build equity faster. A 30-year mortgage offers lower monthly payments and more cash flow
              flexibility, but you pay more interest overall.
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6 border-t pt-4">
          *Calculator results are estimates only and do not constitute financial advice. Actual loan terms, payments,
          and rates will vary based on your credit profile, lender, and current market conditions. Always consult with
          a licensed mortgage professional before making financial decisions. Updated for 2026.
        </p>
      </footer>
    </>
  )
}
