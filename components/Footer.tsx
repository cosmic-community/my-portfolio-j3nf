import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-200 bg-white mt-16">
      <div className="container-page py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">© {year} My Portfolio. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="/projects" className="text-sm text-slate-500 hover:text-brand-600">Projects</Link>
          <Link href="/skills" className="text-sm text-slate-500 hover:text-brand-600">Skills</Link>
          <Link href="/experience" className="text-sm text-slate-500 hover:text-brand-600">Experience</Link>
          <Link href="/contact" className="text-sm text-slate-500 hover:text-brand-600">Contact</Link>
        </nav>
      </div>
    </footer>
  )
}