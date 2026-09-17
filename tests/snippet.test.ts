import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

// Utilise un dossier temporaire isolé pour les tests
const TEST_DIR = path.join(os.tmpdir(), 'devhub-test-' + Date.now());

describe('snippetStore', () => {
  let snippetStore: typeof import('../src/storage/snippetStore.js').snippetStore;

  beforeEach(async () => {
    // Crée un dossier temporaire propre
    fs.mkdirSync(TEST_DIR, { recursive: true });

    // Importe le store (qui lira ~/.devhub par défaut, mais on va tester la logique)
    const mod = await import('../src/storage/snippetStore.js');
    snippetStore = mod.snippetStore;
  });

  afterEach(() => {
    // Nettoie les fichiers de test
    const testFile = path.join(os.homedir(), '.devhub', 'snippets.json');
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
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
    expect(list.length).toBeGreaterThanOrEqual(2);

    const names = list.map((s) => s.name);
    expect(names).toContain('test-list-a');
    expect(names).toContain('test-list-b');
  });

  it('supprime un snippet existant', () => {
    snippetStore.add('test-remove', 'code');
    const result = snippetStore.remove('test-remove');
    expect(result).toBe(true);
  });

  it("retourne false si le snippet n'existe pas", () => {
    const result = snippetStore.remove('test-inexistant-' + Date.now());
    expect(result).toBe(false);
  });
});