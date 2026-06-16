import { API_BASE_URL } from "./api";

export async function isAuthenticated(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      credentials: "include",
    });
    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}

export async function logout(): Promise<void> {
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
