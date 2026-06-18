import type { Skill } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface SkillCardProps {
  skill: Skill
}

const proficiencyColors: Record<string, string> = {
  Beginner: 'bg-slate-100 text-slate-700',
  Intermediate: 'bg-blue-100 text-blue-700',
  Advanced: 'bg-brand-100 text-brand-700',
  Expert: 'bg-emerald-100 text-emerald-700',
}

export default function SkillCard({ skill }: SkillCardProps) {
  const name = getMetafieldValue(skill.metadata?.name) || skill.title
  const icon = getMetafieldValue(skill.metadata?.icon)
  const proficiency = getMetafieldValue(skill.metadata?.proficiency)
  const profClass = proficiencyColors[proficiency] || 'bg-slate-100 text-slate-700'

  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-4 hover:border-brand-300 hover:shadow-md transition-all">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-50 text-xl shrink-0">
        {icon || '🛠️'}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900 truncate">{name}</p>
        {proficiency && (
          <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded ${profClass}`}>
            {proficiency}
          </span>
        )}
      </div>
    </div>
  )
}