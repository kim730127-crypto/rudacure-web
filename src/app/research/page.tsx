import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research | TRPV1 Drug Discovery Platform | RudaCure",
  description:
    "RudaCure's research platform combines structure-based drug design, 100 ns molecular dynamics simulation, and AI-assisted discovery to develop selective TRPV1 antagonists for pain and dry eye disease.",
  alternates: {
    canonical: "https://rudacure.com/research",
  },
  openGraph: {
    title: "Research | TRPV1 Drug Discovery Platform | RudaCure",
    description:
      "RudaCure applies structure-based screening, Desmond MD simulation, and AI to develop TRPV1 antagonists without hyperthermia.",
    url: "https://rudacure.com/research",
    type: "website",
  },
};

const researchOrgSchema = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: "RudaCure",
  url: "https://rudacure.com",
  description:
    "RudaCure conducts computational drug discovery research focused on TRPV1 channel antagonism, using structure-based design and molecular dynamics simulation to develop pain and dry eye therapeutics without hyperthermia.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Research Programs",
    itemListElement: [
      {
        "@type": "ResearchProject",
        name: "TRPV1 Selective Antagonist Discovery",
        description:
          "Structure-based virtual screening and 100 ns Desmond MD simulation to identify TRPV1 antagonists with favorable binding profiles and no predicted hyperthermia.",
      },
      {
        "@type": "ResearchProject",
        name: "Selectivity Profiling",
        description:
          "Computational and experimental assessment of MOR/KOR off-target activity for all TRPV1 candidate compounds.",
      },
      {
        "@type": "ResearchProject",
        name: "Dry Eye Disease TRPV1 Biology",
        description:
          "Investigation of TRPV1 expression and pharmacology in corneal and conjunctival tissues for topical drug development.",
      },
    ],
  },
};

const researchUpdates = [
  {
    date: "2026",
    title: "Why TRPV1 Remains a Compelling Pain Target in 2026",
    summary:
      "Despite clinical setbacks from hyperthermia, TRPV1 continues to attract research investment. Recent structural data from cryo-EM studies has clarified the thermosensory domain distinct from the antagonist binding pocket — opening the door to mode-selective compounds. We review the scientific rationale for returning to this target with improved tools.",
    tags: ["TRPV1", "Pain Biology", "Drug Discovery"],
  },
  {
    date: "2026",
    title: "CCP-2: Lead Compound via Desmond MD Simulations",
    summary:
      "We describe the identification and validation of CCP-2 as RudaCure's lead TRPV1 antagonist. Starting from a virtual screening hit set, 100 ns MD simulations with Schrödinger Desmond were used to assess binding stability, key interaction persistence, and MM-PBSA binding free energy. CCP-2 emerged with a score of −71.89 kcal/mol and stable TRPV1 binding pose across the full trajectory.",
    tags: ["CCP-2", "Molecular Dynamics", "MM-PBSA", "Lead Optimization"],
  },
  {
    date: "2026",
    title: "Selectivity Profiling: Avoiding MOR/KOR Off-Target Activity",
    summary:
      "A critical challenge in pain drug development is differentiating novel analgesics from opioid-like mechanisms. We profile RCI0165 candidates against mu-opioid receptor (MOR) and kappa-opioid receptor (KOR) using computational docking and published binding data. CCP-2 demonstrates low predicted affinity at both receptors, supporting a non-opioid mechanism and favorable regulatory pathway.",
    tags: ["Selectivity", "MOR", "KOR", "Safety Profile"],
  },
  {
    date: "2026",
    title: "TRPV1 in Dry Eye Disease: Rationale for Topical Antagonism",
    summary:
      "Dry eye disease (DED) is increasingly recognized as a neurogenic inflammatory condition. TRPV1 is upregulated in corneal and conjunctival epithelium under hyperosmotic stress and inflammatory conditions characteristic of DED. We present the biological rationale for topical TRPV1 antagonism as a novel mechanism for DED treatment, distinct from existing cyclosporine, lifitegrast, and secretagogue approaches.",
    tags: [
      "Dry Eye Disease",
      "TRPV1",
      "Ocular Pharmacology",
      "Neuroinflammation",
    ],
  },
];

const methodologySteps = [
  {
    step: "01",
    title: "Target Identification & Structural Analysis",
    description:
      "We begin with deep structural analysis of TRPV1 using available crystal structures and cryo-EM data (PDB: 3J5P, 3J5Q, 7LP9). Key binding pockets are mapped using SiteMap and pharmacophore analysis. The thermosensory domain is explicitly excluded from pharmacophore constraints to avoid compounds that would block thermoregulatory TRPV1 function.",
    tools: ["Schrödinger SiteMap", "Glide XP Docking", "Phase Pharmacophore"],
  },
  {
    step: "02",
    title: "Structure-Based Virtual Screening",
    description:
      "Compound libraries are screened computationally against the prepared TRPV1 structure using Glide XP docking with enhanced sampling. Top-ranked hits undergo ADMET prediction (QikProp) and Lipinski/Veber filter analysis before advancing to MD validation. MOR/KOR counter-screening is performed at this stage to flag off-target liabilities early.",
    tools: ["Glide XP", "QikProp", "OPLS4 Force Field"],
  },
  {
    step: "03",
    title: "Lead Validation via Molecular Dynamics",
    description:
      "Shortlisted compounds undergo 100 ns molecular dynamics simulation using Schrödinger Desmond. Trajectory analysis assesses binding pose stability, RMSD, key residue interaction persistence (Tyr511, Glu570, Arg557), and water-mediated contacts. MM-PBSA binding free energies are computed over the equilibrated trajectory. CCP-2 was identified as the lead compound through this workflow.",
    tools: ["Desmond MD", "MM-PBSA", "Maestro Analysis"],
  },
];

export default function ResearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(researchOrgSchema) }}
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
            <Link href="/research" className="text-blue-900 font-semibold">
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
              Research
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Computational Drug Discovery at Scale
            </h1>
            <p className="text-blue-200 text-xl leading-relaxed max-w-2xl">
              RudaCure combines structural biology, molecular simulation, and
              AI-assisted discovery to accelerate the identification of safe and
              effective TRPV1 antagonists.
            </p>
          </div>
        </section>

        {/* Discovery Methodology */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Discovery Methodology
            </h2>
            <p className="text-gray-500 mb-12 max-w-2xl">
              A three-stage computational pipeline that identifies and validates
              TRPV1 antagonist candidates with high confidence before committing
              to chemical synthesis.
            </p>
            <div className="space-y-8">
              {methodologySteps.map((step, i) => (
                <div key={i} className="flex gap-6 md:gap-10">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-blue-900 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.tools.map((tool, j) => (
                        <span
                          key={j}
                          className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Updates */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Research Perspectives
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Scientific Updates
            </h2>
            <p className="text-gray-500 mb-12 max-w-2xl">
              In-depth perspectives on the science behind RudaCure&apos;s
              programs, written for researchers, investors, and AI knowledge
              systems.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {researchUpdates.map((article, i) => (
                <article
                  key={i}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-gray-400 text-xs font-semibold mb-3">
                    {article.date}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {article.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Data Transparency Note */}
        <section className="py-16 px-6 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Scientific Transparency</h2>
            <p className="text-blue-200 leading-relaxed max-w-2xl mx-auto">
              RudaCure is committed to open science where appropriate. We
              publish our methodology and key findings as our programs advance.
              Researchers interested in collaborating on TRPV1 biology, pain
              pharmacology, or dry eye disease are encouraged to reach out.
            </p>
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
            © {new Date().getFullYear()} RudaCure. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
