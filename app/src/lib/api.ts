import type { ApiResponse, Portfolio, LoginResponse, UploadResponse } from "@/types";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "";

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Terjadi kesalahan" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

function fetchOpts(method: string, body?: any): RequestInit {
  const opts: RequestInit = {
    method,
    credentials: "include" as RequestCredentials,
  };
  if (body) {
    opts.headers = { "Content-Type": "application/json" };
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
  });
  return handleResponse<Portfolio[]>(response);
}

export async function getPortfolioById(id: number): Promise<ApiResponse<Portfolio>> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio/${id}`, {
    credentials: "include",
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
    }
  );

  return response.json();
}
