import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const STORE_FILE = path.join(os.homedir(), '.devhub', 'snippets.json');

function clearStore(): void {
  if (fs.existsSync(STORE_FILE)) {
    fs.unlinkSync(STORE_FILE);
  }
}

describe('snippetStore', () => {
  let snippetStore: typeof import('../src/storage/snippetStore.js').snippetStore;

  beforeEach(async () => {
    clearStore();
    const mod = await import('../src/storage/snippetStore.js');
    snippetStore = mod.snippetStore;
  });

  afterEach(() => {
    clearStore();
  });

  it('démarre avec 0 snippet', () => {
    expect(snippetStore.count()).toBe(0);
  });

  it('ajoute un snippet', () => {
    const result = snippetStore.add('test-hello', "console.log('hi')");
    expect(result).toBe(true);
    expect(snippetStore.count()).toBe(1);
  });

  it('refuse les doublons', () => {
    snippetStore.add('test-dup', 'code A');
    const result = snippetStore.add('test-dup', 'code B');
    expect(result).toBe(false);
    expect(snippetStore.count()).toBe(1);
  });

  it('liste les snippets ajoutés', () => {
    snippetStore.add('test-list-a', 'code A');
    snippetStore.add('test-list-b', 'code B');
    const list = snippetStore.list();
    expect(list.length).toBe(2);
    expect(list[0].name).toBe('test-list-a');
    expect(list[1].name).toBe('test-list-b');
  });

  it('supprime un snippet existant', () => {
    snippetStore.add('test-remove', 'code');
    const result = snippetStore.remove('test-remove');
    expect(result).toBe(true);
    expect(snippetStore.count()).toBe(0);
  });

  it("retourne false si le snippet n'existe pas", () => {
    const result = snippetStore.remove('test-inexistant-' + Date.now());
    expect(result).toBe(false);
  });
});