import type { ApiResponse, Portfolio, LoginResponse, UploadResponse, ContactMessage, Testimonial } from "@/types";
import { getStoredToken } from "@/lib/auth";

export const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

function authHeaders(): Record<string, string> {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Terjadi kesalahan" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

function fetchOpts(method: string, body?: Record<string, unknown>): RequestInit {
  const opts: RequestInit = {
    method,
    credentials: "include" as RequestCredentials,
    headers: authHeaders(),
  };
  if (body) {
    (opts.headers as Record<string, string>)["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }
  return opts;
}

export async function login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  return handleResponse<LoginResponse>(response);
}

export async function getPortfolios(): Promise<ApiResponse<Portfolio[]>> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio`, {
    credentials: "include",
    headers: authHeaders(),
  });
  return handleResponse<Portfolio[]>(response);
}

export async function getPortfolioById(id: number): Promise<ApiResponse<Portfolio>> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio/${id}`, {
    credentials: "include",
    headers: authHeaders(),
  });
  return handleResponse<Portfolio>(response);
}

export async function createPortfolio(data: {
  nama_project: string;
  photo_url: string;
  jobdesk: string;
  deskripsi: string;
}): Promise<ApiResponse<Portfolio>> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio`, fetchOpts("POST", data));
  return handleResponse<Portfolio>(response);
}

export async function updatePortfolio(
  id: number,
  data: {
    nama_project: string;
    photo_url: string;
    jobdesk: string;
    deskripsi: string;
  }
): Promise<ApiResponse<Portfolio>> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio/${id}`, fetchOpts("PUT", data));
  return handleResponse<Portfolio>(response);
}

export async function deletePortfolio(id: number): Promise<ApiResponse<Portfolio>> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: authHeaders(),
  });
  return handleResponse<Portfolio>(response);
}

export async function uploadProjectImage(
  projectId: number,
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("projectId", String(projectId));

  const response = await fetch(`${API_BASE_URL}/api/portfolio/upload-image`, {
    method: "POST",
    credentials: "include",
    headers: authHeaders(),
    body: formData,
  });

  return response.json();
}

export async function deleteProjectImage(projectId: number): Promise<UploadResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/portfolio/${projectId}/image`,
    {
      method: "DELETE",
      credentials: "include",
      headers: authHeaders(),
    }
  );

  return response.json();
}

export async function sendContactMessage(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string;
}): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE_URL}/api/contact`, fetchOpts("POST", data));
  return handleResponse<null>(response);
}

export async function getContactMessages(): Promise<ApiResponse<ContactMessage[]>> {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    credentials: "include",
    headers: authHeaders(),
  });
  return handleResponse<ContactMessage[]>(response);
}

export async function markMessageAsRead(id: number): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE_URL}/api/contact/read/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: authHeaders(),
  });
  return handleResponse<null>(response);
}

export async function markAllMessagesAsRead(): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE_URL}/api/contact/read-all`, {
    method: "PUT",
    credentials: "include",
    headers: authHeaders(),
  });
  return handleResponse<null>(response);
}

export async function deleteContactMessage(id: number): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: authHeaders(),
  });
  return handleResponse<null>(response);
}

export async function getTestimonials(): Promise<ApiResponse<Testimonial[]>> {
  const response = await fetch(`${API_BASE_URL}/api/testimonial`);
  return handleResponse<Testimonial[]>(response);
}

export async function createTestimonial(data: {
  name: string;
  role: string;
  content: string;
  initials?: string;
}): Promise<ApiResponse<Testimonial>> {
  const response = await fetch(`${API_BASE_URL}/api/testimonial`, fetchOpts("POST", data));
  return handleResponse<Testimonial>(response);
}

export async function updateTestimonial(
  id: number,
  data: { name: string; role: string; content: string; initials?: string }
): Promise<ApiResponse<Testimonial>> {
  const response = await fetch(`${API_BASE_URL}/api/testimonial/${id}`, fetchOpts("PUT", data));
  return handleResponse<Testimonial>(response);
}

export async function deleteTestimonial(id: number): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE_URL}/api/testimonial/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: authHeaders(),
  });
  return handleResponse<null>(response);
}
