
// Reusable helpers for tests (NOT a test file)
export function randEmail(prefix: string = 'user'): string {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}@example.com`;
}
