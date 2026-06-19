export interface Portfolio {
  id: number;
  namaProject: string;
  photoUrl: string;
  jobdesk: string;
  deskripsi: string;
  repoUrl: string | null;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface User {
  id: number;
  email: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface UploadResponse {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  initials: string;
  isApproved: boolean;
  createdAt: string;
}
