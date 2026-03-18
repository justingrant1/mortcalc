import { Metadata } from 'next'
import statesAM from '@/data/states-a-m.json'
import statesNZ from '@/data/states-n-z.json'

const allStates = { ...statesAM, ...statesNZ } as Record<string, {
  name: string; slug: string; abbreviation: string;
  avgHomePrice: number; avgPropertyTaxRate: number; avgMonthlyInsurance: number;
  avgRate30yr: number; conformingLoanLimit: number;
  contentModules: { taxEnvironment: string; propertyTax: string; climateRisk: string; marketType: string; communityProperty: boolean };
}>

export const metadata: Metadata = {
  title: 'Mortgage Calculator by State 2026 | All 50 States',
  description: 'Free mortgage calculators for all 50 states. Each calculator is pre-filled with your state\'s average home price, property tax rate, and insurance costs. Compare states side by side.',
  alternates: { canonical: 'https://mortcalc.org/mortgage-calculator' },
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function getTaxColor(rate: number) {
  if (rate < 0.5) return 'text-green-600'
  if (rate < 1.0) return 'text-green-500'
  if (rate < 1.5) return 'text-yellow-600'
  if (rate < 2.0) return 'text-orange-500'
  return 'text-red-600'
}

function getMarketBadge(type: string) {
  const map: Record<string, { label: string; color: string }> = {
    HOT: { label: 'Hot', color: 'bg-red-100 text-red-700' },
    COOLING: { label: 'Cooling', color: 'bg-blue-100 text-blue-700' },
    STABLE: { label: 'Stable', color: 'bg-gray-100 text-gray-700' },
    AFFORDABLE: { label: 'Affordable', color: 'bg-green-100 text-green-700' },
    HIGH_COST: { label: 'High Cost', color: 'bg-purple-100 text-purple-700' },
    RURAL_DOMINANT: { label: 'Rural', color: 'bg-yellow-100 text-yellow-700' },
  }
  return map[type] || { label: type, color: 'bg-gray-100 text-gray-700' }
}

// Group states by region
const regions: Record<string, string[]> = {
  'Northeast': ['connecticut', 'maine', 'massachusetts', 'new-hampshire', 'new-jersey', 'new-york', 'pennsylvania', 'rhode-island', 'vermont'],
  'Southeast': ['alabama', 'arkansas', 'florida', 'georgia', 'kentucky', 'louisiana', 'mississippi', 'north-carolina', 'south-carolina', 'tennessee', 'virginia', 'west-virginia'],
  'Midwest': ['illinois', 'indiana', 'iowa', 'kansas', 'michigan', 'minnesota', 'missouri', 'nebraska', 'north-dakota', 'ohio', 'south-dakota', 'wisconsin'],
  'Southwest': ['arizona', 'new-mexico', 'oklahoma', 'texas'],
  'West': ['alaska', 'california', 'colorado', 'hawaii', 'idaho', 'montana', 'nevada', 'oregon', 'utah', 'washington', 'wyoming'],
  'Mid-Atlantic': ['delaware', 'maryland'],
}

const stateList = Object.values(allStates).sort((a, b) => a.name.localeCompare(b.name))

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Mortgage Calculator by State 2026',
  description: 'Free mortgage calculators for all 50 U.S. states, pre-filled with local property tax rates, home prices, and insurance costs.',
  url: 'https://mortcalc.org/mortgage-calculator',
  hasPart: stateList.map(s => ({
    '@type': 'WebPage',
    name: s.metaTitle ?? `${s.name} Mortgage Calculator`,
    url: `https://mortcalc.org/mortgage-calculator/${s.slug}`,
  })),
}

