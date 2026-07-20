import { Button } from '../ui/button'
import { Download, RefreshCw, FileCode, Calendar, Code2 } from 'lucide-react'

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
  const lineCount = skill.skillMd ? skill.skillMd.split('\n').length : 0
  const formattedDate = skill.createdAt 
    ? new Date(skill.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Local Draft'

  return (
    <div className="bg-brand-slate text-[#F8FAFC] rounded-[14px] p-6 skill-card-grid relative overflow-hidden flex flex-col justify-between min-h-[240px] shadow-lg border border-slate-800/80 transition-all duration-300 hover:border-brand-indigo/50 hover:shadow-brand-indigo/5 hover:shadow-xl group">
      
      {/* Top Details */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="font-mono text-[11px] text-brand-indigo font-bold uppercase tracking-[0.08em] select-none">
            {skill.platform}
          </span>
          {skill.isComplete && (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              <span className="font-mono text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Ready</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-[18px] text-[#F8FAFC] mb-3 tracking-[-0.01em] leading-snug group-hover:text-white transition-colors">
          {skill.name}
        </h3>

        {/* Files Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="font-mono text-[11px] text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 select-none">
            <FileCode className="w-3 h-3 text-brand-indigo" />
            SKILL.md
          </span>
          {skill.files.map((file) => {
            const fileName = file.path.split('/').pop() || file.path
            return (
              <span key={file.path} className="font-mono text-[11px] text-slate-450 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 select-none">
                <FileCode className="w-3 h-3 text-slate-500" />
                {fileName}
              </span>
            )
          })}
        </div>
      </div>

      {/* Meta Indicators */}
      <div className="flex items-center gap-4 text-slate-400 text-[11px] font-mono border-t border-slate-850 pt-3.5 mb-4">
        <div className="flex items-center gap-1" title="Lines of instructions">
          <Code2 className="w-3.5 h-3.5 text-slate-500" />
          <span>{lineCount} lines</span>
        </div>
        <div className="flex items-center gap-1" title="Date generated">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center gap-3 mt-auto">
        <Button
          variant="secondary"
          onClick={() => onDownload(skill)}
          className="flex-1 text-[12px] py-2 px-3 border-slate-700/80 text-slate-350 hover:bg-slate-800 hover:text-white flex items-center justify-center gap-2 hover:border-slate-600 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          Download .zip
        </Button>
        <Button
          variant="ghost"
          onClick={() => onRegenerate(skill)}
          className="p-2 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
          title="Regenerate skill"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </Button>
      </div>

    </div>
  )
}
