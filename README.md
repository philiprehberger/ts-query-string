# @philiprehberger/query-string-ts

[![CI](https://github.com/philiprehberger/ts-query-string/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-query-string/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/query-string-ts.svg)](https://www.npmjs.com/package/@philiprehberger/query-string-ts)
[![License](https://img.shields.io/github/license/philiprehberger/ts-query-string)](LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-GitHub%20Sponsors-ec6cb9)](https://github.com/sponsors/philiprehberger)

Type-safe URL query string parsing and building

## Installation

```bash
npm install @philiprehberger/query-string-ts
```

## Usage

```ts
import { parseQuery, buildQuery, appendQuery } from '@philiprehberger/query-string-ts';

const params = parseQuery('?page=2&tags=a&tags=b', {
  page: 'number',
  tags: 'string[]',
});
// { page: 2, tags: ['a', 'b'] } — typed

buildQuery({ page: 2, tags: ['a', 'b'] });           // "page=2&tags=a&tags=b"
appendQuery('https://example.com?a=1', { b: '2' });  // "https://example.com?a=1&b=2"
```

### Array Formats

```ts
buildQuery({ tags: ['a', 'b'] }, { arrayFormat: 'comma' });    // "tags=a,b"
buildQuery({ tags: ['a', 'b'] }, { arrayFormat: 'brackets' }); // "tags[]=a&tags[]=b"
```

## API

| Function | Description |
|----------|-------------|
| `parseQuery(search, schema?)` | Parse with optional type coercion |
| `buildQuery(params, options?)` | Serialize object to query string |
| `appendQuery(url, params)` | Append params to existing URL |
| `pickQuery(search, keys)` | Extract subset of params |
| `omitQuery(search, keys)` | Remove params by key |


## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
