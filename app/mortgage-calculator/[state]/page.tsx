import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import statesAM from '@/data/states-a-m.json'
import statesNZ from '@/data/states-n-z.json'
import MortgageCalculator from '@/components/MortgageCalculator'

const allStates = { ...statesAM, ...statesNZ } as Record<string, StateData>

interface StateProgram {
  name: string
  agency: string
  description: string
  url: string
}

interface ContentModules {
  taxEnvironment: string
  propertyTax: string
  homesteadExemption: boolean
  prop13: boolean
  climateRisk: string
  militaryPresence: string
  marketType: string
  communityProperty: boolean
}

interface StateData {
  name: string
  slug: string
  abbreviation: string
  avgHomePrice: number
  avgPropertyTaxRate: number
  avgMonthlyInsurance: number
  avgRate30yr: number
  avgRate15yr: number
  conformingLoanLimit: number
  topCities: string[]
  neighboringStates: string[]
  contentModules: ContentModules
  statePrograms: StateProgram[]
  fhaLoanLimit: number
  vaEntitlement: boolean
  usdaEligibleAreas: boolean
  jumboThreshold: number
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  taxContent: string
  insuranceContent: string
  marketContent: string
}

export async function generateStaticParams() {
  return Object.keys(allStates).map((slug) => ({ state: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { state: string }
}): Promise<Metadata> {
  const state = allStates[params.state]
  if (!state) return {}
  return {
    title: state.metaTitle,
    description: state.metaDescription,
    alternates: {
      canonical: `https://mortcalc.org/mortgage-calculator/${state.slug}`,
    },
    openGraph: {
      title: state.metaTitle,
      description: state.metaDescription,
      url: `https://mortcalc.org/mortgage-calculator/${state.slug}`,
      type: 'website',
    },
  }
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function formatPercent(n: number) {
  return `${n.toFixed(2)}%`
}

function getTaxBadge(rate: number) {
  if (rate < 0.5) return { label: 'Very Low', color: 'bg-green-100 text-green-800' }
  if (rate < 1.0) return { label: 'Low', color: 'bg-green-50 text-green-700' }
  if (rate < 1.5) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800' }
  if (rate < 2.0) return { label: 'High', color: 'bg-orange-100 text-orange-800' }
  return { label: 'Very High', color: 'bg-red-100 text-red-800' }
}

function getClimateIcon(risk: string) {
  const icons: Record<string, string> = {
    HURRICANE_ZONE: '🌀',
    EARTHQUAKE_ZONE: '🌋',
    TORNADO_ALLEY: '🌪️',
    FLOOD_ZONE: '🌊',
    WILDFIRE_ZONE: '🔥',
    WINTER_STORM: '❄️',
    MODERATE: '✅',
  }
  return icons[risk] || '⚠️'
}

function getClimateLabel(risk: string) {
  const labels: Record<string, string> = {
    HURRICANE_ZONE: 'Hurricane Zone',
    EARTHQUAKE_ZONE: 'Earthquake Zone',
    TORNADO_ALLEY: 'Tornado Alley',
    FLOOD_ZONE: 'Flood Risk',
    WILDFIRE_ZONE: 'Wildfire Risk',
    WINTER_STORM: 'Winter Storm Risk',
    MODERATE: 'Moderate Risk',
  }
  return labels[risk] || risk
}

function getMonthlyPayment(price: number, rate: number, years: number, downPct = 0.2) {
  const principal = price * (1 - downPct)
  const monthlyRate = rate / 100 / 12
  const n = years * 12
  if (monthlyRate === 0) return principal / n
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
}

export default function StateMortgageCalculatorPage({
  params,
}: {
  params: { state: string }
}) {
  const state = allStates[params.state]
  if (!state) notFound()

  const taxBadge = getTaxBadge(state.avgPropertyTaxRate)
  const monthlyPI = getMonthlyPayment(state.avgHomePrice, state.avgRate30yr, 30)
  const monthlyTax = (state.avgHomePrice * state.avgPropertyTaxRate) / 100 / 12
  const totalMonthly = monthlyPI + monthlyTax + state.avgMonthlyInsurance

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: state.metaTitle,
    description: state.metaDescription,
    url: `https://mortcalc.org/mortgage-calculator/${state.slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortcalc.org' },
        { '@type': 'ListItem', position: 2, name: 'Mortgage Calculator by State', item: 'https://mortcalc.org/mortgage-calculator' },
        { '@type': 'ListItem', position: 3, name: `${state.name} Mortgage Calculator`, item: `https://mortcalc.org/mortgage-calculator/${state.slug}` },
      ],
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What is the average mortgage payment in ${state.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Based on ${state.name}'s median home price of ${formatCurrency(state.avgHomePrice)}, a 20% down payment, and a 30-year fixed rate of ${formatPercent(state.avgRate30yr)}, the estimated total monthly payment (principal, interest, taxes, and insurance) is approximately ${formatCurrency(totalMonthly)}/month.`,
          },
        },
        {
          '@type': 'Question',
          name: `What is the property tax rate in ${state.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${state.name}'s average property tax rate is ${formatPercent(state.avgPropertyTaxRate)}, which is ${taxBadge.label.toLowerCase()} compared to the national average of 1.07%. On a ${formatCurrency(state.avgHomePrice)} home, that's approximately ${formatCurrency(monthlyTax)}/month in property taxes.`,
          },
        },
        {
          '@type': 'Question',
          name: `What is the conforming loan limit in ${state.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `The conforming loan limit in ${state.name} is ${formatCurrency(state.conformingLoanLimit)}. Loans above this amount are considered jumbo loans and typically require stronger credit and larger down payments.`,
          },
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li><a href="/" className="hover:text-blue-600">Home</a></li>
                <li className="text-gray-300">/</li>
                <li><a href="/mortgage-calculator" className="hover:text-blue-600">By State</a></li>
                <li className="text-gray-300">/</li>
                <li className="text-gray-900 font-medium">{state.name}</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-start gap-4">
              <div className="text-5xl font-bold text-blue-100 bg-blue-600 rounded-2xl w-16 h-16 flex items-center justify-center text-2xl text-white shrink-0">
                {state.abbreviation}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {state.h1}
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl">{state.intro}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: Calculator + Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(state.avgHomePrice)}</div>
                  <div className="text-xs text-gray-500 mt-1">Median Home Price</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatPercent(state.avgPropertyTaxRate)}</div>
                  <div className="text-xs text-gray-500 mt-1">Property Tax Rate</div>
                  <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${taxBadge.color}`}>
                    {taxBadge.label}
                  </span>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatPercent(state.avgRate30yr)}</div>
                  <div className="text-xs text-gray-500 mt-1">Avg 30-yr Rate</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalMonthly)}</div>
                  <div className="text-xs text-gray-500 mt-1">Est. Monthly (PITI)</div>
                </div>
              </div>

              {/* Calculator Embed */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Calculate Your {state.name} Mortgage Payment
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Pre-filled with {state.name} averages — adjust any value to match your situation.
                </p>
                <MortgageCalculator
                  defaultHomePrice={state.avgHomePrice}
                  defaultRate={state.avgRate30yr}
                  defaultPropertyTaxRate={state.avgPropertyTaxRate}
                  defaultInsurance={state.avgMonthlyInsurance}
                />
              </div>

              {/* Monthly Payment Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Estimated Monthly Payment Breakdown
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Based on {formatCurrency(state.avgHomePrice)} home price, 20% down, 30-year fixed at {formatPercent(state.avgRate30yr)}.
                </p>
                <div className="space-y-3">
                  {[
                    { label: 'Principal & Interest', value: monthlyPI, color: 'bg-blue-500' },
                    { label: 'Property Tax', value: monthlyTax, color: 'bg-orange-400' },
                    { label: 'Homeowners Insurance', value: state.avgMonthlyInsurance, color: 'bg-green-500' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color} shrink-0`} />
                      <div className="flex-1 text-sm text-gray-700">{item.label}</div>
                      <div className="text-sm font-semibold text-gray-900">{formatCurrency(item.value)}/mo</div>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-3 flex items-center gap-3">
                    <div className="w-3 h-3 shrink-0" />
                    <div className="flex-1 text-sm font-semibold text-gray-900">Total (PITI)</div>
                    <div className="text-sm font-bold text-blue-600">{formatCurrency(totalMonthly)}/mo</div>
                  </div>
                </div>
              </div>

              {/* Tax Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {state.name} Property Taxes & Income Tax
                </h2>
                <p className="text-gray-600 leading-relaxed">{state.taxContent}</p>
                {state.contentModules.homesteadExemption && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                    ✅ <strong>Homestead Exemption available</strong> — {state.name} offers a homestead exemption for owner-occupied primary residences, reducing your property tax bill.
                  </div>
                )}
                {state.contentModules.communityProperty && (
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                    ℹ️ <strong>Community Property State</strong> — {state.name} is a community property state. Assets acquired during marriage are generally owned equally by both spouses, which affects mortgage applications.
                  </div>
                )}
              </div>

              {/* Insurance Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {state.name} Homeowners Insurance
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{getClimateIcon(state.contentModules.climateRisk)}</span>
                  <span className="text-sm font-medium text-gray-700">{getClimateLabel(state.contentModules.climateRisk)}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{state.insuranceContent}</p>
              </div>

              {/* Market Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {state.name} Housing Market Overview
                </h2>
                <p className="text-gray-600 leading-relaxed">{state.marketContent}</p>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      What is the average mortgage payment in {state.name}?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Based on {state.name}&apos;s median home price of {formatCurrency(state.avgHomePrice)}, a 20% down payment, and a 30-year fixed rate of {formatPercent(state.avgRate30yr)}, the estimated total monthly payment (PITI) is approximately {formatCurrency(totalMonthly)}/month.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      What is the conforming loan limit in {state.name}?
                    </h3>
                    <p className="text-sm text-gray-600">
                      The conforming loan limit in {state.name} is {formatCurrency(state.conformingLoanLimit)}. Loans above this amount are jumbo loans requiring stronger credit and larger down payments.
                    </p>
                  </div>
                  {state.usdaEligibleAreas && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Can I get a USDA loan in {state.name}?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Yes — {state.name} has USDA-eligible rural areas where qualifying buyers can purchase a home with zero down payment. Use the USDA eligibility map to check specific addresses.
                      </p>
                    </div>
                  )}
                  {state.vaEntitlement && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Are VA loans available in {state.name}?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Yes — eligible veterans, active-duty service members, and surviving spouses can use VA loans in {state.name} with no down payment and no PMI. The VA loan limit in {state.name} is {formatCurrency(state.conformingLoanLimit)}.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">

              {/* Loan Limits */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">{state.name} Loan Limits</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conventional</span>
                    <span className="font-medium">{formatCurrency(state.conformingLoanLimit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">FHA</span>
                    <span className="font-medium">{formatCurrency(state.fhaLoanLimit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">VA</span>
                    <span className="font-medium text-green-600">No limit (full entitlement)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jumbo starts at</span>
                    <span className="font-medium">{formatCurrency(state.jumboThreshold + 1)}</span>
                  </div>
                </div>
              </div>

              {/* State Programs */}
              {state.statePrograms.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">{state.name} Homebuyer Programs</h3>
                  {state.statePrograms.map((program) => (
                    <div key={program.name} className="border border-blue-100 bg-blue-50 rounded-lg p-4">
                      <div className="font-medium text-blue-900 text-sm">{program.name}</div>
                      <div className="text-xs text-blue-700 mt-0.5 mb-2">{program.agency}</div>
                      <p className="text-xs text-gray-700 leading-relaxed">{program.description}</p>
                      <a
                        href={program.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-xs text-blue-600 hover:underline"
                      >
                        Learn more →
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* Loan Types */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Loan Types Available</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Conventional (30-yr, 15-yr, ARM)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>FHA (3.5% down)</span>
                  </div>
                  {state.vaEntitlement && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>VA (0% down for veterans)</span>
                    </div>
                  )}
                  {state.usdaEligibleAreas && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>USDA (0% down, rural areas)</span>
                    </div>
                  )}
                  {state.avgHomePrice > state.conformingLoanLimit * 0.8 && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Jumbo (above {formatCurrency(state.conformingLoanLimit)})</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Neighboring States */}
              {state.neighboringStates.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Compare Neighboring States</h3>
                  <div className="space-y-2">
                    {state.neighboringStates.slice(0, 5).map((neighborSlug) => {
                      const neighbor = allStates[neighborSlug]
                      if (!neighbor) return null
                      return (
                        <a
                          key={neighborSlug}
                          href={`/mortgage-calculator/${neighborSlug}`}
                          className="flex items-center justify-between text-sm hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
                        >
                          <span className="text-blue-600 hover:underline">{neighbor.name}</span>
                          <span className="text-gray-500">{formatPercent(neighbor.avgPropertyTaxRate)} tax</span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-blue-600 rounded-xl p-5 text-white">
                <h3 className="font-semibold mb-2">Get Pre-Approved Today</h3>
                <p className="text-sm text-blue-100 mb-4">
                  See what you qualify for in {state.name} with current rates.
                </p>
                <a
                  href="/"
                  className="block w-full bg-white text-blue-600 text-center text-sm font-semibold py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Calculate My Payment
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
