import { Suspense } from "react"
import HomeClient from "./HomeClient"
import type { Metadata } from "next"
import JsonLd from "./JsonLd"

export const metadata: Metadata = {
  title: "Mortgage Calculator 2025 | Free Monthly Payment Calculator",
  description:
    "Calculate your exact monthly mortgage payment in seconds. Free mortgage calculator with taxes, insurance, PMI, HOA fees, and down payment assistance. Updated rates for 2025.",
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <header className="w-full text-center py-4 md:py-6 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Free Mortgage Calculator 2025</h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Calculate your monthly mortgage payment with our free, easy-to-use calculator. Updated with current 2025 rates
          and market conditions.
        </p>
      </header>

      <Suspense fallback={<div>Loading calculator...</div>}>
        <HomeClient />
      </Suspense>

      <footer className="max-w-2xl mx-auto px-4 py-8 text-sm text-gray-600">
        <h2 className="text-lg font-semibold mb-4">About Our Mortgage Calculator</h2>
        <p className="mb-4">
          Our free mortgage calculator helps you estimate your monthly mortgage payment with accuracy. Updated for 2025,
          it reflects current market rates and lending conditions. Simply enter your home's price, down payment, loan
          term, and interest rate to get started. You can also include additional costs like property taxes, home
          insurance, HOA fees, and PMI for a complete monthly payment calculation.
        </p>
        <h3 className="text-md font-semibold mb-2">How to Use This Calculator:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>Enter the purchase price of your home</li>
          <li>Input your down payment (as a percentage or dollar amount)</li>
          <li>Specify your loan's interest rate and term</li>
          <li>Add optional monthly taxes and insurance costs</li>
        </ul>
        <p className="text-xs text-gray-500 mt-6">
          *Calculator results are estimates and do not include all possible expenses. Actual loan terms and payments
          will vary based on your specific situation and current market rates. Updated for 2025.
        </p>
      </footer>
    </>
  )
}
