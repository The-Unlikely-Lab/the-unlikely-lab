const faqs = [
  {
    q: "What is The Unlikely Lab?",
    a: "The Unlikely Lab is an independent research lab working on machine learning, density estimation, likelihood-based anomaly detection, and collider physics with CMS Open Data.",
  },
  {
    q: "Who runs The Unlikely Lab?",
    a: "Hitesh Rasineni (VIT-AP University) and Bhavishya Chebrolu (Mohan Babu University).",
  },
  {
    q: "What methods does the lab study?",
    a: "Neural spline flows, normalizing flows, multivariate density estimation, and unsupervised anomaly detection for mono-Z, hadronic Z, and dijet event topologies.",
  },
];

export default function FaqJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
      <section aria-labelledby="faq-heading" className="py-8">
        <h2 id="faq-heading" className="text-xl font-semibold">
          Frequently asked questions
        </h2>
        <dl className="mt-4 space-y-4">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-medium">{f.q}</dt>
              <dd className="mt-1 max-w-prose text-[15px] leading-6 text-neutral-700">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
