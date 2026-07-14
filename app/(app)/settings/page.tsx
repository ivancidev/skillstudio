'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Key, Trash2, CheckCircle2, Shield } from 'lucide-react'

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState('')
  const [claudeKey, setClaudeKey] = useState('')
  const [gptKey, setGptKey] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    setGeminiKey(localStorage.getItem('ss_api_key_gemini') || '')
    setClaudeKey(localStorage.getItem('ss_api_key_claude') || '')
    setGptKey(localStorage.getItem('ss_api_key_gpt') || '')
  }, [])

  const handleSave = () => {
    localStorage.setItem('ss_api_key_gemini', geminiKey)
    localStorage.setItem('ss_api_key_claude', claudeKey)
    localStorage.setItem('ss_api_key_gpt', gptKey)
    setStatus('Keys saved successfully!')
    setTimeout(() => setStatus(''), 3000)
  }

  const handleClear = () => {
    localStorage.removeItem('ss_api_key_gemini')
    localStorage.removeItem('ss_api_key_claude')
    localStorage.removeItem('ss_api_key_gpt')
    setGeminiKey('')
    setClaudeKey('')
    setGptKey('')
    setStatus('All keys cleared!')
    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <div className="flex-1 p-6 md:p-10 max-w-2xl mx-auto w-full">
      <div className="mb-10 pb-6 border-b border-slate-200/50 select-none">
        <h1 className="font-display font-semibold text-[22px] text-brand-slate leading-tight flex items-center gap-2">
          <Key className="w-5 h-5 text-brand-indigo" />
          Settings & Keys
        </h1>
        <p className="font-sans text-[14px] text-slate-500 mt-1">
          Manage your AI model API keys and preferences.
        </p>
      </div>

      <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-start gap-3 bg-indigo-50/20 border border-brand-indigo/15 p-4 rounded-xl select-none">
          <Shield className="w-5 h-5 text-brand-indigo shrink-0 mt-0.5" />
          <p className="font-sans text-[13px] text-slate-600 leading-relaxed">
            API keys are kept strictly in your local browser sandbox and sent via headers to the direct streaming endpoint. They are never written to any database.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-slate-500 uppercase tracking-wide select-none">Gemini API Key</label>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="Enter Gemini API key"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-indigo/20 font-mono"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-slate-500 uppercase tracking-wide select-none">Claude API Key</label>
            <input
              type="password"
              value={claudeKey}
              onChange={(e) => setClaudeKey(e.target.value)}
              placeholder="Enter Claude API key"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-indigo/20 font-mono"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-slate-500 uppercase tracking-wide select-none">GPT / OpenAI API Key</label>
            <input
              type="password"
              value={gptKey}
              onChange={(e) => setGptKey(e.target.value)}
              placeholder="Enter OpenAI API key"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-indigo/20 font-mono"
            />
          </div>
        </div>

        {status && (
          <div className="flex items-center gap-2 text-brand-green font-mono text-[12px] bg-emerald-50 border border-emerald-250/30 p-3 rounded-lg animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-brand-green" />
            {status}
          </div>
        )}

        <div className="flex gap-4 border-t border-slate-100 pt-6">
          <Button variant="accent" onClick={handleSave} className="flex-1">
            Save Keys
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleClear} 
            className="flex items-center gap-2 text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700"
          >
            <Trash2 className="w-4 h-4" />
            Clear Keys
          </Button>
        </div>
      </div>
    </div>
  )
}
