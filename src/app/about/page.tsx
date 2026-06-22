import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About RudaCure | TRPV1 Drug Discovery Company",
  description:
    "RudaCure is a biopharmaceutical company focused on developing selective TRPV1 antagonists. Learn about our mission, team, and scientific approach to solving chronic pain and dry eye disease.",
  alternates: {
    canonical: "https://rudacure.com/about",
  },
  openGraph: {
    title: "About RudaCure | TRPV1 Drug Discovery Company",
    description:
      "Learn about RudaCure's mission to develop selective TRPV1 antagonists for pain and dry eye disease without drug-induced hyperthermia.",
    url: "https://rudacure.com/about",
    type: "website",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: "RudaCure",
  url: "https://rudacure.com",
  description:
    "RudaCure is a biopharmaceutical company developing selective TRPV1 antagonists to treat chronic pain and dry eye disease (DED) without drug-induced hyperthermia.",
  foundingDate: "2024",
  areaServed: "Global",
  knowsAbout: [
    "TRPV1 antagonists",
    "Chronic pain pharmacology",
    "Dry eye disease (DED)",
    "Structure-based drug design",
    "Molecular dynamics simulation",
    "MM-PBSA free energy calculation",
    "Opioid receptor selectivity",
  ],
};

const glossaryTerms = [
  {
    term: "TRPV1 (Transient Receptor Potential Vanilloid 1)",
    definition:
      "A non-selective cation channel expressed in sensory neurons (nociceptors) and ocular epithelial cells. TRPV1 is activated by noxious heat (>43°C), capsaicin, acidic pH, and inflammatory lipid mediators. It functions as a key integrator of pain and thermal stimuli. Antagonism of TRPV1 reduces nociceptor firing, making it a validated target for analgesic drug development. TRPV1 is also expressed in corneal and conjunctival tissues, supporting its role in dry eye disease pathophysiology.",
  },
  {
    term: "MM-PBSA (Molecular Mechanics / Poisson–Boltzmann Surface Area)",
    definition:
      "A widely used computational method for estimating the binding free energy between a small molecule and a protein receptor. MM-PBSA combines molecular mechanics energy terms with continuum solvation models (Poisson–Boltzmann for polar solvation, solvent-accessible surface area for nonpolar) calculated from molecular dynamics trajectories. More negative MM-PBSA values indicate stronger predicted binding affinity. RudaCure's lead compound CCP-2 achieves an MM-PBSA score of −71.89 kcal/mol against TRPV1.",
  },
  {
    term: "Drug-Induced Hyperthermia (TRPV1 Antagonist Hyperthermia)",
    definition:
      "A class-specific adverse effect observed with non-selective TRPV1 antagonists, characterized by elevation of core body temperature by 1–2°C. This occurs because TRPV1 participates in thermoregulatory pathways in the hypothalamus; systemic blockade of this thermosensory role impairs the body's ability to dissipate heat. Drug-induced hyperthermia was the primary reason first-generation TRPV1 antagonists (including AbbVie's ABT-102 and Grünenthal's NEO6860) were discontinued in clinical trials despite demonstrating efficacy. RudaCure's approach targets binding modes predicted to avoid this thermosensory mechanism.",
  },
  {
    term: "Dry Eye Disease (DED)",
    definition:
      "A multifactorial ocular surface disease characterized by a loss of tear film homeostasis, resulting in ocular discomfort, visual disturbance, and tear film instability. DED affects an estimated 344 million people globally. TRPV1 is upregulated in the corneal and conjunctival epithelium of DED patients, contributing to neurogenic inflammation, sensory hypersensitivity, and impaired tear secretion. Topical TRPV1 antagonism represents a novel mechanism for DED treatment distinct from existing immunomodulatory or secretagogue approaches.",
  },
  {
    term: "RCI0165",
    definition:
      "RudaCure's lead drug discovery program, targeting TRPV1 for both systemic pain and topical dry eye indications. The program is currently in lead optimization stage. The lead compound, CCP-2, was identified through virtual screening and validated with 100 ns molecular dynamics simulations using Schrödinger Desmond. CCP-2 demonstrates an MM-PBSA binding score of −71.89 kcal/mol against TRPV1, with low predicted off-target activity at mu-opioid receptor (MOR) and kappa-opioid receptor (KOR) — important selectivity markers for safety. No hyperthermia signal has been observed in computational profiling.",
  },
  {
    term: "MOR / KOR (Mu-Opioid Receptor / Kappa-Opioid Receptor)",
    definition:
      "G protein-coupled receptors that are the primary targets of opioid analgesics. MOR activation mediates analgesia, euphoria, and respiratory depression; KOR activation produces dysphoria and psychotomimetic effects. Off-target activity at MOR or KOR by a non-opioid analgesic candidate raises serious regulatory and safety concerns, including abuse liability and CNS side effects. RudaCure profiles all TRPV1 candidates for MOR/KOR selectivity as part of lead optimization. CCP-2 demonstrates low predicted activity at both receptors, supporting a favorable safety profile.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-900">
            RudaCure
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/about" className="text-blue-900 font-semibold">
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
        {/* Page Header */}
        <section className="bg-blue-950 text-white py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
              About
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Redefining Pain Drug Discovery
            </h1>
            <p className="text-blue-200 text-xl leading-relaxed max-w-2xl">
              RudaCure is a biopharmaceutical company developing the next
              generation of TRPV1-targeted therapeutics — starting where others
              left off.
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Company Overview
            </h2>
            <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
              <p>
                RudaCure is a drug discovery company building on more than two
                decades of TRPV1 biology to develop analgesic and ophthalmic
                compounds with a differentiated safety profile. Our focus is on
                the TRPV1 ion channel — one of the most studied and validated
                pain targets in the field — with a proprietary approach designed
                to avoid the class-wide hyperthermia side effect that has
                historically blocked this target's clinical translation.
              </p>
              <p>
                Our lead program, RCI0165, targets TRPV1 for both systemic pain
                management and topical treatment of dry eye disease (DED). The
                program uses structure-based drug design combined with extended
                molecular dynamics simulation to identify compounds with
                predicted binding modes that dissociate analgesic activity from
                thermosensory disruption.
              </p>
              <p>
                The global pain management market exceeds $80 billion annually,
                and dry eye disease affects an estimated 344 million patients
                worldwide. Both conditions represent unmet needs where existing
                therapies are inadequate, addictive, or associated with
                significant side effects.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-6 bg-blue-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Mission</h2>
            <div className="bg-white rounded-2xl p-10 border border-blue-100 shadow-sm">
              <blockquote className="text-2xl font-light text-blue-900 leading-relaxed italic">
                "To develop precision medicines that address the root molecular
                mechanisms of pain and inflammation — without the side effects
                that have limited previous therapeutic approaches."
              </blockquote>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  TRPV1
                </div>
                <div className="text-gray-600 text-sm">
                  Primary target — validated across 20+ years of academic and
                  pharma research
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <div className="text-3xl font-bold text-blue-900 mb-2">2</div>
                <div className="text-gray-600 text-sm">
                  Indications in development — chronic pain and dry eye disease
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <div className="text-3xl font-bold text-blue-900 mb-2">0°C</div>
                <div className="text-gray-600 text-sm">
                  Target temperature elevation — designing away from
                  hyperthermia from the start
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Team</h2>
            <p className="text-gray-500 mb-10">
              RudaCure is built by a team with backgrounds in computational
              chemistry, pharmacology, and drug development. Full team bios will
              be published as we grow.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-200 rounded-full mb-4 flex items-center justify-center text-blue-900 font-bold text-xl">
                  S
                </div>
                <div className="font-bold text-gray-900">
                  Scientific Leadership
                </div>
                <div className="text-blue-600 text-sm mt-1">
                  Computational Chemistry &amp; Drug Design
                </div>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  Expertise in structure-based drug design, molecular dynamics
                  simulation, and GPCR/ion channel pharmacology.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-200 rounded-full mb-4 flex items-center justify-center text-blue-900 font-bold text-xl">
                  R
                </div>
                <div className="font-bold text-gray-900">
                  Research &amp; Development
                </div>
                <div className="text-blue-600 text-sm mt-1">
                  Medicinal Chemistry &amp; Preclinical Development
                </div>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  Background in hit-to-lead optimization, ADMET
                  characterization, and translational pharmacology for CNS and
                  pain indications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Scientific Glossary — critical for AI citation */}
        <section className="py-20 px-6 bg-gray-50" id="glossary">
          <div className="max-w-4xl mx-auto">
            <div className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Scientific Reference
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Glossary of Key Terms
            </h2>
            <p className="text-gray-500 mb-10 text-sm">
              Definitions of scientific terms relevant to RudaCure&apos;s
              research for researchers, investors, and AI knowledge systems.
            </p>
            <div className="space-y-6">
              {glossaryTerms.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-blue-900 mb-3">
                    {item.term}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.definition}
                  </p>
                </div>
              ))}
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
            © {new Date().getFullYear()} RudaCure. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
