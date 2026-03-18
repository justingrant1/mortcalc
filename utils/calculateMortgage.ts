export function calculateMortgage(
  purchasePrice: number,
  downPaymentPercent: number,
  annualRate: number,
  termYears: number,
): { monthlyPayment: number; loanAmount: number } {
  const downPaymentAmount = (purchasePrice * downPaymentPercent) / 100
  const loanAmount = purchasePrice - downPaymentAmount

  const monthlyRate = annualRate / 100 / 12
  const numberOfPayments = termYears * 12

  let monthlyPayment: number

  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / numberOfPayments
  } else {
    monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  }

  return { monthlyPayment, loanAmount }
}
