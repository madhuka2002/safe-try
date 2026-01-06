export interface AISuggestion {
  name: string;
  message: string;
  suggestion?: string;
  fix?: string;
}

export interface SafeTryOptions {
  analyze?: boolean;
}

export type SafeTryResult<T> = [null, T] | [Error | AISuggestion, null];

export function safeTry<T>(
  fn: () => T,
  options?: SafeTryOptions
): SafeTryResult<T>;

export function safeTryAsync<T>(
  fn: () => Promise<T>,
  options?: SafeTryOptions
): Promise<SafeTryResult<T>>;

/**
 * Safely parse JSON with AI-style error suggestions
 */
export function safeTryJson<T = unknown>(
  json: string,
  options?: SafeTryOptions
): SafeTryResult<T>;

/**
 * Execute with a default fallback value on error
 */
export function safeTryDefault<T>(
  fn: () => T,
  defaultValue: T,
  options?: SafeTryOptions
): T;
