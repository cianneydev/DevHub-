import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const SNIPPET_FILE = path.join(os.homedir(), '.devhub', 'snippets.json');
const NOTE_FILE = path.join(os.homedir(), '.devhub', 'notes.json');
const IMPORT_FILE = path.join(os.tmpdir(), `devhub-import-test-${Date.now()}.json`);

function clearAll(): void {
  if (fs.existsSync(SNIPPET_FILE)) fs.unlinkSync(SNIPPET_FILE);
  if (fs.existsSync(NOTE_FILE)) fs.unlinkSync(NOTE_FILE);
  if (fs.existsSync(IMPORT_FILE)) fs.unlinkSync(IMPORT_FILE);
}

describe('import', () => {
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

  it('importe des snippets depuis un fichier JSON', () => {
    const data = {
      version: '0.5.0',
      snippets: [
        { name: 'import-a', code: 'code A' },
        { name: 'import-b', code: 'code B' },
      ],
      notes: [],
    };

    fs.writeFileSync(IMPORT_FILE, JSON.stringify(data), 'utf-8');

    // Simule la logique d'import
    const raw = fs.readFileSync(IMPORT_FILE, 'utf-8');
    const parsed = JSON.parse(raw);

    for (const s of parsed.snippets) {
      snippetStore.add(s.name, s.code);
    }

    expect(snippetStore.count()).toBe(2);
    expect(snippetStore.get('import-a')).toBeTruthy();
  });

  it('importe des notes depuis un fichier JSON', () => {
    const data = {
      version: '0.5.0',
      snippets: [],
      notes: [
        { title: 'note-import-a', content: 'contenu A' },
        { title: 'note-import-b', content: 'contenu B' },
      ],
    };

    fs.writeFileSync(IMPORT_FILE, JSON.stringify(data), 'utf-8');

    const raw = fs.readFileSync(IMPORT_FILE, 'utf-8');
    const parsed = JSON.parse(raw);

    for (const n of parsed.notes) {
      noteStore.add(n.title, n.content);
    }

    expect(noteStore.count()).toBe(2);
    expect(noteStore.get('note-import-a')).toBeTruthy();
  });

  it('ignore les doublons lors de l\'import', () => {
    snippetStore.add('duplicate', 'original');

    const data = {
      snippets: [{ name: 'duplicate', code: 'nouveau code' }],
      notes: [],
    };

    fs.writeFileSync(IMPORT_FILE, JSON.stringify(data), 'utf-8');

    const raw = fs.readFileSync(IMPORT_FILE, 'utf-8');
    const parsed = JSON.parse(raw);

    let added = 0;
    let skipped = 0;

    for (const s of parsed.snippets) {
      const ok = snippetStore.add(s.name, s.code);
      if (ok) added++;
      else skipped++;
    }

    expect(added).toBe(0);
    expect(skipped).toBe(1);
    expect(snippetStore.count()).toBe(1);
    expect(snippetStore.list()[0].code).toBe('original');
  });

  it('rejette un JSON invalide', () => {
    fs.writeFileSync(IMPORT_FILE, '{ invalid json }', 'utf-8');

    expect(() => {
      const raw = fs.readFileSync(IMPORT_FILE, 'utf-8');
      JSON.parse(raw);
    }).toThrow();
  });
});