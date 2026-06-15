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
  token: string;
  user: User;
}
