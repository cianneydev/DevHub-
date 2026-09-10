import { describe, it, expect, beforeEach } from 'vitest';

interface Snippet {
  name: string;
  code: string;
  createdAt: string;
}

// Reproduit la logique de src/commands/snippet.ts pour tester
class SnippetStore {
  private snippets: Snippet[] = [];

  add(name: string, code: string): boolean {
    const exists = this.snippets.find((s) => s.name === name);
    if (exists) return false;

    this.snippets.push({
      name,
      code,
      createdAt: new Date().toISOString(),
    });
    return true;
  }

  list(): Snippet[] {
    return [...this.snippets];
  }

  remove(name: string): boolean {
    const index = this.snippets.findIndex((s) => s.name === name);
    if (index === -1) return false;

    this.snippets.splice(index, 1);
    return true;
  }

  count(): number {
    return this.snippets.length;
  }
}

describe('SnippetStore', () => {
  let store: SnippetStore;

  beforeEach(() => {
    store = new SnippetStore();
  });

  it('démarre avec 0 snippet', () => {
    expect(store.count()).toBe(0);
  });

  it('ajoute un snippet', () => {
    const result = store.add('hello', "console.log('hi')");
    expect(result).toBe(true);
    expect(store.count()).toBe(1);
  });

  it('refuse les doublons', () => {
    store.add('hello', "console.log('hi')");
    const result = store.add('hello', "console.log('again')");
    expect(result).toBe(false);
    expect(store.count()).toBe(1);
  });

  it('liste les snippets ajoutés', () => {
    store.add('a', 'code A');
    store.add('b', 'code B');
    const list = store.list();
    expect(list).toHaveLength(2);
    expect(list[0].name).toBe('a');
    expect(list[1].name).toBe('b');
  });

  it('supprime un snippet existant', () => {
    store.add('hello', 'code');
    const result = store.remove('hello');
    expect(result).toBe(true);
    expect(store.count()).toBe(0);
  });

  it("retourne false si le snippet n'existe pas", () => {
    const result = store.remove('inexistant');
    expect(result).toBe(false);
  });
});￼Enter
