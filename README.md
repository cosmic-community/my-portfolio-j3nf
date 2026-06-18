# My Portfolio

![App Preview](https://imgix.cosmicjs.com/bff07750-6b4c-11f1-8dfe-457508ece1b8-autopilot-photo-1500648767791-00dcc994a43e-1781811280644.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, and fully responsive developer portfolio built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Showcase your projects, skills, work experience, and contact information with a polished, professional design.

## Features

- 🎨 **Modern, Responsive Design** — Looks great on all devices with smooth animations and a clean layout
- 🚀 **Project Showcase** — Detailed project pages with screenshots, tech stacks, and live/source links
- 🛠️ **Skills Grid** — Skills grouped by category with proficiency indicators
- 💼 **Work Experience Timeline** — A visual timeline of your career journey
- 📇 **Contact Info** — Profile bio, social links, and contact details
- ⚡ **Server Components** — Fast, SEO-friendly rendering with Next.js App Router
- 🌙 **Dark-aware, accessible UI** — Built with Tailwind CSS

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a3447e99f5d95ad199635d9&clone_repository=6a3448fb9f5d95ad19963620)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a developer portfolio with projects (including screenshots, tech stack, and live URLs), skills, and work experience.
>
> User instructions: A developer portfolio with projects, skills, work experience, and contact info"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Portfolio". The content is managed in Cosmic CMS with the following object types: skills, projects, work-experience, contact-info. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A developer portfolio with projects, skills, work experience, and contact info

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js 18+)
- A Cosmic account with a bucket containing the portfolio content types

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up your environment variables (provided automatically when deployed via Cosmic):
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Run the development server:
   ```bash
   bun run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all projects with nested object data
const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single project by slug
const { object: project } = await cosmic.objects
  .findOne({ type: 'projects', slug: 'my-project' })
  .depth(1)
```

## Cosmic CMS Integration

This application reads from four Cosmic object types:

- **skills** — name, category, proficiency, icon
- **projects** — title, short_description, overview, featured_image, screenshots, tech_stack, live_url, source_url, featured
- **work-experience** — job_title, company, location, start_date, current_role, end_date, description
- **contact-info** — full_name, headline, bio, profile_photo, email, location, github_url, linkedin_url, twitter_url, website_url

All data fetching happens server-side using the [Cosmic SDK](https://www.cosmicjs.com/docs) for optimal security and performance.

## Deployment Options

### Vercel
1. Push your code to a Git repository
2. Import the project in Vercel
3. Add environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify
1. Connect your repository
2. Set the build command to `bun run build`
3. Add environment variables
4. Deploy

<!-- README_END -->