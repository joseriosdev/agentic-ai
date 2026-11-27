export const DEFAULT_REDIRECT = "/dashboard";

// Only allow same-origin relative paths, so callbackUrl can't be used as an open redirect.
export function safeRedirect(value: unknown): string {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.startsWith("/\\")
  ) {
    return DEFAULT_REDIRECT;
  }
  return value;
}
