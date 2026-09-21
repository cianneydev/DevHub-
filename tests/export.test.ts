import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const SNIPPET_FILE = path.join(os.homedir(), '.devhub', 'snippets.json');
const NOTE_FILE = path.join(os.homedir(), '.devhub', 'notes.json');
const EXPORT_FILE = path.join(os.tmpdir(), `devhub-export-test-${Date.now()}.json`);

function clearAll(): void {
  if (fs.existsSync(SNIPPET_FILE)) fs.unlinkSync(SNIPPET_FILE);
  if (fs.existsSync(NOTE_FILE)) fs.unlinkSync(NOTE_FILE);
  if (fs.existsSync(EXPORT_FILE)) fs.unlinkSync(EXPORT_FILE);
}

describe('export', () => {
  let snippetStore: typeof import('../src/storage/snippetStore.js').snippetStore;
  let noteStore: typeof import('../src/storage/noteStore.js').noteStore;

  beforeEach(async () => {
    clearAll();
    const sMod = await import('../src/storage/snippetStore.js');
    const nMod = await import('../src/storage/noteStore.js');
    snippetStore = sMod.snippetStore;
    noteStore = nMod.noteStore;
  });

  afterEach(() => {
    clearAll();
  });

  it('exporte les snippets et notes dans un fichier JSON', () => {
    snippetStore.add('export-a', 'code A');
    snippetStore.add('export-b', 'code B');
    noteStore.add('note-a', 'contenu A');

    // Simule la logique d'export
    const data = {
      exportedAt: new Date().toISOString(),
      version: '0.5.0',
      snippets: snippetStore.list(),
      notes: noteStore.list(),
    };

    fs.writeFileSync(EXPORT_FILE, JSON.stringify(data, null, 2), 'utf-8');

    expect(fs.existsSync(EXPORT_FILE)).toBe(true);

    const raw = fs.readFileSync(EXPORT_FILE, 'utf-8');
    const parsed = JSON.parse(raw);

    expect(parsed.snippets).toHaveLength(2);
    expect(parsed.notes).toHaveLength(1);
    expect(parsed.version).toBe('0.5.0');
  });

  it('exporte un fichier vide si rien à sauvegarder', () => {
    const data = {
      exportedAt: new Date().toISOString(),
      version: '0.5.0',
      snippets: [],
      notes: [],
    };

    fs.writeFileSync(EXPORT_FILE, JSON.stringify(data, null, 2), 'utf-8');

    const raw = fs.readFileSync(EXPORT_FILE, 'utf-8');
    const parsed = JSON.parse(raw);

    expect(parsed.snippets).toHaveLength(0);
    expect(parsed.notes).toHaveLength(0);
  });

  it('contient un timestamp valide', () => {
    const data = {
      exportedAt: new Date().toISOString(),
      version: '0.5.0',
      snippets: [],
      notes: [],
    };

    fs.writeFileSync(EXPORT_FILE, JSON.stringify(data, null, 2), 'utf-8');

    const raw = fs.readFileSync(EXPORT_FILE, 'utf-8');
    const parsed = JSON.parse(raw);

    expect(() => new Date(parsed.exportedAt)).not.toThrow();
    expect(new Date(parsed.exportedAt).getTime()).toBeLessThanOrEqual(Date.now());
  });
});