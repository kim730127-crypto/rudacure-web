import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pipeline | RCI0165 TRPV1 Antagonist | RudaCure",
  description:
    "RudaCure's lead program RCI0165 is a selective TRPV1 antagonist in Lead Optimization. Lead compound CCP-2 shows MM-PBSA binding of −71.89 kcal/mol with low MOR/KOR off-target activity and no hyperthermia.",
  alternates: {
    canonical: "https://rudacure.com/pipeline",
  },
  openGraph: {
    title: "Pipeline | RCI0165 TRPV1 Antagonist | RudaCure",
    description:
      "RCI0165: TRPV1 selective antagonist for pain and dry eye disease. Lead compound CCP-2, MM-PBSA −71.89 kcal/mol, no hyperthermia observed.",
    url: "https://rudacure.com/pipeline",
    type: "website",
  },
};

const medicalStudySchema = {
  "@context": "https://schema.org",
  "@type": "MedicalStudy",
  name: "RCI0165 — TRPV1 Selective Antagonist Program",
  description:
    "Drug discovery program developing TRPV1-selective antagonists for chronic pain and dry eye disease. Lead compound CCP-2 identified via 100 ns molecular dynamics simulation with MM-PBSA binding score of −71.89 kcal/mol.",
  studySubject: {
    "@type": "Drug",
    name: "RCI0165 / CCP-2",
    description:
      "Selective TRPV1 antagonist with low MOR/KOR off-target activity and predicted absence of drug-induced hyperthermia",
    recognizingAuthority: "RudaCure",
  },
  healthCondition: [
    {
      "@type": "MedicalCondition",
      name: "Chronic Pain",
    },
    {
      "@type": "MedicalCondition",
      name: "Dry Eye Disease",
    },
  ],
  sponsor: {
    "@type": "Organization",
    name: "RudaCure",
    url: "https://rudacure.com",
  },
  status: "Lead Optimization",
};

const stages = [
  { label: "Target Identification", shortLabel: "Target ID", done: true },
  { label: "Hit Discovery", shortLabel: "Hit Discovery", done: true },
  {
    label: "Lead Optimization",
    shortLabel: "Lead Optimization",
    done: true,
    current: true,
  },
  {
    label: "Preclinical Studies",
    shortLabel: "Preclinical",
    done: false,
    next: true,
  },
  { label: "IND Filing", shortLabel: "IND", done: false },
  { label: "Phase 1 Clinical Trial", shortLabel: "Phase 1", done: false },
];

