"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { calculateMortgage } from "@/utils/calculateMortgage"

interface MortgageCalculatorProps {
  defaultHomePrice?: number
  defaultRate?: number
  defaultPropertyTaxRate?: number  // annual %, e.g. 1.07
  defaultInsurance?: number        // monthly $
  defaultDownPaymentPct?: number   // %, e.g. 20
  defaultTermYears?: number
  showCallCTA?: boolean
}

export default function MortgageCalculator({
  defaultHomePrice = 400000,
  defaultRate = 7.25,
  defaultPropertyTaxRate = 1.07,
  defaultInsurance = 125,
  defaultDownPaymentPct = 20,
  defaultTermYears = 30,
  showCallCTA = true,
}: MortgageCalculatorProps) {
  const [purchasePrice, setPurchasePrice] = useState<number | null>(defaultHomePrice)
  const [downPayment, setDownPayment] = useState<number | null>(defaultDownPaymentPct)
  const [isDownPaymentPercent, setIsDownPaymentPercent] = useState(true)
  const [annualRate, setAnnualRate] = useState<number | null>(defaultRate)
  const [termYears, setTermYears] = useState<number | null>(defaultTermYears)
  const [monthlyTax, setMonthlyTax] = useState<string>(
    String(Math.round((defaultHomePrice * defaultPropertyTaxRate) / 100 / 12))
  )
  const [monthlyInsurance, setMonthlyInsurance] = useState<string>(String(defaultInsurance))
  const [showTaxesInsurance, setShowTaxesInsurance] = useState(true)
  const [result, setResult] = useState<{ pi: number; tax: number; insurance: number; total: number } | null>(null)

  useEffect(() => {
    if (purchasePrice === null || downPayment === null || annualRate === null || termYears === null) {
      setResult(null)
      return
    }
    const downPct = isDownPaymentPercent ? downPayment : (downPayment / purchasePrice) * 100
    const { monthlyPayment: pi } = calculateMortgage(purchasePrice, downPct, annualRate, termYears)
    const tax = showTaxesInsurance ? Number(monthlyTax) || 0 : 0
    const insurance = showTaxesInsurance ? Number(monthlyInsurance) || 0 : 0
    setResult({ pi, tax, insurance, total: pi + tax + insurance })
  }, [purchasePrice, downPayment, isDownPaymentPercent, annualRate, termYears, showTaxesInsurance, monthlyTax, monthlyInsurance])

  // Keep monthly tax in sync when purchase price changes
  useEffect(() => {
    if (purchasePrice && defaultPropertyTaxRate) {
      setMonthlyTax(String(Math.round((purchasePrice * defaultPropertyTaxRate) / 100 / 12)))
    }
  }, [purchasePrice, defaultPropertyTaxRate])

  const toggleDownPaymentType = () => {
    if (purchasePrice === null || downPayment === null) return
    if (isDownPaymentPercent) {
      setDownPayment(Math.round((purchasePrice * downPayment) / 100))
    } else {
      setDownPayment(Number(((downPayment / purchasePrice) * 100).toFixed(2)))
    }
    setIsDownPaymentPercent(!isDownPaymentPercent)
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

  return (
    <Card className="w-full shadow-none border-0">
      <CardContent className="p-0">
        <div className="space-y-4">
          {/* Purchase Price */}
          <div>
            <Label htmlFor="mc-price">Purchase Price ($)</Label>
            <Input
              id="mc-price"
              type="number"
              value={purchasePrice ?? ""}
              onChange={(e) => setPurchasePrice(e.target.value === "" ? null : Number(e.target.value))}
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <Label htmlFor="mc-down">Down Payment ({isDownPaymentPercent ? "%" : "$"})</Label>
              <Button onClick={toggleDownPaymentType} variant="outline" size="sm" className="h-7 text-xs">
                Switch to {isDownPaymentPercent ? "$" : "%"}
              </Button>
            </div>
            <Input
              id="mc-down"
              type="number"
              step={isDownPaymentPercent ? "0.5" : "1000"}
              value={downPayment ?? ""}
              onChange={(e) => setDownPayment(e.target.value === "" ? null : Number(e.target.value))}
            />
            {purchasePrice && downPayment && (
              <p className="text-xs text-gray-400 mt-1">
                {isDownPaymentPercent
                  ? `= ${fmt(Math.round((purchasePrice * downPayment) / 100))} down`
                  : `= ${((downPayment / purchasePrice) * 100).toFixed(1)}% down`}
              </p>
            )}
          </div>

          {/* Rate */}
          <div>
            <Label htmlFor="mc-rate">Annual Interest Rate (%)</Label>
            <Input
              id="mc-rate"
              type="number"
              step="0.125"
              value={annualRate ?? ""}
              onChange={(e) => setAnnualRate(e.target.value === "" ? null : Number(e.target.value))}
            />
          </div>

          {/* Term */}
          <div>
            <Label htmlFor="mc-term">Loan Term (years)</Label>
            <div className="flex gap-2 mt-1.5">
              {[10, 15, 20, 30].map((y) => (
                <button
                  key={y}
                  onClick={() => setTermYears(y)}
                  className={`flex-1 py-1.5 text-sm rounded-md border transition-colors ${
                    termYears === y
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {y}yr
                </button>
              ))}
            </div>
          </div>

          {/* Taxes & Insurance toggle */}
          <Button
            onClick={() => setShowTaxesInsurance(!showTaxesInsurance)}
            variant="outline"
            className="w-full"
          >
            {showTaxesInsurance ? "Hide" : "Add"} Taxes & Insurance
          </Button>

          {showTaxesInsurance && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="mc-tax">Monthly Tax ($)</Label>
                <Input
                  id="mc-tax"
                  type="number"
                  value={monthlyTax}
                  onChange={(e) => setMonthlyTax(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="mc-ins">Monthly Insurance ($)</Label>
                <Input
                  id="mc-ins"
                  type="number"
                  value={monthlyInsurance}
                  onChange={(e) => setMonthlyInsurance(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Result */}
        {result !== null && (
          <div className="mt-6 bg-blue-50 rounded-xl p-5 border border-blue-100">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 mb-1">Estimated Monthly Payment</p>
              <p className="text-4xl font-bold text-blue-600">{fmt(result.total)}<span className="text-lg font-normal text-gray-400">/mo</span></p>
            </div>
            <div className="space-y-2 text-sm border-t border-blue-100 pt-3">
              <div className="flex justify-between text-gray-600">
                <span>Principal & Interest</span>
                <span className="font-medium text-gray-900">{fmt(result.pi)}</span>
              </div>
              {showTaxesInsurance && result.tax > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Property Tax</span>
                  <span className="font-medium text-gray-900">{fmt(result.tax)}</span>
                </div>
              )}
              {showTaxesInsurance && result.insurance > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Insurance</span>
                  <span className="font-medium text-gray-900">{fmt(result.insurance)}</span>
                </div>
              )}
              {purchasePrice && downPayment && (
                <div className="flex justify-between text-gray-500 text-xs pt-1 border-t border-blue-100">
                  <span>Loan Amount</span>
                  <span>
                    {fmt(
                      purchasePrice -
                        (isDownPaymentPercent
                          ? Math.round((purchasePrice * downPayment) / 100)
                          : downPayment)
                    )}
                  </span>
                </div>
              )}
            </div>
            {showCallCTA && (
              <div className="text-center mt-4 pt-3 border-t border-blue-100">
                <p className="text-sm text-gray-600">
                  Ready to discuss your loan?{" "}
                  <a href="tel:917-698-0202" className="text-blue-600 hover:underline font-medium">
                    Call 917-698-0202
                  </a>
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
