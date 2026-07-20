'use client'

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from 'react'
import { SkillGrid } from '@/components/dashboard/skill-grid'
import { Skill } from '@/components/dashboard/skill-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, LayoutGrid, Search, Shield, ArrowUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const MOCK_SKILLS: Skill[] = [
  {
    id: 'mock-1',
    name: 'Tailwind CSS Refinement Agent',
    slug: 'tailwind-refinement',
    platform: 'cursor',
    skillMd: '# Tailwind CSS Refinement Agent\n\nTeaches the model how to optimize and refactor Tailwind CSS classes.',
    files: [
      { path: 'scripts/cleanup-unused.js', content: '// script to clean unused classes' }
    ],
    isComplete: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'mock-2',
    name: 'Instagram Carousel Creator',
    slug: 'carousel-instagram',
    platform: 'claude',
    skillMd: '# Instagram Carousel Creator\n\nInstructions to generate Instagram carousels in standard formats.',
    files: [
      { path: 'assets/template.html', content: '<!-- HTML slide template -->' }
    ],
    isComplete: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 5).toISOString(), // 5 days ago
  },
  {
    id: 'mock-3',
    name: 'Supabase Server Actions Hook Generator',
    slug: 'supabase-hooks',
    platform: 'windsurf',
    skillMd: '# Supabase Hook Generator\n\nInstructions to generate standard React hooks for Supabase Server Actions.',
    files: [
      { path: 'scripts/codegen.ts', content: '// Code generation script' }
    ],
    isComplete: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 8).toISOString(), // 8 days ago
  }
]

