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

export interface AdminSession {
  id: number;
  user_id: number;
  refresh_token: string;
  user_agent: string;
  ip_address: string;
  expires_at: string;
  created_at: string;
  last_active_at: string;
}
