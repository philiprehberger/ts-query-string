import type { QuerySchema } from './types';

function coerce(value: string, type: string): unknown {
  switch (type) {
    case 'number': return Number(value);
    case 'boolean': return value === 'true' || value === '1';
    default: return value;
  }
}

export function parseQuery<T extends QuerySchema>(
  search: string,
  schema?: T,
): T extends undefined ? Record<string, string | string[]> : { [K in keyof T]: T[K] extends 'string[]' | 'number[]' ? (T[K] extends 'number[]' ? number[] : string[]) : T[K] extends 'number' ? number : T[K] extends 'boolean' ? boolean : string } {
  const input = search.startsWith('?') ? search.slice(1) : search;
  if (!input) return {} as any;

  const result: Record<string, unknown> = {};
  const pairs = input.split('&');

  for (const pair of pairs) {
    const [rawKey, rawValue] = pair.split('=');
    if (!rawKey) continue;
    const key = decodeURIComponent(rawKey);
    const value = rawValue !== undefined ? decodeURIComponent(rawValue) : '';

    if (key in result) {
      const existing = result[key];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        result[key] = [existing as string, value];
      }
    } else {
      result[key] = value;
    }
  }

  if (!schema) return result as any;

  const typed: Record<string, unknown> = {};
  for (const [key, type] of Object.entries(schema)) {
    const val = result[key];
    if (val === undefined) continue;

    if (type === 'string[]' || type === 'number[]') {
      const arr = Array.isArray(val) ? val : [val];
      typed[key] = type === 'number[]' ? arr.map(Number) : arr;
    } else {
      const single = Array.isArray(val) ? val[0] : val;
      typed[key] = coerce(single as string, type);
    }
  }

  return typed as any;
}
