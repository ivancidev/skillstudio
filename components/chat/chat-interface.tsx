'use client'

import { useState, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { ModelSelector } from './model-selector'
import { ChatMessages } from './chat-messages'
import { ChatInput } from './chat-input'
import { SkillPreview } from './skill-preview'
import { ModelProvider } from '@/lib/models/providers'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
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
  let skillName = ''
  let skillSlug = ''
  let skillPlatform: any = 'all'
  let skillMd = ''
  const extraFiles: { path: string; content: string }[] = []
  let isReadyToPackage = false

  messages.forEach((message: any) => {
    if (message.toolInvocations) {
      message.toolInvocations.forEach((tool: any) => {
        const { toolName, args } = tool
        
        if (toolName === 'generateSkillMd') {
          const { name, slug, platform, content } = args as any
          if (name) skillName = name
          if (slug) skillSlug = slug
          if (platform) skillPlatform = platform
          if (content) skillMd = content
        }
        
        if (toolName === 'generateScript') {
          const { path, content } = args as any
          if (path && content) {
            const idx = extraFiles.findIndex(f => f.path === path)
            if (idx >= 0) {
              extraFiles[idx].content = content
            } else {
              extraFiles.push({ path, content })
            }
          }
        }
        
        if (toolName === 'packageSkill') {
          const { ready } = args as any
          if (ready) {
            isReadyToPackage = true
          }
        }
      })
    }
  })

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
      <div className="flex-1 lg:w-3/5 flex flex-col bg-brand-bg border-r border-slate-200/50">
        
        {/* Top Control Bar */}
        <div className="p-6 bg-white border-b border-slate-200/50 space-y-4">
          <ModelSelector value={provider} onChange={setProvider} />
          
          {/* API Key Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-brand-slate-light uppercase tracking-wider font-semibold select-none">
              API Key Config
            </label>
            <div className="relative flex items-center">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={handleKeyChange}
                placeholder={`Paste your ${provider.toUpperCase()} API key — stored locally only`}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-indigo/20 focus:border-brand-indigo/60 transition pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 text-slate-400 hover:text-slate-650 cursor-pointer"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1 select-none font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-indigo" />
              Keys never touch our database and are sent directly to the LLM endpoint.
            </div>
          </div>
        </div>

        {/* Messaging Container */}
        <ChatMessages messages={messages} isLoading={isLoading} />

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
