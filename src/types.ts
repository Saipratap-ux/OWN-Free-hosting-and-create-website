export interface ProjectFile {
  name: string;
  content: string;
  language: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  subdomain: string;
  isPublished: boolean;
  publishedAt?: string;
  customDomain?: string;
  files: Record<string, ProjectFile>;
  updatedAt: string;
  createdAt: string;
  version: number;
}

export interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  iconName: string;
  files: Record<string, ProjectFile>;
}

export interface WebsiteIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  file: string;
  line?: number;
  autoFixable: boolean;
}

export interface UserProfile {
  email: string;
  name: string;
  isGuest: boolean;
  avatarUrl: string;
  plan: 'Free Forever';
}

export type ViewMode = 'desktop' | 'tablet' | 'mobile';

export type ActiveTab =
  | 'home'
  | 'builder'
  | 'dashboard'
  | 'editor'
  | 'templates'
  | 'deployments'
  | 'publishing'
  | 'admin'
  | 'docs'
  | 'settings';
