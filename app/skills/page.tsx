import { getSkills } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import SkillCard from '@/components/SkillCard'
import type { Skill } from '@/types'

export const metadata = {
  title: 'Skills | My Portfolio',
}

export default async function SkillsPage() {
  const skills = await getSkills()

  // Group by category
  const grouped: Record<string, Skill[]> = {}
  for (const skill of skills) {
    const category = getMetafieldValue(skill.metadata?.category) || 'Other'
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(skill)
  }

  const categories = Object.keys(grouped).sort()

  return (
    <div className="container-page py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900">Skills</h1>
        <p className="mt-3 text-lg text-slate-500">Technologies and tools I work with.</p>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-2xl mb-2">🛠️</p>
          <p>No skills to show yet.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {categories.map((category) => {
            const categorySkills = grouped[category]
            if (!categorySkills || categorySkills.length === 0) {
              return null
            }
            return (
              <div key={category}>
                <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-brand-600 rounded-full" />
                  {category}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categorySkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}