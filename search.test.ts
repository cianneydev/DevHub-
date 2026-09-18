import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

describe('search', () => {
  let snippetStore: typeof import('../src/storage/snippetStore.js').snippetStore;

  beforeEach(async () => {
    const mod = await import('../src/storage/snippetStore.js');
    snippetStore = mod.snippetStore;

    snippetStore.add('search-test-a', "console.log('hello world')");
    snippetStore.add('search-test-b', 'function add(a, b) { return a + b; }');
  });

  afterEach(() => {
    const testFile = path.join(os.homedir(), '.devhub', 'snippets.json');
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('trouve un snippet par son nom', () => {
    const snippets = snippetStore.list();
    const matches = snippets.filter((s) =>
      s.name.toLowerCase().includes('search-test-a')
    );
    expect(matches.length).toBe(1);
  });

  it('trouve un snippet par son code', () => {
    const snippets = snippetStore.list();
    const matches = snippets.filter((s) =>
      s.code.toLowerCase().includes('console.log')
    );
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('retourne vide si aucun résultat', () => {
    const snippets = snippetStore.list();
    const matches = snippets.filter((s) =>
      s.name.toLowerCase().includes('xyz-inexistant-123')
    );
    expect(matches.length).toBe(0);
  });

  it('est insensible à la casse', () => {
    const snippets = snippetStore.list();
    const matches = snippets.filter((s) =>
      s.name.toLowerCase().includes('SEARCH-TEST-A'.toLowerCase())
    );
    expect(matches.length).toBe(1);
  });
});
