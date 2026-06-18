import Link from 'next/link'
import type { ContactInfo } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface HeroProps {
  contact: ContactInfo | null
}

export default function Hero({ contact }: HeroProps) {
  const fullName = getMetafieldValue(contact?.metadata?.full_name) || 'Hello, I am a Developer'
  const headline = getMetafieldValue(contact?.metadata?.headline)
  const bio = getMetafieldValue(contact?.metadata?.bio)
  const profilePhoto = contact?.metadata?.profile_photo
  const location = getMetafieldValue(contact?.metadata?.location)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 text-white">
      <div className="container-page py-20 sm:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            {location && (
              <p className="inline-flex items-center gap-1.5 text-sm text-brand-100 mb-4">
                <span>📍</span> {location}
              </p>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              {fullName}
            </h1>
            {headline && (
              <p className="mt-4 text-xl text-brand-100 font-medium">{headline}</p>
            )}
            {bio && (
              <p className="mt-6 text-brand-50/90 leading-relaxed max-w-xl">{bio}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="px-6 py-3 rounded-lg bg-white text-brand-700 font-semibold hover:bg-brand-50 transition-colors shadow-lg"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-lg bg-brand-500/30 backdrop-blur text-white font-semibold border border-white/30 hover:bg-brand-500/50 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {profilePhoto && (
            <div className="flex justify-center md:justify-end animate-fade-up">
              <div className="relative">
                <div className="absolute -inset-2 bg-white/20 rounded-3xl blur-xl" />
                <img
                  src={`${profilePhoto.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                  alt={fullName}
                  width={300}
                  height={300}
                  className="relative w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-3xl border-4 border-white/30 shadow-2xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}