export default function PipelinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalStudySchema) }}
      />

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-900">
            RudaCure
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link
              href="/about"
              className="hover:text-blue-900 transition-colors"
            >
              About
            </Link>
            <Link href="/pipeline" className="text-blue-900 font-semibold">
              Pipeline
            </Link>
            <Link
              href="/research"
              className="hover:text-blue-900 transition-colors"
            >
              Research
            </Link>
          </nav>
          <Link
            href="/pipeline"
            className="bg-blue-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            View Pipeline
          </Link>
        </div>
      </header>

      <main>
        {/* Header */}
        <section className="bg-blue-950 text-white py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Pipeline
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">RCI0165</h1>
            <p className="text-blue-200 text-xl leading-relaxed max-w-2xl">
              A selective TRPV1 antagonist program targeting chronic pain and
              dry eye disease, currently in lead optimization with a compelling
              lead compound: CCP-2.
            </p>
          </div>
        </section>

        {/* Stage Progress Bar */}
        <section className="py-16 px-6 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-10 text-center">
              Development Stage
            </h2>
            <div className="flex items-start gap-0">
              {stages.map((stage, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm ${
                        stage.current
                          ? "bg-blue-900 text-white ring-4 ring-blue-200 shadow-lg"
                          : stage.done
                            ? "bg-blue-900 text-white"
                            : stage.next
                              ? "bg-gray-100 text-gray-400 border-2 border-dashed border-blue-300"
                              : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {stage.done && !stage.current ? "✓" : i + 1}
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-xs font-semibold leading-tight ${
                          stage.current
                            ? "text-blue-900"
                            : stage.done
                              ? "text-gray-700"
                              : "text-gray-400"
                        }`}
                      >
                        {stage.shortLabel}
                      </div>
                      {stage.current && (
                        <div className="text-blue-500 text-xs font-medium mt-0.5">
                          Current
                        </div>
                      )}
                      {stage.next && (
                        <div className="text-gray-400 text-xs mt-0.5">Next</div>
                      )}
                    </div>
                  </div>
                  {i < stages.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-1 rounded-full ${
                        stage.done && !stage.current
                          ? "bg-blue-900"
                          : stage.current
                            ? "bg-gradient-to-r from-blue-900 to-gray-200"
                            : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compound Data Table */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Lead Compound Profile: CCP-2
            </h2>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="px-6 py-4 text-left font-semibold">
                        Parameter
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Value
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Significance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Program Name
                      </td>
                      <td className="px-6 py-4 text-gray-700">RCI0165</td>
                      <td className="px-6 py-4 text-gray-500">
                        RudaCure internal identifier
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Lead Compound
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-semibold">
                        CCP-2
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        Top-ranked candidate from virtual screening &amp; MD
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Primary Target
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        TRPV1 (Transient Receptor Potential Vanilloid 1)
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        Validated pain and ocular target
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Indication(s)
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        Chronic Pain · Dry Eye Disease (DED)
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        Systemic and topical applications
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        MM-PBSA Binding Score
                      </td>
                      <td className="px-6 py-4 font-bold text-blue-900">
                        −71.89 kcal/mol
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        Strong predicted binding affinity to TRPV1
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        MOR Selectivity
                      </td>
                      <td className="px-6 py-4 text-green-700 font-semibold">
                        LOW
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        Minimal predicted mu-opioid receptor activity
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        KOR Selectivity
                      </td>
                      <td className="px-6 py-4 text-green-700 font-semibold">
                        LOW
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        Minimal predicted kappa-opioid receptor activity
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Hyperthermia
                      </td>
                      <td className="px-6 py-4 text-green-700 font-semibold">
                        Not observed
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        Key differentiator from earlier TRPV1 antagonists
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        MD Simulation Length
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        100 ns (Desmond)
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        Extended trajectory for binding stability assessment
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Development Stage
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                          Lead Optimization
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        Advancing toward preclinical studies
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Differentiation */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Competitive Differentiation
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Why Earlier TRPV1 Antagonists Failed
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-red-500 font-bold mt-0.5">×</span>
                    <span>
                      <strong>AMG-517 (Amgen):</strong> Demonstrated analgesic
                      activity in Phase 1 but caused dose-limiting hyperthermia.
                      Discontinued.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500 font-bold mt-0.5">×</span>
                    <span>
                      <strong>ABT-102 (AbbVie):</strong> Effective pain relief
                      in dental pain trials; discontinued due to elevated body
                      temperature in all subjects.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500 font-bold mt-0.5">×</span>
                    <span>
                      <strong>NEO6860 (Grünenthal):</strong> Designed for
                      reduced hyperthermia but still showed thermoregulatory
                      effects in clinical evaluation.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500 font-bold mt-0.5">×</span>
                    <span>
                      Root cause: TRPV1 blockade in hypothalamic
                      thermoregulatory circuits disrupts the body&apos;s heat
                      dissipation mechanism.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  How RudaCure Is Different
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    <span>
                      <strong>Mode-of-binding selectivity:</strong>{" "}
                      Structure-based design targeting binding geometries
                      predicted to avoid thermosensory TRPV1 function.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    <span>
                      <strong>Computational validation:</strong> 100 ns MD
                      simulations provide high-confidence binding stability data
                      before synthesis investment.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    <span>
                      <strong>Dual indication strategy:</strong> Both systemic
                      (pain) and topical (DED) routes of administration reduce
                      developmental risk.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    <span>
                      <strong>Clean opioid selectivity:</strong> Low MOR/KOR
                      activity profile avoids regulatory burden and abuse
                      liability concerns from the start.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-16 px-6 bg-blue-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Path Forward
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
                <div className="text-blue-900 font-bold text-sm uppercase tracking-widest mb-3">
                  Near Term
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Complete Lead Optimization
                </h3>
                <p className="text-gray-500 text-sm">
                  Finalize CCP-2 analog synthesis, confirm selectivity profile,
                  and establish ADMET properties for IND-enabling study
                  planning.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
                <div className="text-blue-900 font-bold text-sm uppercase tracking-widest mb-3">
                  Mid Term
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Preclinical Package
                </h3>
                <p className="text-gray-500 text-sm">
                  In vitro and in vivo pharmacology studies, safety/toxicology
                  assessment, and IND-enabling studies in preparation for
                  regulatory submission.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
                <div className="text-blue-900 font-bold text-sm uppercase tracking-widest mb-3">
                  Long Term
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Clinical Development
                </h3>
                <p className="text-gray-500 text-sm">
                  Phase 1 safety and dose-escalation study, followed by Phase 2
                  efficacy trials in pain and dry eye disease patient
                  populations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div>
              <div className="text-white font-bold text-lg mb-2">RudaCure</div>
              <p className="text-sm max-w-xs leading-relaxed">
                A biopharmaceutical company developing selective TRPV1
                antagonists for pain and dry eye disease.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              <div className="flex flex-col gap-3">
                <div className="text-white font-semibold text-xs uppercase tracking-widest">
                  Company
                </div>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/pipeline"
                  className="hover:text-white transition-colors"
                >
                  Pipeline
                </Link>
                <Link
                  href="/research"
                  className="hover:text-white transition-colors"
                >
                  Research
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-white font-semibold text-xs uppercase tracking-widest">
                  Resources
                </div>
                <Link
                  href="/llms.txt"
                  className="hover:text-white transition-colors"
                >
                  llms.txt
                </Link>
                <Link
                  href="/sitemap.xml"
                  className="hover:text-white transition-colors"
                >
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-xs text-center">
            © {new Date().getFullYear()} RudaCure. All rights reserved. Pipeline
            information is for informational purposes only.
          </div>
        </div>
      </footer>
    </>
  );
}
