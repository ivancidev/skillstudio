'use client'

/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect */

import { useState, useEffect, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import { ModelSelector } from './model-selector'
import { ChatMessages } from './chat-messages'
import { ChatInput } from './chat-input'
import { SkillPreview } from './skill-preview'
import { ModelProvider } from '@/lib/models/providers'
import { Eye, EyeOff, ShieldCheck, Trash2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export const ChatInterface = () => {
  const searchParams = useSearchParams()
  const initialPrompt = searchParams.get('prompt') || ''

  const [provider, setProvider] = useState<ModelProvider>('gemini')
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [input, setInput] = useState('')

  // Initialize useChat with provider config
  const { messages, sendMessage, status } = useChat({
    api: '/api/chat',
    body: {
      provider,
      modelName: provider === 'gemini' 
        ? 'gemini-2.0-flash' 
        : provider === 'claude' 
          ? 'claude-3-5-sonnet-20241022' 
          : 'gpt-4o-mini',
    },
    headers: () => ({
      'x-api-key': localStorage.getItem(`ss_api_key_${provider}`) || '',
    }),
  } as any) as any

  const isLoading = status === 'submitted' || status === 'streaming'

  // Load API key from local storage when provider changes
  useEffect(() => {
    const savedKey = localStorage.getItem(`ss_api_key_${provider}`) || ''
    setApiKey(savedKey)
  }, [provider])

  // Populate prompt from URL search parameters if available
  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt)
    }
  }, [initialPrompt])

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setApiKey(val)
    localStorage.setItem(`ss_api_key_${provider}`, val)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    sendMessage({
      role: 'user',
      content: input,
    })
    setInput('')
  }

  // Parse conversation to extract skills and documents
  const { skillName, skillSlug, skillPlatform, skillMd, extraFiles, isReadyToPackage } = useMemo(() => {
    let name = ''
    let slug = ''
    let platform: 'claude' | 'cursor' | 'windsurf' | 'gpt' | 'all' = 'all'
    let md = ''
    const files: { path: string; content: string }[] = []
    let ready = false

    messages.forEach((message: any) => {
      if (message.toolInvocations) {
        message.toolInvocations.forEach((tool: any) => {
          const { toolName, args } = tool
          
          if (toolName === 'generateSkillMd') {
            const { name: argName, slug: argSlug, platform: argPlatform, content: argContent } = args as any
            if (argName) name = argName
            if (argSlug) slug = argSlug
            if (argPlatform) platform = argPlatform
            if (argContent) md = argContent
          }
          
          if (toolName === 'generateScript') {
            const { path: argPath, content: argContent } = args as any
            if (argPath && argContent) {
              const idx = files.findIndex(f => f.path === argPath)
              if (idx >= 0) {
                files[idx].content = argContent
              } else {
                files.push({ path: argPath, content: argContent })
              }
            }
          }
          
          if (toolName === 'packageSkill') {
            const { ready: argReady } = args as any
            if (argReady) {
              ready = true
            }
          }
        })
      }
    })

    return {
      skillName: name,
      skillSlug: slug,
      skillPlatform: platform,
      skillMd: md,
      extraFiles: files,
      isReadyToPackage: ready
    }
  }, [messages])

  // Auto-save generated skill into local list when packaged successfully
  useEffect(() => {
    if (isReadyToPackage && skillName && skillMd) {
      const saved = localStorage.getItem('ss_skills')
      let list: any[] = []
      if (saved) {
        try {
          list = JSON.parse(saved)
        } catch (e) {
          console.error('Failed to parse saved skills index:', e)
        }
      }
      
      const newSlug = skillSlug || skillName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
      const newSkill = {
        id: newSlug,
        name: skillName,
        slug: newSlug,
        platform: skillPlatform,
        skillMd: skillMd,
        files: extraFiles,
        isComplete: true,
        createdAt: new Date().toISOString()
      }
      
      const idx = list.findIndex(s => s.slug === newSlug)
      if (idx >= 0) {
        list[idx] = newSkill
      } else {
        list.push(newSkill)
      }
      localStorage.setItem('ss_skills', JSON.stringify(list))
    }
  }, [isReadyToPackage, skillName, skillSlug, skillPlatform, skillMd, extraFiles])

  const handleDownload = async () => {
    if (!skillName || !skillMd) return

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skillName,
          skillMd,
          files: extraFiles,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate export file from server.')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${skillSlug || 'custom'}.skill.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading skill:', error)
      alert('Failed to package and download skill. Please try again.')
    }
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-4rem)] lg:h-screen overflow-hidden">
      
      {/* Left Chat Area (60% width) */}
      <div className="flex-1 lg:w-3/5 flex flex-col bg-slate-50 border-r border-slate-200/50">
        
        {/* Top Control Bar */}
        <div className="p-6 bg-white border-b border-slate-200/50 space-y-4">
          <ModelSelector value={provider} onChange={setProvider} />
          
          {/* API Key Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[11px] text-brand-slate-light uppercase tracking-wider font-semibold select-none">
                API Key Config
              </label>
              {/* Connection Status Badge */}
              {apiKey ? (
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                  <span className="font-mono text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">Connected (Local)</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-indigo-50 border border-brand-indigo/20 px-2 py-0.5 rounded-full select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo" />
                  <span className="font-mono text-[10px] text-brand-indigo font-semibold uppercase tracking-wider">Server Fallback / Demo</span>
                </div>
              )}
            </div>
            <div className="relative flex items-center">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={handleKeyChange}
                placeholder={`Paste your ${provider.toUpperCase()} API key - stored locally only`}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-indigo/20 focus:border-brand-indigo/60 transition pr-20 font-mono"
              />
              <div className="absolute right-2 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-md cursor-pointer transition-colors"
                  title={showKey ? "Hide key" : "Show key"}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {apiKey && (
                  <button
                    type="button"
                    onClick={() => {
                      setApiKey('')
                      localStorage.removeItem(`ss_api_key_${provider}`)
                    }}
                    className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer transition-colors"
                    title="Clear key from local storage"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1 select-none font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-indigo" />
              Keys never touch our database and are processed strictly in-memory.
            </div>
          </div>
        </div>

        {/* Messaging Container */}
        <ChatMessages 
          messages={messages} 
          isLoading={isLoading} 
          onSelectTemplate={(prompt) => {
            sendMessage({
              role: 'user',
              content: prompt,
            })
          }}
        />

        {/* Text Area Input */}
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>

      {/* Right Preview Panel (40% width) */}
      <div className="w-full lg:w-2/5 p-6 bg-slate-50 overflow-y-auto h-full lg:h-screen">
        <SkillPreview
          skillName={skillName}
          skillMd={skillMd}
          files={extraFiles}
          platform={skillPlatform}
          isReady={isReadyToPackage}
          onDownload={handleDownload}
        />
      </div>

    </div>
  )
}
