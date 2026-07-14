'use client'

import { useEffect, useState } from 'react'
import { SkillGrid } from '@/components/dashboard/skill-grid'
import { Skill } from '@/components/dashboard/skill-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, LayoutGrid } from 'lucide-react'
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
  }
]

export default function DashboardPage() {
  const [skills, setSkills] = useState<Skill[]>([])
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

  return (
    <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200/50">
        <div>
          <h1 className="font-display font-semibold text-[22px] text-brand-slate leading-tight flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-brand-indigo" />
            Your skills
          </h1>
          <p className="font-mono text-[13px] text-brand-slate-light mt-1">
            {skills.length} {skills.length === 1 ? 'skill' : 'skills'} stored in local index
          </p>
        </div>

        <Link href="/generate">
          <Button variant="accent" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Generate skill
          </Button>
        </Link>
      </div>

      {/* Grid or Empty state */}
      {skills.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200/50 rounded-2xl p-8 max-w-md mx-auto">
          <p className="font-display font-semibold text-[18px] text-slate-800 mb-2">No skills yet</p>
          <p className="font-sans text-[14px] text-slate-500 mb-6">
            You haven't generated any assistant instructions yet. Describe your workflow to begin.
          </p>
          <Link href="/generate">
            <Button variant="accent">Generate your first skill &rarr;</Button>
          </Link>
        </div>
      ) : (
        <SkillGrid
          skills={skills}
          onDownload={handleDownload}
          onRegenerate={handleRegenerate}
        />
      )}
    </div>
  )
}
