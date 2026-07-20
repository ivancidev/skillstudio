import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  ShieldCheck, 
  Cpu, 
  Folder, 
  FileText, 
  Database, 
  Palette, 
  GitCommit, 
  Code2, 
  ArrowRight,
  Terminal
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
      <main className="flex-1 flex flex-col justify-center max-w-5xl mx-auto py-16 md:py-24">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-brand-indigo/20 px-3.5 py-1.5 rounded-full select-none max-w-fit mx-auto mb-6">
          <Cpu className="w-3.5 h-3.5 text-brand-indigo animate-pulse" />
          <span className="font-mono text-[11px] text-brand-indigo font-bold uppercase tracking-wider">SkillStudio v1.0</span>
        </div>

        {/* Hero Typography */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-display font-bold text-[36px] md:text-[56px] tracking-[-0.02em] leading-[1.1] text-brand-slate mb-6">
            Build custom AI assistant <span className="text-brand-indigo">skills</span>.<br />Master any codebase.
          </h1>
          <p className="font-sans text-[15px] md:text-[16px] text-slate-500 max-w-xl mx-auto leading-[1.6]">
            Author, refine, and package tailored coding guidelines, design systems, or helper tools into `.skill` bundles ready to install in Cursor, Claude Code, Windsurf, and Continue.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/generate" className="w-full sm:w-auto">
            <Button variant="accent" className="w-full sm:w-auto text-[15px] px-8 py-3 shadow-md shadow-brand-indigo/10 hover:scale-[1.02] transition-transform">
              Start generating &rarr;
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto text-[15px] px-8 py-3 hover:bg-slate-50 hover:border-brand-indigo/40 transition-colors">
              View your skills
            </Button>
          </Link>
        </div>

        {/* Visual Workspace Mockup inside a Signature Card */}
        <div className="w-full max-w-4xl mx-auto bg-brand-slate text-left rounded-[14px] p-6 shadow-xl border border-slate-800/80 skill-card-grid relative overflow-hidden mb-24 group hover:border-brand-indigo/35 transition-all duration-300">
          
          {/* Header of Mockup */}
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-4 select-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/85" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/85" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/85" />
            </div>
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-brand-indigo" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-brand-slate-light">Workspace Preview</span>
            </div>
          </div>

          {/* Editor Grid Split */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[13px] text-slate-300">
            
            {/* Sidebar (Folder Structure) */}
            <div className="border-r border-slate-800/65 pr-4 space-y-3 md:col-span-1 select-none">
              <div className="text-slate-500 uppercase text-[10px] tracking-wider font-semibold">Project tree</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Folder className="w-4 h-4 text-brand-indigo" />
                  <span>my-codebase/</span>
                </div>
                <div className="flex items-center gap-2 pl-4 text-slate-400">
                  <Folder className="w-4 h-4 text-brand-indigo" />
                  <span>.agents/</span>
                </div>
                <div className="flex items-center gap-2 pl-8 text-slate-400">
                  <Folder className="w-4 h-4 text-brand-indigo" />
                  <span>skills/</span>
                </div>
                <div className="flex items-center gap-2 pl-12 text-white bg-brand-indigo/10 border-l border-brand-indigo py-0.5 pr-2">
                  <FileText className="w-4 h-4 text-brand-indigo shrink-0" />
                  <span className="truncate">custom-helper/</span>
                </div>
                <div className="flex items-center gap-2 pl-16 text-slate-400">
                  <FileText className="w-4 h-4 text-slate-550 shrink-0" />
                  <span>SKILL.md</span>
                </div>
                <div className="flex items-center gap-2 pl-16 text-slate-400">
                  <Folder className="w-4 h-4 text-slate-550 shrink-0" />
                  <span>scripts/</span>
                </div>
              </div>
            </div>

            {/* Document Content Editor Mock */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-slate-550 uppercase text-[10px] tracking-wider font-semibold">SKILL.md - Generated Rules</div>
                <div className="text-[11px] text-brand-green bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-500/10 font-bold uppercase tracking-wider">Valid</div>
              </div>
              <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800/80 space-y-2.5 text-slate-350 select-none">
                <p className="text-brand-indigo font-semibold"># Custom Workspace Helper</p>
                <p className="text-slate-500">## Rules & Directives</p>
                <p>1. Always format responses in clean TSX.</p>
                <p>2. Keep state hooks atomic and use modular imports.</p>
                <p>3. Do not introduce raw styling utilities; rely on theme variables.</p>
                <p className="text-slate-500">## Verification Steps</p>
                <p>- Run `bun test` after each generated hook.</p>
              </div>
            </div>

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
        <div className="border-t border-slate-200/50 pt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
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
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200/50 text-center font-mono text-[11px] text-slate-400 mt-auto select-none">
        &copy; {new Date().getFullYear()} SkillStudio. Created for advanced agent custom behavior.
      </footer>
    </div>
  )
}
