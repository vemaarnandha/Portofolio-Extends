export interface Portfolio {
  id: number;
  namaProject: string;
  photoUrl: string;
  jobdesk: string;
  deskripsi: string;
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
}

export interface UploadResponse {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

export interface ProjectFormData {
  nama_project: string;
  photo_url: string;
  jobdesk: string;
  deskripsi: string;
  image?: File | null;
  imagePreview?: string;
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
