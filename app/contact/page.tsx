import { getContactInfo } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'

export const metadata = {
  title: 'Contact | My Portfolio',
}

export default async function ContactPage() {
  const contact = await getContactInfo()

  if (!contact) {
    return (
      <div className="container-page py-16 text-center text-slate-400">
        <p className="text-2xl mb-2">📇</p>
        <p>No contact info available yet.</p>
      </div>
    )
  }

  const fullName = getMetafieldValue(contact.metadata?.full_name) || contact.title
  const headline = getMetafieldValue(contact.metadata?.headline)
  const bio = getMetafieldValue(contact.metadata?.bio)
  const profilePhoto = contact.metadata?.profile_photo
  const email = getMetafieldValue(contact.metadata?.email)
  const location = getMetafieldValue(contact.metadata?.location)
  const github = getMetafieldValue(contact.metadata?.github_url)
  const linkedin = getMetafieldValue(contact.metadata?.linkedin_url)
  const twitter = getMetafieldValue(contact.metadata?.twitter_url)
  const website = getMetafieldValue(contact.metadata?.website_url)

  const socialLinks = [
    { label: 'GitHub', url: github, icon: '💻' },
    { label: 'LinkedIn', url: linkedin, icon: '🔗' },
    { label: 'Twitter', url: twitter, icon: '🐦' },
    { label: 'Website', url: website, icon: '🌐' },
  ].filter((link) => link.url)

  return (
    <div className="container-page py-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-br from-brand-600 to-indigo-700 px-8 py-12 text-center text-white">
            {profilePhoto && (
              <img
                src={`${profilePhoto.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
                alt={fullName}
                width={120}
                height={120}
                className="w-28 h-28 rounded-full mx-auto border-4 border-white/40 object-cover shadow-lg"
              />
            )}
            <h1 className="mt-5 text-3xl font-extrabold">{fullName}</h1>
            {headline && <p className="mt-2 text-brand-100">{headline}</p>}
          </div>

          <div className="p-8">
            {bio && <p className="text-slate-600 leading-relaxed">{bio}</p>}

            <div className="mt-8 space-y-4">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                >
                  <span className="text-xl">✉️</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</p>
                    <p className="font-medium text-slate-900">{email}</p>
                  </div>
                </a>
              )}
              {location && (
                <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Location</p>
                    <p className="font-medium text-slate-900">{location}</p>
                  </div>
                </div>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Connect</h2>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-700 font-medium transition-colors"
                    >
                      <span>{link.icon}</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}