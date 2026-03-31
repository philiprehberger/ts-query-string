# @philiprehberger/query-string-ts

[![CI](https://github.com/philiprehberger/query-string-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/query-string-ts/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/query-string-ts.svg)](https://www.npmjs.com/package/@philiprehberger/query-string-ts)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/query-string-ts)](https://github.com/philiprehberger/query-string-ts/commits/main)

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

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/query-string-ts)

🐛 [Report issues](https://github.com/philiprehberger/query-string-ts/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/query-string-ts/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
