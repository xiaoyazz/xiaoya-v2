export interface ExperienceItem {
  company: string;
  title: string;
  location: string;
  date: string;
  details: string[];
}

export interface Project {
  id: number;
  title: string;
  summary: string;
  overview: string;
  coverImage: string;
  images: string[];
  repoLink: string;
  liveLink?: string;
  tags: string[];
  date: string;
  featured?: boolean;
}
