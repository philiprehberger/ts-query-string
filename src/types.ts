export type ArrayFormat = 'repeat' | 'brackets' | 'comma';

export interface BuildOptions {
  arrayFormat?: ArrayFormat;
  encode?: boolean;
  sort?: boolean;
}

export interface ParseOptions {
  decode?: boolean;
}

export type QuerySchema = Record<string, 'string' | 'number' | 'boolean' | 'string[]' | 'number[]'>;
