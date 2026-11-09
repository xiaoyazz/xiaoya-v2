export interface Person {
  name: string;
  role: string;
  /** Label/value rows in the About window, like the specs in About This Mac. */
  about: [label: string, value: string][];
  github: string;
  linkedin: string;
}

export interface Education {
  field: string;
  institution: string;
  country: string;
  expectedGraduation: string;
}

export interface Experience {
  company: string;
  /** Optional shorter name used in RESUME.txt. */
  shortCompany?: string;
  title: string;
  location: string;
  date: string;
  details: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'game';
  summary: string;
  overview: string;
  tags: string[];
  date: string;
  /** Cover screenshot file name in public/assets. */
  image: string;
  github: string;
  live: string | null;
}

export interface GalleryItem {
  id: string;
  file: string;
  src: string;
  title: string;
  width: number;
  height: number;
}

export interface TechItem {
  name: string;
  icon: string;
  href: string;
  label: string;
  className?: string;
}

export interface AiTool {
  name: string;
  href: string;
  className: string;
}
