export default function JsonLd() {
  const currentYear = new Date().getFullYear()

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `MortCalc.org - Free Mortgage Calculator ${currentYear}`,
    description: `Free online mortgage calculator updated for ${currentYear}. Calculate monthly mortgage payments with current rates, taxes, insurance, and PMI.`,
    url: "https://mortcalc.org",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    version: String(currentYear),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MortCalc.org",
    url: "https://mortcalc.org",
    logo: {
      "@type": "ImageObject",
      url: "https://mortcalc.org/icon.svg",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mortcalc.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mortgage Calculator",
        item: "https://mortcalc.org",
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How do I calculate my monthly mortgage payment in ${currentYear}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Enter your home price, down payment, loan term, and current ${currentYear} interest rate into our free calculator. You can also add property taxes and insurance for a complete monthly payment estimate including PITI.`,
        },
      },
      {
        "@type": "Question",
        name: "What is included in a monthly mortgage payment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical monthly mortgage payment includes principal, interest, property taxes, and homeowners insurance (PITI). You may also need to pay Private Mortgage Insurance (PMI) if your down payment is less than 20% of the home's purchase price.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is this mortgage calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Our calculator provides accurate estimates based on current ${currentYear} market rates and your inputs using the standard amortization formula. For exact payment amounts, consult with a licensed mortgage lender as actual terms may vary based on your credit score and financial profile.`,
        },
      },
      {
        "@type": "Question",
        name: "What is PMI and when do I need it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Private Mortgage Insurance (PMI) is typically required when your down payment is less than 20% of the home's purchase price. PMI protects the lender if you default on the loan. It usually costs between 0.5% and 1.5% of the loan amount per year and can be removed once you reach 20% equity.",
        },
      },
      {
        "@type": "Question",
        name: "What is a good interest rate for a mortgage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Mortgage interest rates vary based on your credit score, loan type, down payment, and market conditions. In ${currentYear}, rates fluctuate based on Federal Reserve policy and economic conditions. Use our calculator to see how different rates affect your monthly payment.`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}
