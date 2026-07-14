import { Skill, SkillCard } from './skill-card'

interface SkillGridProps {
  skills: Skill[]
  onDownload: (skill: Skill) => void
  onRegenerate: (skill: Skill) => void;
}

export const SkillGrid = ({ skills, onDownload, onRegenerate }: SkillGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          onDownload={onDownload}
          onRegenerate={onRegenerate}
        />
      ))}
    </div>
  )
}
