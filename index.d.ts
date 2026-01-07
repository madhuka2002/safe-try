export interface AISuggestion {
  name: string;
  message: string;
  suggestion?: string;
  fix?: string;
}

export interface SafeTryOptions {
  analyze?: boolean;
}

export type SafeTryError = Error | AISuggestion;

export type SafeTryResult<T> =
  | [null, T]
  | [SafeTryError, null];

/**
 * Safely execute a synchronous function without try/catch.
 */
export function safeTry<T>(
  fn: () => T,
  options?: SafeTryOptions
): SafeTryResult<T>;

/**
 * Safely execute an asynchronous function without try/catch.
 */
export function safeTryAsync<T>(
  fn: () => Promise<T>,
  options?: SafeTryOptions
): Promise<SafeTryResult<T>>;

/**
 * Safely parse JSON with optional AI-style runtime suggestions.
 */
export function safeTryJson<T = unknown>(
  fn: () => string,
  options?: SafeTryOptions
): SafeTryResult<T>;

/**
 * Execute a function and return a default value if an error occurs.
 */
export function safeTryDefault<T>(
  fn: () => T,
  defaultValue: T,
  options?: SafeTryOptions
): T;
