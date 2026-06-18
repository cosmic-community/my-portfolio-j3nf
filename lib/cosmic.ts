import { createBucketClient } from '@cosmicjs/sdk'
import type { Skill, Project, WorkExperience, ContactInfo } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render any metafield value as a string
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Skill[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch skills')
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const projects = response.objects as Project[]
    // Sort featured first
    return projects.sort((a, b) => {
      const aFeatured = a.metadata?.featured ? 1 : 0
      const bFeatured = b.metadata?.featured ? 1 : 0
      return bFeatured - aFeatured
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch projects')
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'projects', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const project = response.object as Project
    if (!project) return null
    return project
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch project')
  }
}

export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'work-experience' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const experiences = response.objects as WorkExperience[]
    // Sort newest start_date first
    return experiences.sort((a, b) => {
      const dateA = new Date(a.metadata?.start_date || '').getTime()
      const dateB = new Date(b.metadata?.start_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch work experience')
  }
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'contact-info' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const items = response.objects as ContactInfo[]
    return items[0] || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch contact info')
  }
}