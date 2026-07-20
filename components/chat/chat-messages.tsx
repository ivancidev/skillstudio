export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system' | 'data' | string
  content: string
  toolInvocations?: {
    toolCallId: string
    toolName: string
    state: 'call' | 'result'
    args: unknown
    result?: unknown
  }[]
}
import { LogoMark } from '../ui/logo'
import { User, CheckCircle2, Loader2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

const TEMPLATES = [
  {
    title: 'Postgres & Supabase Guide',
    description: 'Optimize DB connections, migrations, and schema definitions.',
    prompt: 'I want to build a skill for writing optimal Postgres schemas and Supabase connection methods. Enforce using typescript types generated from the database schema and explicit error handling on queries.',
  },
  {
    title: 'Tailwind Token Enforcer',
    description: 'Enforce custom layout tokens, spacing grids, and text colors.',
    prompt: 'Generate a styling helper skill for Tailwind CSS. Enforce using a strict 8px spacing grid, off-white #F8FAFC canvas background, and accessible contrast ratios (WCAG AA).',
  },
  {
    title: 'Git Conventional Commits',
    description: 'Standardize commit formats and validate files via git hooks.',
    prompt: 'Help me build a skill that enforces semantic conventional commit messages. Include a git pre-commit script to run code linting and reject dirty files.',
  },
  {
    title: 'Bun Unit Testing Assistant',
    description: 'Standardize testing files, mock configurations, and coverage checks.',
    prompt: 'I want a skill to help generate unit tests using Bun test runner. Set rules for testing hooks, mocking API responses, and checking test coverage targets.',
  }
]

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
  onSelectTemplate?: (prompt: string) => void
}

export const ChatMessages = ({ messages, isLoading, onSelectTemplate }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto py-8">
          <LogoMark />
          <h2 className="font-display font-bold text-[20px] tracking-[-0.02em] mt-4 mb-2 text-slate-800">
            Generate custom AI skills
          </h2>
          <p className="font-sans text-[14.5px] text-slate-500 leading-relaxed max-w-md mb-8">
            Tell me what behavior, design system, or rules you want your assistant to learn. I will guide you, ask clarifying questions, and package your skill file.
          </p>

          {onSelectTemplate && (
            <div className="w-full space-y-3">
              <div className="font-mono text-[10px] text-slate-450 uppercase tracking-wider font-semibold select-none">
                Quick-Start Templates
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.title}
                    onClick={() => onSelectTemplate(tpl.prompt)}
                    className="p-3.5 bg-white border border-slate-200/50 hover:border-brand-indigo/35 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <span className="font-display font-semibold text-[13px] text-slate-850 group-hover:text-brand-indigo transition-colors mb-1">
                      {tpl.title}
                    </span>
                    <span className="text-[11px] text-slate-500 leading-normal font-sans">
                      {tpl.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {messages.map((message) => {
        const isUser = message.role === 'user'
        
        return (
          <div
            key={message.id}
            className={twMerge(
              "flex gap-4 max-w-2xl animate-in fade-in duration-200",
              isUser ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            {/* Avatar */}
            <div className="shrink-0 select-none">
              {isUser ? (
                <div className="w-9 h-9 bg-slate-200 text-slate-650 rounded-lg flex items-center justify-center font-display font-bold">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
              ) : (
                <LogoMark />
              )}
            </div>

            {/* Bubble contents */}
            <div className="space-y-2 flex-1">
              {message.content && (
                <div
                  className={twMerge(
                    "rounded-xl px-4 py-3 text-[14.5px] leading-relaxed shadow-sm",
                    isUser
                      ? "bg-slate-100 text-slate-800"
                      : "bg-white border border-slate-200/50 text-slate-850"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              )}

              {/* Tool Invocations tracking */}
              {message.toolInvocations && message.toolInvocations.map((tool) => {
                const { toolCallId, toolName, state } = tool
                const isCall = state === 'call'
                
                return (
                  <div
                    key={toolCallId}
                    className="flex items-center gap-2.5 bg-white border border-slate-200/50 rounded-lg px-3.5 py-2.5 font-mono text-[11px] text-slate-600 shadow-sm"
                  >
                    {isCall ? (
                      <Loader2 className="w-3.5 h-3.5 text-brand-indigo animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                    )}

                    <div className="flex-1">
                      {toolName === 'askQuestion' && (
                        <span>Thinking of follow-up questions...</span>
                      )}
                      {toolName === 'generateSkillMd' && (
                        <span>
                          {isCall ? 'Creating SKILL.md structure...' : 'SKILL.md draft created'}
                        </span>
                      )}
                      {toolName === 'generateScript' && (
                        <span>
                          {isCall 
                            ? `Generating helper script: ${(tool.args as { path?: string })?.path || 'file'}...` 
                            : `Created script file: ${(tool.args as { path?: string })?.path || 'file'}`}
                        </span>
                      )}
                      {toolName === 'validateSkill' && (
                        <span>
                          {isCall 
                            ? 'Running validation tests...' 
                            : (tool.result as { isValid?: boolean })?.isValid 
                              ? 'Skill validation passed cleanly' 
                              : 'Skill validation completed with feedback'}
                        </span>
                      )}
                      {toolName === 'packageSkill' && (
                        <span>
                          {isCall ? 'Compiling zip files...' : 'Ready to package skill'}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {isLoading && (
        <div className="flex gap-4 max-w-2xl mr-auto animate-in fade-in duration-200">
          <div className="shrink-0 select-none">
            <LogoMark />
          </div>
          <div className="bg-white border border-slate-200/50 rounded-xl px-4 py-3 shadow-sm flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-brand-indigo animate-spin" />
          </div>
        </div>
      )}
    </div>
  )
}
