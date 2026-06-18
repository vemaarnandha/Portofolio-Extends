import { API_BASE_URL } from "./api";

const TOKEN_KEY = "auth_token";
const REFRESH_KEY = "auth_refresh_token";

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function storeTokens(token: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const token = getStoredToken();
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      credentials: "include",
      headers,
    });

    if (response.status === 401 && token) {
      clearTokens();
    }

    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}

export async function logout(): Promise<void> {
  clearTokens();
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // ignore
  }
  window.location.href = "/admin/login";
}
