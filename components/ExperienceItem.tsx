import type { WorkExperience } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDateRange } from '@/lib/utils'

interface ExperienceItemProps {
  experience: WorkExperience
}

export default function ExperienceItem({ experience }: ExperienceItemProps) {
  const jobTitle = getMetafieldValue(experience.metadata?.job_title) || experience.title
  const company = getMetafieldValue(experience.metadata?.company)
  const location = getMetafieldValue(experience.metadata?.location)
  const description = getMetafieldValue(experience.metadata?.description)
  const dateRange = formatDateRange(
    experience.metadata?.start_date,
    experience.metadata?.end_date,
    experience.metadata?.current_role
  )
  const isCurrent = experience.metadata?.current_role

  return (
    <div className="relative pl-8 pb-10 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-2.5 top-2 bottom-0 w-px bg-slate-200" />
      {/* Dot */}
      <div className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border-4 border-white ${isCurrent ? 'bg-brand-600' : 'bg-slate-300'} shadow`} />

      <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{jobTitle}</h3>
            {company && (
              <p className="text-brand-600 font-medium">
                {company}
                {location && <span className="text-slate-400 font-normal"> · {location}</span>}
              </p>
            )}
          </div>
          {dateRange && (
            <span className="text-sm font-medium text-slate-500 whitespace-nowrap">{dateRange}</span>
          )}
        </div>
        {description && (
          <p className="mt-3 text-sm text-slate-600 leading-relaxed whitespace-pre-line">{description}</p>
        )}
      </div>
    </div>
  )
}