export default function MortgageCalculatorByStatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Mortgage Calculator by State
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every state has different property taxes, insurance costs, and loan limits.
              Select your state for a calculator pre-filled with local data.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10">

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Lowest Property Tax', value: 'Hawaii 0.28%', sub: 'vs. 2.23% in NJ', color: 'text-green-600' },
              { label: 'Most Affordable', value: 'West Virginia', sub: 'Median ~$155K', color: 'text-blue-600' },
              { label: 'Highest Conforming Limit', value: '$1,149,825', sub: 'AK, HI, CA, NY, NJ, MA, MD, WA, VA', color: 'text-purple-600' },
              { label: 'No Income Tax States', value: '9 States', sub: 'FL, TX, WA, NV, AK, SD, WY, TN, NH', color: 'text-orange-600' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs font-medium text-gray-700 mt-0.5">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* All States Grid — Alphabetical */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All 50 States</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {stateList.map((state) => {
                const taxColor = getTaxColor(state.avgPropertyTaxRate)
                const market = getMarketBadge(state.contentModules.marketType)
                return (
                  <a
                    key={state.slug}
                    href={`/mortgage-calculator/${state.slug}`}
                    className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                          {state.abbreviation}
                        </span>
                        <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {state.name}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${market.color}`}>
                        {market.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-gray-400">Median Price</div>
                        <div className="font-medium text-gray-800">{formatCurrency(state.avgHomePrice)}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Property Tax</div>
                        <div className={`font-medium ${taxColor}`}>{state.avgPropertyTaxRate.toFixed(2)}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400">30-yr Rate</div>
                        <div className="font-medium text-gray-800">{state.avgRate30yr.toFixed(2)}%</div>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* By Region */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Region</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(regions).map(([region, slugs]) => (
                <div key={region} className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">{region}</h3>
                  <div className="space-y-1">
                    {slugs.map(slug => {
                      const s = allStates[slug]
                      if (!s) return null
                      return (
                        <a
                          key={slug}
                          href={`/mortgage-calculator/${slug}`}
                          className="flex items-center justify-between text-sm hover:bg-gray-50 rounded px-2 py-1 -mx-2 transition-colors"
                        >
                          <span className="text-blue-600 hover:underline">{s.name}</span>
                          <span className="text-gray-400">{s.avgPropertyTaxRate.toFixed(2)}% tax</span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">State-by-State Comparison</h2>
              <p className="text-sm text-gray-500 mt-1">Sorted by property tax rate (lowest to highest)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">State</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-600">Median Price</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-600">Property Tax</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-600">Avg Insurance/mo</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-600">Conforming Limit</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-600"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[...stateList].sort((a, b) => a.avgPropertyTaxRate - b.avgPropertyTaxRate).map((state) => (
                    <tr key={state.slug} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-1.5 py-0.5 rounded">
                            {state.abbreviation}
                          </span>
                          <span className="font-medium text-gray-900">{state.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(state.avgHomePrice)}</td>
                      <td className={`px-4 py-3 text-right font-medium ${getTaxColor(state.avgPropertyTaxRate)}`}>
                        {state.avgPropertyTaxRate.toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">${state.avgMonthlyInsurance}/mo</td>
                      <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(state.conformingLoanLimit)}</td>
                      <td className="px-4 py-3 text-right">
                        <a
                          href={`/mortgage-calculator/${state.slug}`}
                          className="text-blue-600 hover:underline text-xs font-medium"
                        >
                          Calculate →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SEO Content */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 prose prose-gray max-w-none">
            <h2>Why Property Taxes Vary So Much by State</h2>
            <p>
              Property taxes are one of the most significant — and most overlooked — factors in your monthly mortgage payment.
              The difference between living in Hawaii (0.28% average rate) and New Jersey (2.23% average rate) on a $400,000 home
              is over $780 per month in property taxes alone. Our state-specific calculators automatically factor in your state&apos;s
              average property tax rate so you get an accurate picture of your true monthly housing cost.
            </p>
            <h2>Conforming Loan Limits by State</h2>
            <p>
              The conforming loan limit determines whether you need a conventional loan or a jumbo loan. In 2026, the standard
              conforming limit is $766,550. However, high-cost states including Alaska, Hawaii, California, New York, New Jersey,
              Massachusetts, Maryland, Washington, and Virginia have limits up to $1,149,825 in qualifying counties. Jumbo loans
              typically require a higher credit score, larger down payment, and more cash reserves.
            </p>
            <h2>State Homebuyer Assistance Programs</h2>
            <p>
              Every state has a housing finance agency that offers below-market interest rates and down payment assistance for
              qualifying buyers. These programs can save first-time buyers thousands of dollars. Each state calculator page
              includes information about your state&apos;s specific programs.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
