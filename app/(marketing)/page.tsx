import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col px-6 md:px-12 lg:px-24">
      {/* Header */}
      <header className="flex items-center justify-between py-6 border-b border-slate-200/50">
        <Logo />
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button variant="secondary">View on GitHub</Button>
        </a>
      </header>

      {/* Main hero */}
      <main className="flex-1 flex flex-col justify-center max-w-4xl mx-auto text-center py-20">
        <h1 className="font-display font-bold text-[48px] md:text-[64px] tracking-tight leading-[1.1] mb-6">
          Build <span className="text-brand-indigo">skills</span>. Ship faster.
        </h1>
        <p className="font-sans text-[18px] md:text-[20px] text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Describe what you want. The agent asks questions, generates the files, and packages everything ready to install in Claude, Cursor, Windsurf and more.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/generate">
            <Button variant="accent" className="w-full sm:w-auto text-[16px] px-8 py-3">
              Start generating &rarr;
            </Button>
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button variant="secondary" className="w-full sm:w-auto text-[16px] px-8 py-3">
              View on GitHub
            </Button>
          </a>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-16">
          <div className="bg-white border border-slate-200/50 rounded-xl p-6 shadow-sm">
            <div className="font-mono text-brand-indigo text-[13px] uppercase tracking-wide mb-3">01 / Describe</div>
            <h3 className="font-display font-semibold text-[18px] mb-2">Outline your target behavior</h3>
            <p className="font-sans text-[14px] text-slate-500">
              Tell the agent what custom tool, workflow, design system, or rules you want your AI model to master.
            </p>
          </div>
          <div className="bg-white border border-slate-200/50 rounded-xl p-6 shadow-sm">
            <div className="font-mono text-brand-indigo text-[13px] uppercase tracking-wide mb-3">02 / Generate</div>
            <h3 className="font-display font-semibold text-[18px] mb-2">Collaborative refinement</h3>
            <p className="font-sans text-[14px] text-slate-500">
              The agent asks clarifying questions to perfect the instruction file, generate support scripts, and validate content.
            </p>
          </div>
          <div className="bg-white border border-slate-200/50 rounded-xl p-6 shadow-sm">
            <div className="font-mono text-brand-indigo text-[13px] uppercase tracking-wide mb-3">03 / Install</div>
            <h3 className="font-display font-semibold text-[18px] mb-2">Package & run</h3>
            <p className="font-sans text-[14px] text-slate-500">
              Download the .skill bundle containing SKILL.md and assets. Extract it directly into your project's agent path.
            </p>
          </div>
        </div>

        {/* Works with section */}
        <div className="border-t border-slate-200/50 pt-10">
          <div className="font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-4">Works with</div>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="font-mono text-[11px] bg-[#EEF2FF] text-[#4338CA] px-3.5 py-1.5 rounded-full uppercase">Claude</span>
            <span className="font-mono text-[11px] bg-[#EEF2FF] text-[#4338CA] px-3.5 py-1.5 rounded-full uppercase">Cursor</span>
            <span className="font-mono text-[11px] bg-[#EEF2FF] text-[#4338CA] px-3.5 py-1.5 rounded-full uppercase">Windsurf</span>
            <span className="font-mono text-[11px] bg-[#EEF2FF] text-[#4338CA] px-3.5 py-1.5 rounded-full uppercase">GPT Models</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200/50 text-center font-mono text-[11px] text-slate-400 mt-auto">
        &copy; {new Date().getFullYear()} SkillStudio. Built for developers.
      </footer>
    </div>
  )
}
