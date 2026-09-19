import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export interface Note {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface StoreData {
  notes: Note[];
}

const DEVHUB_DIR = path.join(os.homedir(), '.devhub');
const STORE_FILE = path.join(DEVHUB_DIR, 'notes.json');

function ensureDir(): void {
  if (!fs.existsSync(DEVHUB_DIR)) {
    fs.mkdirSync(DEVHUB_DIR, { recursive: true });
  }
}

function readStore(): StoreData {
  ensureDir();

  if (!fs.existsSync(STORE_FILE)) {
    return { notes: [] };
  }

  try {
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    return JSON.parse(raw) as StoreData;
  } catch {
    return { notes: [] };
  }
}

function writeStore(data: StoreData): void {
  ensureDir();
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const noteStore = {
  list(): Note[] {
    return readStore().notes;
  },

  add(title: string, content: string): boolean {
    const data = readStore();
    const exists = data.notes.find((n) => n.title === title);

    if (exists) return false;

    const now = new Date().toISOString();
    data.notes.push({
      title,
      content,
      createdAt: now,
      updatedAt: now,
    });

    writeStore(data);
    return true;
  },

  remove(title: string): boolean {
    const data = readStore();
    const index = data.notes.findIndex((n) => n.title === title);

    if (index === -1) return false;

    data.notes.splice(index, 1);
    writeStore(data);
    return true;
  },

  get(title: string): Note | null {
    const data = readStore();
    return data.notes.find((n) => n.title === title) ?? null;
  },

  count(): number {
    return readStore().notes.length;
  },

  getStorePath(): string {
    return STORE_FILE;
  },
};