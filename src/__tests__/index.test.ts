import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');

describe('query-string-ts', () => {
  it('should export parseQuery', () => {
    assert.ok(mod.parseQuery);
  });

  it('should export buildQuery', () => {
    assert.ok(mod.buildQuery);
  });

  it('should export appendQuery', () => {
    assert.ok(mod.appendQuery);
  });

  it('should export pickQuery', () => {
    assert.ok(mod.pickQuery);
  });

  it('should export omitQuery', () => {
    assert.ok(mod.omitQuery);
  });
});
