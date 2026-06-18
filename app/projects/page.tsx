import { getProjects } from '@/lib/cosmic'
import ProjectCard from '@/components/ProjectCard'

export const metadata = {
  title: 'Projects | My Portfolio',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container-page py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900">Projects</h1>
        <p className="mt-3 text-lg text-slate-500">Everything I have designed and built.</p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-2xl mb-2">🚀</p>
          <p>No projects to show yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}