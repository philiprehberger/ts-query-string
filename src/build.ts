import type { BuildOptions } from './types';

export function buildQuery(
  params: Record<string, string | number | boolean | null | undefined | (string | number)[]>,
  options: BuildOptions = {},
): string {
  const { arrayFormat = 'repeat', encode = true, sort = false } = options;
  const pairs: string[] = [];

  let keys = Object.keys(params);
  if (sort) keys = keys.sort();

  for (const key of keys) {
    const value = params[key];
    if (value === null || value === undefined) continue;

    const encodedKey = encode ? encodeURIComponent(key) : key;

    if (Array.isArray(value)) {
      const values = value.filter((v) => v !== null && v !== undefined);
      switch (arrayFormat) {
        case 'comma':
          pairs.push(`${encodedKey}=${values.map((v) => (encode ? encodeURIComponent(String(v)) : String(v))).join(',')}`);
          break;
        case 'brackets':
          for (const v of values) {
            pairs.push(`${encodedKey}[]=${encode ? encodeURIComponent(String(v)) : String(v)}`);
          }
          break;
        case 'repeat':
        default:
          for (const v of values) {
            pairs.push(`${encodedKey}=${encode ? encodeURIComponent(String(v)) : String(v)}`);
          }
          break;
      }
    } else {
      pairs.push(`${encodedKey}=${encode ? encodeURIComponent(String(value)) : String(value)}`);
    }
  }

  return pairs.join('&');
}
