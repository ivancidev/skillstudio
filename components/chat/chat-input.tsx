import { ArrowUp } from 'lucide-react'
import { Button } from '../ui/button'
import * as React from 'react'

interface ChatInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean;
}

export const ChatInput = ({ input, handleInputChange, onSubmit, isLoading }: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const form = e.currentTarget.form
      if (form) {
        form.requestSubmit()
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="border-t border-slate-200/50 bg-white p-4">
      <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-brand-indigo/25 focus-within:border-brand-indigo/60 transition-all duration-150 pr-2">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Describe the skill you want to build..."
          rows={1}
          className="flex-1 resize-none bg-transparent py-3.5 px-4 text-[14px] text-slate-800 focus:outline-none placeholder-slate-450 min-h-[50px] max-h-[140px]"
        />
        <Button
          type="submit"
          variant="accent"
          disabled={isLoading || !input.trim()}
          className="p-2.5 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 disabled:bg-slate-200 disabled:text-slate-400"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
      <p className="font-mono text-[10px] text-slate-400 text-center mt-2 tracking-wide uppercase select-none">
        Press Enter to submit, Shift + Enter for multiline
      </p>
    </form>
  )
}
