export interface User {
  [x: string]: string;
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  registerNumber?: string;
  class?: string;
  profilePhoto?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'class' | 'public';
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  path: string;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  studentCount: number;
  teacher: string;
  schedule: string;
}

export interface Stats {
  totalClasses: number;
  totalStudents: number;
  totalClassNotices: number;
  totalPublicNotices: number;
}