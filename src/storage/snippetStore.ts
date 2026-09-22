import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export interface Snippet {
  name: string;
  code: string;
  createdAt: string;
}

interface StoreData {
  snippets: Snippet[];
}

const DEVHUB_DIR = path.join(os.homedir(), '.devhub');
const STORE_FILE = path.join(DEVHUB_DIR, 'snippets.json');

function ensureDir(): void {
  if (!fs.existsSync(DEVHUB_DIR)) {
    fs.mkdirSync(DEVHUB_DIR, { recursive: true });
  }
}

function readStore(): StoreData {
  ensureDir();

  if (!fs.existsSync(STORE_FILE)) {
    return { snippets: [] };
  }

  try {
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    return JSON.parse(raw) as StoreData;
  } catch {
    return { snippets: [] };
  }
}

function writeStore(data: StoreData): void {
  ensureDir();
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const snippetStore = {
  list(): Snippet[] {
    return readStore().snippets;
  },

  add(name: string, code: string): boolean {
    const data = readStore();
    const exists = data.snippets.find((s) => s.name === name);

    if (exists) return false;

    data.snippets.push({
      name,
      code,
      createdAt: new Date().toISOString(),
    });

    writeStore(data);
    return true;
  },

  remove(name: string): boolean {
    const data = readStore();
    const index = data.snippets.findIndex((s) => s.name === name);

    if (index === -1) return false;

    data.snippets.splice(index, 1);
    writeStore(data);
    return true;
  },

  get(name: string): Snippet | null {
    const data = readStore();
    return data.snippets.find((s) => s.name === name) ?? null;
  },

get(name: string): Snippet | null {
  const data = readStore();
  return data.snippets.find((s) => s.name === name) ?? null;
},

  count(): number {
    return readStore().snippets.length;
  },

  getStorePath(): string {
    return STORE_FILE;
  },
};