import Link from 'next/link'
import { getContactInfo, getProjects, getSkills, getWorkExperience } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import SkillCard from '@/components/SkillCard'
import ExperienceItem from '@/components/ExperienceItem'

export default async function HomePage() {
  const [contact, projects, skills, experiences] = await Promise.all([
    getContactInfo(),
    getProjects(),
    getSkills(),
    getWorkExperience(),
  ])

  const featuredProjects = projects.slice(0, 3)
  const topSkills = skills.slice(0, 8)
  const recentExperience = experiences.slice(0, 3)

  return (
    <>
      <Hero contact={contact} />

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="container-page py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Featured Projects</h2>
              <p className="mt-2 text-slate-500">A selection of things I have built.</p>
            </div>
            <Link href="/projects" className="text-sm font-semibold text-brand-600 hover:text-brand-700 whitespace-nowrap">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {topSkills.length > 0 && (
        <section className="bg-white border-y border-slate-200">
          <div className="container-page py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900">Skills</h2>
                <p className="mt-2 text-slate-500">Technologies I work with.</p>
              </div>
              <Link href="/skills" className="text-sm font-semibold text-brand-600 hover:text-brand-700 whitespace-nowrap">
                View all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Experience */}
      {recentExperience.length > 0 && (
        <section className="container-page py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Experience</h2>
              <p className="mt-2 text-slate-500">My recent professional journey.</p>
            </div>
            <Link href="/experience" className="text-sm font-semibold text-brand-600 hover:text-brand-700 whitespace-nowrap">
              View all →
            </Link>
          </div>
          <div className="max-w-3xl">
            {recentExperience.map((exp) => (
              <ExperienceItem key={exp.id} experience={exp} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}