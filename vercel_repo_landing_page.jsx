export default function RepoLandingPage() {
  const features = [
    {
      title: "Fast by default",
      description:
        "Built to feel instant, with a clean structure that fits modern Vercel deployments.",
    },
    {
      title: "Repository-ready",
      description:
        "Easy to drop into a GitHub repo and expand into docs, product pages, changelogs, or marketing.",
    },
    {
      title: "Made to scale",
      description:
        "Start with a sharp landing page, then grow into a full product site without redesigning from scratch.",
    },
  ];

  const sections = [
    "Overview",
    "Features",
    "Docs",
    "Roadmap",
    "GitHub",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white shadow-sm">
              GH
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">RepoSite</p>
              <p className="text-xs text-slate-500">GitHub + Vercel starter</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            {sections.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-slate-600 transition hover:text-slate-900"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#github"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              View Repo
            </a>
            <a
              href="#docs"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="overview" className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                Ready for GitHub repositories hosted on Vercel
              </div>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Launch a polished site for your repository from scratch.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                A clean, modern homepage designed for open-source projects, developer tools,
                startups, and product repositories. Replace the placeholder copy with your
                project details and deploy directly on Vercel.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#features"
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                >
                  Explore Features
                </a>
                <a
                  href="#roadmap"
                  className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                >
                  See Roadmap
                </a>
              </div>

              <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-sm">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-2xl font-semibold text-slate-950">Next.js</p>
                  <p className="mt-1 text-slate-500">App-ready</p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-2xl font-semibold text-slate-950">Vercel</p>
                  <p className="mt-1 text-slate-500">Deploy fast</p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-2xl font-semibold text-slate-950">GitHub</p>
                  <p className="mt-1 text-slate-500">Repo-first</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-slate-100 to-slate-50 blur-2xl" />
              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-300">Repository</p>
                      <h2 className="mt-1 text-xl font-semibold">your-org/your-project</h2>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                      Public
                    </span>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Deploys</p>
                      <p className="mt-2 text-3xl font-semibold">Instant</p>
                      <p className="mt-2 text-sm text-slate-300">Push to GitHub and ship on Vercel.</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Docs</p>
                      <p className="mt-2 text-3xl font-semibold">Structured</p>
                      <p className="mt-2 text-sm text-slate-300">Highlight usage, setup, and roadmap.</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Starter checklist</p>
                    <ul className="mt-3 space-y-3 text-sm text-slate-200">
                      <li>• Replace brand name and hero copy</li>
                      <li>• Link your GitHub repository</li>
                      <li>• Add installation and usage docs</li>
                      <li>• Connect Vercel deployment settings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-y border-slate-200 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Features
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Everything you need for a strong repository homepage.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 h-12 w-12 rounded-2xl bg-slate-900" />
                  <h3 className="text-lg font-semibold text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="docs" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Documentation</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Build trust with clear setup and usage guidance.
              </h2>
              <div className="mt-8 space-y-5">
                {[
                  "Installation steps for contributors and users",
                  "Quick-start examples with commands and screenshots",
                  "Architecture overview for maintainers",
                  "Contribution guide and issue templates",
                ].map((item) => (
                  <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                    <div className="mt-1 h-3 w-3 rounded-full bg-slate-900" />
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Deploy flow</p>
              <div className="mt-6 space-y-6">
                {[
                  ["1", "Push your code", "Commit the site to a GitHub repository."],
                  ["2", "Import into Vercel", "Connect the repo and detect framework settings."],
                  ["3", "Ship updates", "Every push triggers a fresh deployment."],
                ].map(([step, title, desc]) => (
                  <div key={step} className="rounded-2xl bg-white/5 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950">
                        {step}
                      </div>
                      <h3 className="text-base font-semibold">{title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="roadmap" className="bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Roadmap</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Show where the project is heading next.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-600">
                Great repo sites turn momentum into clarity. Use this section to highlight milestones,
                releases, and upcoming work.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  phase: "Phase 1",
                  title: "Public launch",
                  text: "Core features live, docs polished, first users onboarded.",
                },
                {
                  phase: "Phase 2",
                  title: "Community growth",
                  text: "Open issues, contributor guides, and feedback loops in place.",
                },
                {
                  phase: "Phase 3",
                  title: "Platform expansion",
                  text: "Add integrations, analytics, and deeper product storytelling.",
                },
              ].map((item) => (
                <div key={item.phase} className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
                  <p className="text-sm font-medium text-slate-500">{item.phase}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="github" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-12 text-white shadow-xl shadow-slate-200/70 lg:px-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">GitHub</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Connect this page to your repository and deploy on Vercel.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  Swap in your repo URL, project name, documentation links, and release details.
                  This starter is intentionally flexible so it works for tools, SaaS apps, and open-source projects.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="https://github.com"
                  className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:opacity-90"
                >
                  Open GitHub
                </a>
                <a
                  href="https://vercel.com"
                  className="rounded-2xl border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Deploy on Vercel
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 RepoSite. Built for GitHub repositories hosted on Vercel.</p>
          <div className="flex items-center gap-4">
            <a href="#overview" className="transition hover:text-slate-900">
              Back to top
            </a>
            <a href="#docs" className="transition hover:text-slate-900">
              Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
