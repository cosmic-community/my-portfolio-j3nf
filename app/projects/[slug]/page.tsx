// app/projects/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const title = getMetafieldValue(project.metadata?.title) || project.title
  const shortDescription = getMetafieldValue(project.metadata?.short_description)
  const overview = getMetafieldValue(project.metadata?.overview)
  const featuredImage = project.metadata?.featured_image
  const screenshots = project.metadata?.screenshots || []
  const techStack = project.metadata?.tech_stack || []
  const liveUrl = getMetafieldValue(project.metadata?.live_url)
  const sourceUrl = getMetafieldValue(project.metadata?.source_url)

  return (
    <article>
      {/* Hero image */}
      {featuredImage && (
        <div className="relative w-full aspect-[21/9] bg-slate-100 overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=2000&h=857&fit=crop&auto=format,compress`}
            alt={title}
            width={1400}
            height={600}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <div className="container-page py-12">
        <Link href="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 mb-6">
          ← Back to projects
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-extrabold text-slate-900">{title}</h1>
            {shortDescription && (
              <p className="mt-3 text-lg text-slate-500">{shortDescription}</p>
            )}

            {overview && (
              <div className="prose prose-slate max-w-none mt-8">
                <div dangerouslySetInnerHTML={{ __html: overview }} />
              </div>
            )}

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Screenshots</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {screenshots.map((shot, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-slate-200">
                      <img
                        src={`${shot.imgix_url}?w=1000&h=600&fit=crop&auto=format,compress`}
                        alt={`${title} screenshot ${idx + 1}`}
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              {(liveUrl || sourceUrl) && (
                <div className="space-y-3 mb-6">
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
                    >
                      🌐 View Live
                    </a>
                  )}
                  {sourceUrl && (
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
                    >
                      💻 Source Code
                    </a>
                  )}
                </div>
              )}

              {techStack.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-sm font-medium text-brand-700 bg-brand-50 px-3 py-1 rounded-full"
                      >
                        {getMetafieldValue(tech)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}