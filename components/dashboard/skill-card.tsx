import { Button } from '../ui/button'
import { Download, RefreshCw, FileCode } from 'lucide-react'

export interface Skill {
  id: string
  name: string
  slug: string
  platform: 'claude' | 'cursor' | 'windsurf' | 'gpt' | 'all'
  files: { path: string; content: string }[]
  skillMd: string
  isComplete: boolean
  createdAt?: string
}

interface SkillCardProps {
  skill: Skill
  onDownload: (skill: Skill) => void
  onRegenerate: (skill: Skill) => void
}

export const SkillCard = ({ skill, onDownload, onRegenerate }: SkillCardProps) => {
  return (
    <div className="bg-brand-slate text-[#F8FAFC] rounded-[14px] p-6 skill-card-grid relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-lg border border-slate-800/80 transition-all duration-200 hover:border-brand-indigo/40 group">
      
      {/* Top Details */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="font-mono text-[11px] text-brand-indigo font-bold uppercase tracking-[0.08em] select-none">
            {skill.platform}
          </span>
          {skill.isComplete && (
            <div className="flex items-center gap-1.5 bg-emerald-950/30 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              <span className="font-mono text-[10px] text-emerald-400 font-medium uppercase tracking-wider">Ready</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-[18px] text-[#F8FAFC] mb-4 tracking-tight leading-snug">
          {skill.name}
        </h3>

        {/* Files */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="font-mono text-[12px] text-brand-slate-light bg-brand-indigo/12 border border-brand-indigo/30 px-2.5 py-1 rounded-md flex items-center gap-1.5 select-none">
            <FileCode className="w-3.5 h-3.5 text-brand-indigo" />
            SKILL.md
          </span>
          {skill.files.map((file) => {
            const fileName = file.path.split('/').pop() || file.path
            return (
              <span key={file.path} className="font-mono text-[12px] text-brand-slate-light bg-brand-indigo/12 border border-brand-indigo/30 px-2.5 py-1 rounded-md flex items-center gap-1.5 select-none">
                <FileCode className="w-3.5 h-3.5 text-brand-indigo" />
                {fileName}
              </span>
            )
          })}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center gap-3 border-t border-slate-800/60 pt-4 mt-auto">
        <Button
          variant="secondary"
          onClick={() => onDownload(skill)}
          className="flex-1 text-[13px] py-2 px-3 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center justify-center gap-2 hover:border-slate-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button
          variant="ghost"
          onClick={() => onRegenerate(skill)}
          className="p-2 border border-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg flex items-center justify-center transition-colors"
          title="Regenerate"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

    </div>
  )
}
