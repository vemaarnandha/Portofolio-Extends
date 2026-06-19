export function encodeId(id: number): string {
  return btoa(String(id));
}

export function decodeId(encoded: string): number | null {
  try {
    const decoded = atob(encoded);
    const num = Number(decoded);
    return isNaN(num) ? null : num;
  } catch {
    return null;
  }
}
