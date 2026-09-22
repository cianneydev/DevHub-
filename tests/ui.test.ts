import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const SNIPPET_FILE = path.join(os.homedir(), '.devhub', 'snippets.json');
const NOTE_FILE = path.join(os.homedir(), '.devhub', 'notes.json');

function clearAll(): void {
  if (fs.existsSync(SNIPPET_FILE)) fs.unlinkSync(SNIPPET_FILE);
  if (fs.existsSync(NOTE_FILE)) fs.unlinkSync(NOTE_FILE);
}

describe('ui logic', () => {
  let snippetStore: typeof import('../src/storage/snippetStore.js').snippetStore;
  let noteStore: typeof import('../src/storage/noteStore.js').noteStore;

  beforeEach(async () => {
    clearAll();
    vi.resetModules();
    const sMod = await import('../src/storage/snippetStore.js');
    const nMod = await import('../src/storage/noteStore.js');
    snippetStore = sMod.snippetStore;
    noteStore = nMod.noteStore;
  });

  afterEach(() => {
    clearAll();
  });

  it('les compteurs reflètent le nombre réel d\'éléments', () => {
    snippetStore.add('ui-s1', 'code');
    snippetStore.add('ui-s2', 'code');
    noteStore.add('ui-n1', 'note');

    expect(snippetStore.count()).toBe(2);
    expect(noteStore.count()).toBe(1);
  });

  it('un snippet ajouté via "add" est récupérable via "list"', () => {
    snippetStore.add('ui-recover', 'mon code');
    const found = snippetStore.list().find((s) => s.name === 'ui-recover');
    expect(found).toBeTruthy();
    expect(found?.code).toBe('mon code');
  });

  it('une suppression retire bien l\'élément', () => {
    snippetStore.add('ui-remove', 'code');
    expect(snippetStore.count()).toBe(1);

    const ok = snippetStore.remove('ui-remove');
    expect(ok).toBe(true);
    expect(snippetStore.count()).toBe(0);
  });

  it('ajouter puis supprimer plusieurs fois fonctionne', () => {
    snippetStore.add('ui-loop-1', 'code 1');
    snippetStore.add('ui-loop-2', 'code 2');
    snippetStore.remove('ui-loop-1');
    snippetStore.add('ui-loop-3', 'code 3');
    snippetStore.remove('ui-loop-2');

    expect(snippetStore.count()).toBe(1);
    expect(snippetStore.list()[0].name).toBe('ui-loop-3');
  });
});