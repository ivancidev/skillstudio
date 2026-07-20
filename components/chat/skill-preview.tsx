import { useState } from 'react'
import { Button } from '../ui/button'
import { FileText, Files, Info, Download, Copy, Check, X } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface SkillPreviewProps {
  skillName: string
  skillMd: string
  files: { path: string; content: string }[]
  platform: 'claude' | 'cursor' | 'windsurf' | 'gpt' | 'all'
  isReady: boolean
  onDownload: () => void;
}

export const SkillPreview = ({
  skillName,
  skillMd,
  files,
  platform,
  isReady,
  onDownload,
}: SkillPreviewProps) => {
  const [activeTab, setActiveTab] = useState<'markdown' | 'files' | 'install'>('markdown')
  const [copied, setCopied] = useState(false)
  const [selectedFile, setSelectedFile] = useState<{ path: string; content: string } | null>(null)
  const [copiedFile, setCopiedFile] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(skillMd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getInstallInstructions = () => {
    switch (platform) {
      case 'cursor':
        return (
          <div className="space-y-4 font-sans text-[14px]">
            <p className="font-semibold text-slate-800">To install this skill in Cursor:</p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-600">
              <li>Ensure you have a <code className="font-mono text-[12px] bg-slate-100 px-1 py-0.5 rounded">.cursor/rules</code> folder at the root of your project.</li>
              <li>Extract the downloaded zip archive.</li>
              <li>Copy the extracted directory (containing <code className="font-mono text-[12px] bg-slate-100 px-1 py-0.5 rounded">SKILL.md</code>) directly into <code className="font-mono text-[12px] bg-slate-100 px-1 py-0.5 rounded">.cursor/rules/</code>.</li>
              <li>Cursor will read the skill parameters and apply them during inline chat and edits automatically.</li>
            </ol>
          </div>
        )
      case 'claude':
        return (
          <div className="space-y-4 font-sans text-[14px]">
            <p className="font-semibold text-slate-800">To install this skill in Claude Code or Claude.ai:</p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-600">
              <li><strong>Claude Code (CLI)</strong>: Extract and place the skill directory inside <code className="font-mono text-[12px] bg-slate-100 px-1 py-0.5 rounded">.claude/rules/</code> in your project folder.</li>
              <li><strong>Claude.ai Projects</strong>: Create a Project, open the Custom Instructions pane, and copy/paste the entire markdown of the <code className="font-mono text-[12px] bg-slate-100 px-1 py-0.5 rounded">SKILL.md</code> file.</li>
            </ol>
          </div>
        )
      case 'windsurf':
        return (
          <div className="space-y-4 font-sans text-[14px]">
            <p className="font-semibold text-slate-800">To install this skill in Windsurf:</p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-600">
              <li>Make sure you have a <code className="font-mono text-[12px] bg-slate-100 px-1 py-0.5 rounded">.windsurf/rules</code> directory at your project root.</li>
              <li>Extract the download and place the skill bundle directly inside <code className="font-mono text-[12px] bg-slate-100 px-1 py-0.5 rounded">.windsurf/rules/</code>.</li>
              <li>The Cascade AI agent will load the instructions on your next chat query.</li>
            </ol>
          </div>
        )
      case 'gpt':
        return (
          <div className="space-y-4 font-sans text-[14px]">
            <p className="font-semibold text-slate-800">To configure a Custom GPT or ChatGPT Project:</p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-600">
              <li>Navigate to the GPT configure view or Project Custom Instructions interface.</li>
              <li>Paste the full contents of the generated <code className="font-mono text-[12px] bg-slate-100 px-1 py-0.5 rounded">SKILL.md</code> into the Instructions text box.</li>
              <li>Upload any generated scripts or reference templates directly to the files/knowledge section.</li>
            </ol>
          </div>
        )
      default:
        return (
          <div className="space-y-4 font-sans text-[14px]">
            <p className="font-semibold text-slate-800">General Setup Guide:</p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-600">
              <li>Extract the downloaded <code className="font-mono text-[12px] bg-slate-100 px-1 py-0.5 rounded">.skill.zip</code> folder.</li>
              <li>Identify where your developer AI assistant reads local directives (e.g. <code className="font-mono text-[12px] bg-slate-100 px-1 py-0.5 rounded">.cursor/rules/</code> or <code className="font-mono text-[12px] bg-slate-100 px-1 py-0.5 rounded">.claude/rules/</code>).</li>
              <li>Move the skill folder there to activate the custom rules.</li>
            </ol>
          </div>
        )
    }
  }

  return (
    <div className="h-full flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm min-h-[450px]">
      {/* Title */}
      <div className="p-4 border-b border-slate-200/50 bg-slate-50 flex items-center justify-between select-none">
        <span className="font-mono text-[11px] text-brand-slate-light uppercase tracking-wider font-semibold">
          {skillName ? `Skill Preview — ${skillName}` : 'Skill Preview'}
        </span>
        {isReady && (
          <span className="font-mono text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
            Ready
          </span>
        )}
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-slate-200/50 select-none">
        <button
          onClick={() => setActiveTab('markdown')}
          className={twMerge(
            "flex-1 py-3 px-4 text-[13px] font-display font-medium border-b-2 flex items-center justify-center gap-2 transition-colors cursor-pointer",
            activeTab === 'markdown'
              ? "border-brand-indigo text-brand-indigo bg-indigo-50/10 font-semibold"
              : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          )}
        >
          <FileText className="w-4 h-4" />
          SKILL.md
        </button>
        <button
          onClick={() => setActiveTab('files')}
          className={twMerge(
            "flex-1 py-3 px-4 text-[13px] font-display font-medium border-b-2 flex items-center justify-center gap-2 transition-colors cursor-pointer",
            activeTab === 'files'
              ? "border-brand-indigo text-brand-indigo bg-indigo-50/10 font-semibold"
              : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          )}
        >
          <Files className="w-4 h-4" />
          Files ({files.length + 1})
        </button>
        <button
          onClick={() => setActiveTab('install')}
          className={twMerge(
            "flex-1 py-3 px-4 text-[13px] font-display font-medium border-b-2 flex items-center justify-center gap-2 transition-colors cursor-pointer",
            activeTab === 'install'
              ? "border-brand-indigo text-brand-indigo bg-indigo-50/10 font-semibold"
              : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          )}
        >
          <Info className="w-4 h-4" />
          Install
        </button>
      </div>

      {/* Contents Area */}
      <div className="flex-1 overflow-y-auto p-5 relative min-h-[300px]">
        {activeTab === 'markdown' && (
          <div className="h-full flex flex-col">
            {skillMd ? (
              <div className="relative flex-1 bg-brand-slate rounded-xl overflow-hidden border border-slate-800 flex flex-col">
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                    title="Copy Markdown"
                  >
                    {copied ? <Check className="w-4 h-4 text-brand-green" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <pre className="p-5 font-mono text-[12px] text-slate-200 overflow-auto whitespace-pre flex-1 max-h-[380px] leading-relaxed">
                  <code>{skillMd}</code>
                </pre>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 font-mono text-[12px] py-16">
                No skill markdown generated yet. Let&apos;s describe what you need to start.
              </div>
            )}
          </div>
        )}

        {activeTab === 'files' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div 
                onClick={() => setSelectedFile({ path: 'SKILL.md', content: skillMd })}
                className={twMerge(
                  "font-mono text-[12px] p-3 border rounded-lg flex items-center justify-between transition-all cursor-pointer select-none",
                  selectedFile?.path === 'SKILL.md'
                    ? "border-brand-indigo bg-brand-indigo/5 text-brand-indigo"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700 bg-white"
                )}
              >
                <span className="font-semibold">SKILL.md</span>
                <span className="text-[10px] opacity-70 uppercase">Base Instruction Document</span>
              </div>
              {files.map((file) => (
                <div 
                  key={file.path} 
                  onClick={() => setSelectedFile(file)}
                  className={twMerge(
                    "font-mono text-[12px] p-3 border rounded-lg flex items-center justify-between transition-all cursor-pointer select-none",
                    selectedFile?.path === file.path
                      ? "border-brand-indigo bg-brand-indigo/5 text-brand-indigo"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700 bg-white"
                  )}
                >
                  <span className="font-semibold">{file.path}</span>
                  <span className="text-[10px] opacity-70 uppercase">
                    {file.path.endsWith('.sh') ? 'Shell Script' : file.path.endsWith('.py') ? 'Python Script' : 'Template/Config'}
                  </span>
                </div>
              ))}
              {files.length === 0 && (
                <div className="text-center font-mono text-[11px] text-slate-400 py-6">
                  This skill only includes the main SKILL.md file. No extra scripts are configured.
                </div>
              )}
            </div>

            {/* In-tab Code Inspector */}
            {selectedFile && selectedFile.content && (
              <div className="border border-slate-800 bg-brand-slate rounded-xl p-4 relative overflow-hidden flex flex-col animate-in slide-in-from-bottom-2 duration-150">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3 select-none">
                  <span className="font-mono text-[11px] text-slate-400 truncate font-semibold">{selectedFile.path}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedFile.content)
                        setCopiedFile(true)
                        setTimeout(() => setCopiedFile(false), 2000)
                      }}
                      className="p-1 text-slate-450 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Copy code"
                    >
                      {copiedFile ? <Check className="w-3.5 h-3.5 text-brand-green" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="p-1 text-slate-450 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Close code inspector"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <pre className="font-mono text-[11.5px] text-slate-200 overflow-auto max-h-[220px] whitespace-pre leading-relaxed p-1.5 bg-slate-950/20 rounded">
                  <code>{selectedFile.content}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'install' && (
          <div className="p-1">
            {getInstallInstructions()}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col select-none">
        <Button
          variant="accent"
          disabled={!isReady}
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-2 py-3 disabled:bg-slate-200 disabled:text-slate-400"
        >
          <Download className="w-5 h-5" />
          Download .skill package
        </Button>
      </div>
    </div>
  )
}
