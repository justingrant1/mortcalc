"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { calculateMortgage } from "../utils/calculateMortgage"

export default function HomeClient() {
  const [purchasePrice, setPurchasePrice] = useState<number | null>(80000)
  const [downPayment, setDownPayment] = useState<number | null>(20)
  const [isDownPaymentPercent, setIsDownPaymentPercent] = useState<boolean>(true)
  const [annualRate, setAnnualRate] = useState<number | null>(7.5) // Updated default interest rate from 8.5 to 7.5
  const [termYears, setTermYears] = useState<number | null>(30)
  const [showTaxesInsurance, setShowTaxesInsurance] = useState<boolean>(false)
  const [monthlyTax, setMonthlyTax] = useState<string>("")
  const [monthlyInsurance, setMonthlyInsurance] = useState<string>("")
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)

  useEffect(() => {
    if (purchasePrice === null || downPayment === null || annualRate === null || termYears === null) {
      setMonthlyPayment(null)
      return
    }

    const downPaymentAmount = isDownPaymentPercent ? (purchasePrice * downPayment) / 100 : downPayment
    const downPaymentPercent = isDownPaymentPercent ? downPayment : (downPayment / purchasePrice) * 100
    const { monthlyPayment } = calculateMortgage(purchasePrice, downPaymentPercent, annualRate, termYears)

    // Add monthly taxes and insurance to the payment if they are shown
    const taxAmount = showTaxesInsurance ? Number(monthlyTax) || 0 : 0
    const insuranceAmount = showTaxesInsurance ? Number(monthlyInsurance) || 0 : 0
    const totalMonthlyPayment = monthlyPayment + taxAmount + insuranceAmount

    setMonthlyPayment(totalMonthlyPayment)
  }, [
    purchasePrice,
    downPayment,
    isDownPaymentPercent,
    annualRate,
    termYears,
    showTaxesInsurance,
    monthlyTax,
    monthlyInsurance,
  ])

  const toggleDownPaymentType = () => {
    if (isDownPaymentPercent) {
      setDownPayment(Math.round((purchasePrice * downPayment) / 100))
    } else {
      setDownPayment(Number(((downPayment / purchasePrice) * 100).toFixed(2)))
    }
    setIsDownPaymentPercent(!isDownPaymentPercent)
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "mortcalc.org Mortgage Calculator",
    description:
      "Free online mortgage calculator that helps you calculate monthly mortgage payments with taxes and insurance.",
    url: "https://mortcalc.org",
    applicationCategory: "FinanceApplication",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  return (
    <div className="bg-gray-100 py-4 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Mortgage Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
              <Input
                id="purchasePrice"
                type="number"
                value={purchasePrice ?? ""}
                onChange={(e) => setPurchasePrice(e.target.value === "" ? null : Number(e.target.value))}
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="downPayment">Down Payment ({isDownPaymentPercent ? "%" : "$"})</Label>
                <Button onClick={toggleDownPaymentType} variant="outline" size="sm">
                  Switch to {isDownPaymentPercent ? "$" : "%"}
                </Button>
              </div>
              <Input
                id="downPayment"
                type="number"
                step={isDownPaymentPercent ? "0.1" : "1000"}
                value={downPayment ?? ""}
                onChange={(e) => setDownPayment(e.target.value === "" ? null : Number(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="annualRate">Annual Interest Rate (%)</Label>
              <Input
                id="annualRate"
                type="number"
                step="0.1"
                value={annualRate ?? ""}
                onChange={(e) => setAnnualRate(e.target.value === "" ? null : Number(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="termYears">Loan Term (years)</Label>
              <Input
                id="termYears"
                type="number"
                value={termYears ?? ""}
                onChange={(e) => setTermYears(e.target.value === "" ? null : Number(e.target.value))}
                required
              />
            </div>
            <Button onClick={() => setShowTaxesInsurance(!showTaxesInsurance)} variant="outline" className="w-full">
              {showTaxesInsurance ? "Hide" : "Add"} Taxes & Insurance
            </Button>
            {showTaxesInsurance && (
              <>
                <div>
                  <Label htmlFor="monthlyTax">Monthly Property Tax ($)</Label>
                  <Input
                    id="monthlyTax"
                    type="number"
                    value={monthlyTax}
                    onChange={(e) => setMonthlyTax(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyInsurance">Monthly Insurance ($)</Label>
                  <Input
                    id="monthlyInsurance"
                    type="number"
                    value={monthlyInsurance}
                    onChange={(e) => setMonthlyInsurance(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          {monthlyPayment !== null && (
            <div className="mt-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold">Monthly Payment</h2>
                <p className="text-3xl font-bold text-green-600">${monthlyPayment.toFixed(2)}</p>
              </div>
              <div className="text-center mt-4 pt-4 border-t">
                <p className="text-gray-700 font-medium">
                  Ready to discuss your loan?
                  <br />
                  <a href="tel:917-698-0202" className="text-blue-600 hover:text-blue-800 underline">
                    Call 917-698-0202
                  </a>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
