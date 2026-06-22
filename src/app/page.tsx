import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RudaCure | Precision Pain. No Fever.",
  description:
    "RudaCure develops selective TRPV1 antagonists that treat chronic pain and dry eye disease without drug-induced hyperthermia — solving the problem that failed earlier drug candidates.",
  alternates: {
    canonical: "https://rudacure.com",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "RudaCure — TRPV1 Drug Discovery",
  url: "https://rudacure.com",
  description:
    "RudaCure develops selective TRPV1 antagonists for pain and dry eye disease without hyperthermia.",
  isPartOf: {
    "@type": "WebSite",
    name: "RudaCure",
    url: "https://rudacure.com",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
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
            <Link
              href="/pipeline"
              className="hover:text-blue-900 transition-colors"
            >
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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-28 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-600/40 rounded-full px-4 py-1.5 text-blue-200 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Lead Optimization Stage · RCI0165
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Precision Pain.
              <br />
              No Fever.
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
              RudaCure is developing selective TRPV1 antagonists that address
              chronic pain and dry eye disease — without the drug-induced
              hyperthermia that caused earlier candidates to fail in clinical
              trials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pipeline"
                className="bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                View Pipeline
              </Link>
              <Link
                href="/about"
                className="border border-blue-400 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800/50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Problem / Solution */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The TRPV1 Opportunity
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                A validated pain target with a previously unsolved side effect —
                until now.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
                <div className="text-red-600 text-sm font-semibold uppercase tracking-widest mb-4">
                  The Problem
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  TRPV1 Is Validated — But Caused Hyperthermia
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  TRPV1 (Transient Receptor Potential Vanilloid 1) is a
                  well-validated pain target expressed in nociceptors and ocular
                  tissues. Earlier antagonists from major pharmaceutical
                  companies demonstrated compelling analgesic activity in Phase
                  1 and 2 trials, but were discontinued because they caused
                  dose-limiting drug-induced hyperthermia (core body temperature
                  elevation of 1–2°C). The target never went away — only the
                  approach failed.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
                <div className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">
                  The Solution
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Selectivity-Driven Design Without Hyperthermia
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  RudaCure employs structure-based drug design and 100 ns
                  molecular dynamics simulations (Desmond) to identify TRPV1
                  antagonists with favorable binding modes that avoid the
                  thermosensory mechanism responsible for hyperthermia. Our lead
                  compound, CCP-2, demonstrates strong MM-PBSA binding affinity
                  (−71.89 kcal/mol) with low off-target activity at MOR and KOR
                  opioid receptors — the profile needed to advance safely into
                  preclinical studies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pipeline Snapshot */}
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pipeline
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Focused on a single high-conviction program with a clear path to
                preclinical studies.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">
                    Lead Program
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">RCI0165</h3>
                  <p className="text-gray-500 mt-1">
                    TRPV1 Selective Antagonist · Pain + Dry Eye Disease
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 w-32">Lead Compound</span>
                    <span className="font-semibold text-gray-900">CCP-2</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 w-32">MM-PBSA Score</span>
                    <span className="font-semibold text-gray-900">
                      −71.89 kcal/mol
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 w-32">Selectivity</span>
                    <span className="font-semibold text-gray-900">
                      MOR LOW / KOR LOW
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 w-32">Hyperthermia</span>
                    <span className="font-semibold text-green-600">
                      Not observed
                    </span>
                  </div>
                </div>
              </div>

              {/* Stage Progress */}
              <div className="border-t border-gray-100 pt-8">
                <div className="flex items-center gap-0 overflow-x-auto">
                  {[
                    { label: "Target ID", done: true },
                    { label: "Hit Discovery", done: true },
                    { label: "Lead Optimization", done: true, current: true },
                    { label: "Preclinical", done: false, next: true },
                    { label: "IND", done: false },
                    { label: "Phase 1", done: false },
                  ].map((stage, i) => (
                    <div key={i} className="flex items-center flex-1 min-w-0">
                      <div className="flex flex-col items-center gap-2 flex-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            stage.current
                              ? "bg-blue-900 text-white ring-4 ring-blue-200"
                              : stage.done
                                ? "bg-blue-900 text-white"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {stage.done && !stage.current ? "✓" : i + 1}
                        </div>
                        <span
                          className={`text-xs text-center leading-tight ${
                            stage.current
                              ? "text-blue-900 font-bold"
                              : stage.done
                                ? "text-gray-700 font-medium"
                                : "text-gray-400"
                          }`}
                        >
                          {stage.label}
                          {stage.current && (
                            <span className="block text-blue-500 font-normal">
                              Current
                            </span>
                          )}
                        </span>
                      </div>
                      {i < 5 && (
                        <div
                          className={`h-0.5 flex-1 mx-1 ${stage.done ? "bg-blue-900" : "bg-gray-200"}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/pipeline"
                className="text-blue-900 font-semibold hover:underline text-sm"
              >
                Full pipeline details →
              </Link>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Technology Platform
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Combining computational rigor with structural biology to
                identify superior candidates faster.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center text-white text-xl mb-6">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Structure-Based Screening
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Virtual screening against TRPV1 crystal structures using
                  docking and pharmacophore modeling to identify candidates with
                  favorable binding geometry and predicted selectivity profiles.
                </p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center text-white text-xl mb-6">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Molecular Dynamics (100 ns Desmond)
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Extended MD simulations using Schrödinger Desmond to validate
                  binding stability, assess conformational flexibility, and
                  compute MM-PBSA binding free energies under physiological
                  conditions.
                </p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center text-white text-xl mb-6">
                  3
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  AI-Assisted Discovery
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Machine learning models trained on bioactivity and selectivity
                  data accelerate compound ranking, ADMET prediction, and
                  identification of structural modifications for lead
                  optimization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 px-6 bg-blue-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Interested in Collaborating?
            </h2>
            <p className="text-blue-200 mb-8 leading-relaxed">
              We welcome partnerships with academic institutions, CROs, and
              pharma companies focused on pain, neuroscience, and ophthalmology.
            </p>
            <Link
              href="/about"
              className="inline-block bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Learn About RudaCure
            </Link>
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
                <Link
                  href="/robots.txt"
                  className="hover:text-white transition-colors"
                >
                  Robots
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-xs text-center">
            © {new Date().getFullYear()} RudaCure. All rights reserved. The
            information on this site is for informational purposes only and does
            not constitute medical or investment advice.
          </div>
        </div>
      </footer>
    </>
  );
}