export default function DashboardPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [platformFilter, setPlatformFilter] = useState<'all' | 'cursor' | 'claude' | 'windsurf' | 'gpt'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest')
  const [keysCount, setKeysCount] = useState(0)
  
  const router = useRouter()

  useEffect(() => {
    // Load skills from localStorage, fallback to MOCK_SKILLS if none exist
    const savedSkills = localStorage.getItem('ss_skills')
    if (savedSkills) {
      try {
        setSkills(JSON.parse(savedSkills))
      } catch (e) {
        console.error('Failed to parse saved skills:', e)
        setSkills(MOCK_SKILLS)
      }
    } else {
      setSkills(MOCK_SKILLS)
      localStorage.setItem('ss_skills', JSON.stringify(MOCK_SKILLS))
    }

    // Load active API keys count
    let count = 0
    if (localStorage.getItem('ss_api_key_gemini')) count++
    if (localStorage.getItem('ss_api_key_claude')) count++
    if (localStorage.getItem('ss_api_key_gpt')) count++
    setKeysCount(count)
  }, [])

  const handleDownload = async (skill: Skill) => {
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skillName: skill.name,
          skillMd: skill.skillMd,
          files: skill.files,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate export file from server.')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${skill.slug}.skill.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading skill:', error)
      alert('Failed to package and download skill. Please try again.')
    }
  }

  const handleRegenerate = (skill: Skill) => {
    // Redirect to generate screen with preloaded prompt query parameter
    router.push(`/generate?prompt=${encodeURIComponent(`Regenerate ${skill.name} skill for ${skill.platform}`)}`)
  }

  // Calculate Metrics
  const cursorCount = skills.filter((s) => s.platform === 'cursor').length
  const claudeCount = skills.filter((s) => s.platform === 'claude').length
  const windsurfCount = skills.filter((s) => s.platform === 'windsurf').length
  const gptCount = skills.filter((s) => s.platform === 'gpt').length
  const activePlatformsCount = [cursorCount, claudeCount, windsurfCount, gptCount].filter((c) => c > 0).length

  // Filter & Sort
  const filteredAndSortedSkills = skills
    .filter((skill) => {
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            skill.platform.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPlatform = platformFilter === 'all' || skill.platform === platformFilter
      return matchesSearch && matchesPlatform
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB
    })

  return (
    <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/50">
        <div>
          <h1 className="font-display font-bold text-[22px] text-brand-slate tracking-[-0.02em] leading-tight flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-brand-indigo" />
            Your skills
          </h1>
          <p className="font-mono text-[11px] text-brand-slate-light mt-1">
            MANAGE CUSTOM AI AGENT INSTRUCTION PACKAGES
          </p>
        </div>

        <Link href="/generate">
          <Button variant="accent" className="flex items-center gap-2 shadow-sm shadow-brand-indigo/10 cursor-pointer">
            <Plus className="w-4 h-4" />
            Generate skill
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200/50 rounded-xl p-5 shadow-sm">
          <span className="font-mono text-[10px] text-brand-slate-light uppercase tracking-wider font-bold block select-none">
            Total Skills Stored
          </span>
          <div className="text-3xl font-display font-bold mt-1.5 text-brand-slate">
            {skills.length}
          </div>
          <p className="text-[12px] text-slate-500 mt-1 select-none font-sans">
            Saved inside browser LocalStorage sandbox
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200/50 rounded-xl p-5 shadow-sm">
          <span className="font-mono text-[10px] text-brand-slate-light uppercase tracking-wider font-bold block select-none">
            Target Platforms
          </span>
          <div className="text-3xl font-display font-bold mt-1.5 text-brand-slate">
            {activePlatformsCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-2 select-none flex flex-wrap gap-1">
            {cursorCount > 0 && <span className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded font-mono font-medium">Cursor: {cursorCount}</span>}
            {claudeCount > 0 && <span className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded font-mono font-medium">Claude: {claudeCount}</span>}
            {windsurfCount > 0 && <span className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded font-mono font-medium">Windsurf: {windsurfCount}</span>}
            {gptCount > 0 && <span className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded font-mono font-medium">GPT: {gptCount}</span>}
            {activePlatformsCount === 0 && <span className="text-slate-400 font-sans italic">No platforms active</span>}
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200/50 rounded-xl p-5 shadow-sm">
          <span className="font-mono text-[10px] text-brand-slate-light uppercase tracking-wider font-bold block select-none">
            Security Status
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <Shield className="w-5 h-5 text-brand-green animate-pulse" />
            <div className="text-xl font-display font-semibold text-slate-800">
              LocalStorage
            </div>
          </div>
          <p className="text-[12px] text-slate-500 mt-2 font-mono">
            {keysCount} / 3 API Keys configured in browser
          </p>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white border border-slate-200/50 rounded-xl p-4 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills by name or platform..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-indigo/20 focus:border-brand-indigo/60 transition font-mono"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-3.5">
          {/* Platform Tabs */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5 gap-0.5">
            {(['all', 'cursor', 'claude', 'windsurf'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPlatformFilter(p)}
                className={`font-mono text-[10px] uppercase tracking-wider font-bold px-2.5 py-1.5 rounded-md transition-colors cursor-pointer select-none ${
                  platformFilter === p
                    ? 'bg-white text-brand-indigo shadow-sm border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-850 hover:bg-slate-100/50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 gap-1.5 text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[11px] font-mono uppercase tracking-wider font-bold outline-none cursor-pointer pr-1"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid or Empty state */}
      {filteredAndSortedSkills.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200/50 rounded-2xl p-8 max-w-md mx-auto shadow-sm select-none">
          <p className="font-display font-semibold text-[18px] text-slate-800 mb-2">No matching skills found</p>
          <p className="font-sans text-[13px] text-slate-500 mb-6">
            Try adjusting your search criteria or platform filters.
          </p>
          <button 
            onClick={() => {
              setSearchQuery('')
              setPlatformFilter('all')
            }}
            className="text-[12px] font-mono text-brand-indigo uppercase tracking-wider font-bold border border-slate-250 hover:bg-slate-50 px-4 py-2 rounded-lg cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <SkillGrid
          skills={filteredAndSortedSkills}
          onDownload={handleDownload}
          onRegenerate={handleRegenerate}
        />
      )}
    </div>
  )
}
