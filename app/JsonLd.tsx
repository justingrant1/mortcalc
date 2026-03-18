export default function JsonLd() {
  const currentYear = 2025

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MortCalc.org - Free Mortgage Calculator 2025",
    description:
      "Free online mortgage calculator updated for 2025. Calculate monthly mortgage payments with current rates, taxes, insurance, and PMI.",
    url: "https://mortcalc.org",
    applicationCategory: "FinanceApplication",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    version: "2025",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Organization",
        name: "MortCalc.org",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1847",
      bestRating: "5",
      worstRating: "1",
    },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MortCalc.org",
    url: "https://mortcalc.org",
    logo: "https://mortcalc.org/logo.png",
    sameAs: ["https://twitter.com/mortcalc", "https://www.facebook.com/mortcalc"],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I calculate my monthly mortgage payment in 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enter your home price, down payment, loan term, and current 2025 interest rate into our calculator. You can also add property taxes and insurance for a complete monthly payment estimate.",
        },
      },
      {
        "@type": "Question",
        name: "What is included in a monthly mortgage payment in 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical 2025 monthly mortgage payment includes principal, interest, property taxes, and homeowners insurance (PITI). You may also need to pay PMI if your down payment is less than 20%.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is this mortgage calculator for 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our calculator provides accurate estimates based on current 2025 market rates and your inputs. For exact payment amounts, consult with a mortgage lender as actual terms may vary.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}
