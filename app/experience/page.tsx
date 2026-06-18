import { getWorkExperience } from '@/lib/cosmic'
import ExperienceItem from '@/components/ExperienceItem'

export const metadata = {
  title: 'Experience | My Portfolio',
}

export default async function ExperiencePage() {
  const experiences = await getWorkExperience()

  return (
    <div className="container-page py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900">Work Experience</h1>
        <p className="mt-3 text-lg text-slate-500">My professional journey so far.</p>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-2xl mb-2">💼</p>
          <p>No work experience to show yet.</p>
        </div>
      ) : (
        <div className="max-w-3xl">
          {experiences.map((exp) => (
            <ExperienceItem key={exp.id} experience={exp} />
          ))}
        </div>
      )}
    </div>
  )
}