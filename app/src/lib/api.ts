import type { ApiResponse, Portfolio, LoginResponse } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8787";

// Helper untuk handle response
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Terjadi kesalahan" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

// Helper untuk get headers dengan auth token
function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// AUTH API
export async function login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse<LoginResponse>(response);
}

// PORTFOLIO API - Public
export async function getPortfolios(): Promise<ApiResponse<Portfolio[]>> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio`);
  return handleResponse<Portfolio[]>(response);
}

export async function getPortfolioById(id: number): Promise<ApiResponse<Portfolio>> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio/${id}`);
  return handleResponse<Portfolio>(response);
}

// PORTFOLIO API - Protected (Admin)
export async function createPortfolio(data: {
  nama_project: string;
  photo_url: string;
  jobdesk: string;
  deskripsi: string;
}): Promise<ApiResponse<Portfolio>> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
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
  const response = await fetch(`${API_BASE_URL}/api/portfolio/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<Portfolio>(response);
}

export async function deletePortfolio(id: number): Promise<ApiResponse<Portfolio>> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse<Portfolio>(response);
}
