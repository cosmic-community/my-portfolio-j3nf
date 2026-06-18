import Link from 'next/link'
import type { Project } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const featuredImage = project.metadata?.featured_image
  const title = getMetafieldValue(project.metadata?.title) || project.title
  const shortDescription = getMetafieldValue(project.metadata?.short_description)
  const techStack = project.metadata?.tech_stack || []
  const isFeatured = project.metadata?.featured

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 text-4xl">🚀</div>
        )}
        {isFeatured && (
          <span className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
          {title}
        </h3>
        {shortDescription && (
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{shortDescription}</p>
        )}
        {techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {techStack.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded"
              >
                {getMetafieldValue(tech)}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="text-xs font-medium text-slate-400 px-2 py-0.5">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}