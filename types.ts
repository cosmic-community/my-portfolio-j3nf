// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicFile {
  url: string;
  imgix_url: string;
}

// Skills
export type SkillProficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    name?: string;
    category?: string;
    proficiency?: SkillProficiency | string;
    icon?: string;
  };
}

// Projects
export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    title?: string;
    short_description?: string;
    overview?: string;
    featured_image?: CosmicFile;
    screenshots?: CosmicFile[];
    tech_stack?: string[];
    live_url?: string;
    source_url?: string;
    featured?: boolean;
  };
}

// Work Experience
export interface WorkExperience extends CosmicObject {
  type: 'work-experience';
  metadata: {
    job_title?: string;
    company?: string;
    location?: string;
    start_date?: string;
    current_role?: boolean;
    end_date?: string;
    description?: string;
  };
}

// Contact Info
export interface ContactInfo extends CosmicObject {
  type: 'contact-info';
  metadata: {
    full_name?: string;
    headline?: string;
    bio?: string;
    profile_photo?: CosmicFile;
    email?: string;
    location?: string;
    github_url?: string;
    linkedin_url?: string;
    twitter_url?: string;
    website_url?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isProject(obj: CosmicObject): obj is Project {
  return obj.type === 'projects';
}

export function isSkill(obj: CosmicObject): obj is Skill {
  return obj.type === 'skills';
}