import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import {
  Database,
  Palette,
  GitCommit,
  Code2,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col px-6 md:px-12 lg:px-24">
      {/* Header */}
      <header className="flex items-center justify-between py-6 border-b border-slate-200/50">
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="font-mono text-[13px] text-slate-650 hover:text-brand-indigo transition-colors uppercase tracking-wider font-semibold">
            Dashboard
          </Link>
          <Link href="/generate">
            <Button variant="primary">Launch App</Button>
          </Link>
        </div>
      </header>

      {/* Main hero */}
      <main className="flex-1 flex flex-col max-w-7xl mx-auto py-16 md:py-24 w-full">

        {/* Hero: text left, workspace preview right */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-center mb-24">

          <div>
            <h1 className="font-display font-bold text-[36px] md:text-[52px] tracking-[-0.02em] leading-[1.1] text-brand-slate mb-6">
              Build custom AI assistant <span className="text-brand-indigo">skills</span>.<br />Master any codebase.
            </h1>
            <p className="font-sans text-[15px] md:text-[16px] text-slate-500 max-w-lg leading-[1.6] mb-8">
              Author and package coding guidelines, design systems, and helper tools into skill bundles for Cursor, Claude Code, Windsurf, and Continue.
            </p>
            <Link href="/generate">
              <Button variant="accent" className="text-[15px] px-8 py-3 shadow-md shadow-brand-indigo/10 hover:scale-[1.02] transition-transform">
                Launch App &rarr;
              </Button>
            </Link>
          </div>

          {/* Real product screenshot inside a Signature Card frame */}
          <div className="w-full bg-brand-slate rounded-[14px] p-2.5 shadow-xl border border-slate-800/80 skill-card-grid relative overflow-hidden group hover:border-brand-indigo/35 transition-all duration-300">

            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-2 pb-2.5 select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/85" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/85" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/85" />
            </div>

            <Image
              src="/screenshots/generate-preview.png"
              alt="SkillStudio's skill generator: chat panel, model selector, and live SKILL.md preview"
              width={1503}
              height={716}
              className="w-full h-auto rounded-lg border border-slate-800/60"
              priority
            />
          </div>

        </div>

        {/* Showcase / Skill Types Section */}
        <div className="text-center mb-10">
          <h2 className="font-display font-semibold text-[22px] tracking-[-0.02em] text-brand-slate mb-2">
            Build any skill you need
          </h2>
          <p className="font-sans text-[15px] text-slate-500 max-w-md mx-auto">
            Package domain-specific intelligence for your models to make code review and creation incredibly precise.
          </p>
        </div>

        {/* 4 Step Cards (Signature Cards Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-24">
          
          <div className="bg-brand-slate text-[#F8FAFC] rounded-[14px] p-6 skill-card-grid border border-slate-800/80 relative overflow-hidden shadow-lg hover:border-brand-indigo/35 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-brand-indigo/15 border border-brand-indigo/30 flex items-center justify-center mb-4 select-none">
                <Database className="w-4 h-4 text-brand-indigo" />
              </div>
              <h3 className="font-display font-semibold text-[18px] tracking-[-0.02em] mb-2 text-[#F8FAFC]">
                Database Helper
              </h3>
              <p className="font-sans text-[13px] text-slate-400 leading-[1.6]">
                Rules for writing Supabase client calls, Postgres constraints, and clean DB migrations.
              </p>
            </div>
            <span className="font-mono text-[10px] text-brand-indigo mt-4 block uppercase tracking-wider font-semibold">DB & ORM</span>
          </div>
          
          <div className="bg-brand-slate text-[#F8FAFC] rounded-[14px] p-6 skill-card-grid border border-slate-800/80 relative overflow-hidden shadow-lg hover:border-brand-indigo/35 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-brand-indigo/15 border border-brand-indigo/30 flex items-center justify-center mb-4 select-none">
                <Palette className="w-4 h-4 text-brand-indigo" />
              </div>
              <h3 className="font-display font-semibold text-[18px] tracking-[-0.02em] mb-2 text-[#F8FAFC]">
                Design System Guide
              </h3>
              <p className="font-sans text-[13px] text-slate-400 leading-[1.6]">
                Enforces precise spacing scales, custom design tokens, dark mode guidelines, and typography.
              </p>
            </div>
            <span className="font-mono text-[10px] text-brand-indigo mt-4 block uppercase tracking-wider font-semibold">UI & STYLING</span>
          </div>

          <div className="bg-brand-slate text-[#F8FAFC] rounded-[14px] p-6 skill-card-grid border border-slate-800/80 relative overflow-hidden shadow-lg hover:border-brand-indigo/35 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-brand-indigo/15 border border-brand-indigo/30 flex items-center justify-center mb-4 select-none">
                <Code2 className="w-4 h-4 text-brand-indigo" />
              </div>
              <h3 className="font-display font-semibold text-[18px] tracking-[-0.02em] mb-2 text-[#F8FAFC]">
                API Architect
              </h3>
              <p className="font-sans text-[13px] text-slate-400 leading-[1.6]">
                Standard patterns for routing, payload schema checks, and external API gateways.
              </p>
            </div>
            <span className="font-mono text-[10px] text-brand-indigo mt-4 block uppercase tracking-wider font-semibold">INTEGRATIONS</span>
          </div>

          <div className="bg-brand-slate text-[#F8FAFC] rounded-[14px] p-6 skill-card-grid border border-slate-800/80 relative overflow-hidden shadow-lg hover:border-brand-indigo/35 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-brand-indigo/15 border border-brand-indigo/30 flex items-center justify-center mb-4 select-none">
                <GitCommit className="w-4 h-4 text-brand-indigo" />
              </div>
              <h3 className="font-display font-semibold text-[18px] tracking-[-0.02em] mb-2 text-[#F8FAFC]">
                Git Automator
              </h3>
              <p className="font-sans text-[13px] text-slate-400 leading-[1.6]">
                Teaches correct conventional commit formatting, pull request summaries, and git hook scripts.
              </p>
            </div>
            <span className="font-mono text-[10px] text-brand-indigo mt-4 block uppercase tracking-wider font-semibold">VERSION CONTROL</span>
          </div>

        </div>

        {/* Key Features / Benefits List */}
        <div className="border-t border-slate-200/50 pt-16 grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-10">
          <div>
            <h4 className="font-display font-semibold text-[18px] text-brand-slate mb-2">100% Client-Side Privacy</h4>
            <p className="font-sans text-[14px] text-slate-500 leading-[1.6]">
              Your model provider API keys are stored strictly in your browser&apos;s localStorage and sent directly in-memory to execute calls. We never write keys to a database or server logs.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-[18px] text-brand-slate mb-2">IDE Agnostic Packages</h4>
            <p className="font-sans text-[14px] text-slate-500 leading-[1.6]">
              Generate instructions, helper scripts, and assets exported as structured `.skill` zip bundles. Ready to run in Claude Code, Cursor, Windsurf, Continue, and others.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-[18px] text-brand-slate mb-2">Zero Server Storage Option</h4>
            <p className="font-sans text-[14px] text-slate-500 leading-[1.6]">
              Use our local mock fallback configuration to test and package skills entirely in your browser memory without creating a database profile.
            </p>
          </div>
        </div>

        {/* Works with section */}
        <div className="border-t border-slate-200/50 pt-10 mt-16 text-center">
          <div className="font-mono text-[11px] text-brand-slate-light uppercase tracking-wider mb-4 select-none">Supported Assistants & IDEs</div>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="font-mono text-[11px] bg-indigo-50 border border-brand-indigo/10 text-brand-indigo px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">Claude Code</span>
            <span className="font-mono text-[11px] bg-indigo-50 border border-brand-indigo/10 text-brand-indigo px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">Cursor</span>
            <span className="font-mono text-[11px] bg-indigo-50 border border-brand-indigo/10 text-brand-indigo px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">Windsurf</span>
            <span className="font-mono text-[11px] bg-indigo-50 border border-brand-indigo/10 text-brand-indigo px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">Continue</span>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-24 bg-brand-slate text-center rounded-[14px] px-8 py-16 shadow-xl border border-slate-800/80 skill-card-grid relative overflow-hidden">
          <h2 className="font-display font-bold text-[28px] md:text-[36px] tracking-[-0.02em] leading-[1.1] text-[#F8FAFC] mb-4">
            Package your first skill in minutes.
          </h2>
          <p className="font-sans text-[15px] text-slate-400 max-w-md mx-auto mb-8 leading-[1.6]">
            No signup, no server storage. Bring your own API key and export a ready-to-install bundle.
          </p>
          <Link href="/generate">
            <Button variant="accent" className="text-[15px] px-8 py-3 shadow-md shadow-brand-indigo/20 hover:scale-[1.02] transition-transform">
              Launch App &rarr;
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200/50 text-center font-mono text-[11px] text-slate-400 mt-auto select-none">
        &copy; {new Date().getFullYear()} SkillStudio. Created for advanced agent custom behavior.
      </footer>
    </div>
  )
}
