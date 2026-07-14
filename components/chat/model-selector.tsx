import { ModelProvider } from '@/lib/models/providers'
import { Sparkles, BrainCircuit, Cpu } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface ModelSelectorProps {
  value: ModelProvider
  onChange: (value: ModelProvider) => void;
}

export const ModelSelector = ({ value, onChange }: ModelSelectorProps) => {
  const options = [
    {
      id: 'gemini' as ModelProvider,
      name: 'Gemini 2.0 Flash',
      description: 'Default dev model',
      icon: Sparkles,
      color: 'text-emerald-500 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'claude' as ModelProvider,
      name: 'Claude 3.5 Sonnet',
      description: 'Best for complex logic',
      icon: BrainCircuit,
      color: 'text-indigo-500 bg-indigo-50 border-indigo-200',
    },
    {
      id: 'gpt' as ModelProvider,
      name: 'GPT-4o Mini',
      description: 'Fast and cost-efficient',
      icon: Cpu,
      color: 'text-amber-500 bg-amber-50 border-amber-200',
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] text-brand-slate-light uppercase tracking-wider font-semibold select-none">
        Select AI Model Provider
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((opt) => {
          const Icon = opt.icon
          const isSelected = value === opt.id

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={twMerge(
                "flex items-center gap-3 p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-150",
                isSelected
                  ? "bg-brand-slate border-brand-slate text-white shadow-md ring-2 ring-brand-indigo/20"
                  : "bg-white border-slate-200 text-slate-800 hover:border-slate-350 hover:bg-slate-50/50"
              )}
            >
              <div className={twMerge(
                "p-2 rounded-lg shrink-0",
                isSelected ? "bg-white/10 text-white" : opt.color
              )}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-semibold text-[13px] leading-tight">
                  {opt.name}
                </div>
                <div className="font-sans text-[11px] text-slate-400 mt-0.5 leading-none">
                  {opt.description}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
