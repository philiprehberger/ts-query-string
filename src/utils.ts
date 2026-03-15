import { parseQuery } from './parse';
import { buildQuery } from './build';

export function appendQuery(
  url: string,
  params: Record<string, string | number | boolean | null | undefined | (string | number)[]>,
): string {
  const [base, existing] = url.split('?');
  const existingParams = existing ? parseQuery(existing) : {};
  const merged: Record<string, string | string[]> = {};

  for (const [k, v] of Object.entries(existingParams)) {
    merged[k] = v;
  }
  for (const [k, v] of Object.entries(params)) {
    if (v !== null && v !== undefined) {
      merged[k] = Array.isArray(v) ? v.map(String) : String(v);
    }
  }

  const query = buildQuery(merged);
  return query ? `${base}?${query}` : base;
}

export function pickQuery(search: string, keys: string[]): string {
  const params = parseQuery(search);
  const result: Record<string, string | string[]> = {};
  for (const key of keys) {
    if (key in params) {
      result[key] = params[key];
    }
  }
  return buildQuery(result);
}

export function omitQuery(search: string, keys: string[]): string {
  const params = parseQuery(search);
  const keySet = new Set(keys);
  const result: Record<string, string | string[]> = {};
  for (const [key, value] of Object.entries(params)) {
    if (!keySet.has(key)) {
      result[key] = value;
    }
  }
  return buildQuery(result);
}
