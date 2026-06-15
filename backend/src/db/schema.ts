export interface Portfolio {
  id: number;
  nama_project: string;
  photo_url: string;
  jobdesk: string;
  deskripsi: string;
  created_at: string;
}

export interface AdminUser {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}
