import { select, input } from '@inquirer/prompts';
import { logger } from '../utils/logger.js';
import { snippetStore } from '../storage/snippetStore.js';
import { printTable, truncate } from '../utils/table.js';

export async function snippetMenu(): Promise<void> {
  while (true) {
    try {
      const choice = await select({
        message: '📝 Snippets — Que faire ?',
        choices: [
          { name: '📋 Lister tous', value: 'list' },
          { name: '➕ Ajouter', value: 'add' },
          { name: '🗑️  Supprimer', value: 'remove' },
          { name: '🔙 Retour', value: 'back' },
        ],
      });

      if (choice === 'back') return;

      if (choice === 'list') {
        await listSnippets();
      } else if (choice === 'add') {
        await addSnippet();
      } else if (choice === 'remove') {
        await removeSnippet();
      }
    } catch (err) {
      if ((err as Error).name === 'ExitPromptError') return;
      throw err;
    }
  }
}

async function listSnippets(): Promise<void> {
  const snippets = snippetStore.list();

  if (snippets.length === 0) {
    logger.info('Aucun snippet pour le moment.');
    return;
  }

  const rows = snippets.map((s, i) => [
    String(i + 1),
    s.name,
    truncate(s.code, 45),
    new Date(s.createdAt).toLocaleDateString(),
  ]);

  logger.title(`${snippets.length} snippet(s)`);
  printTable(['#', 'Nom', 'Code', 'Date'], rows, {
    colWidths: [4, 18, 47, 12],
  });
}

async function addSnippet(): Promise<void> {
  const name = await input({ message: 'Nom du snippet :' });
  const code = await input({ message: 'Code :' });

  const success = snippetStore.add(name, code);

  if (!success) {
    logger.warn(`Le snippet "${name}" existe déjà`);
    return;
  }

  logger.success(`Snippet "${name}" ajouté !`);
}

async function removeSnippet(): Promise<void> {
  const snippets = snippetStore.list();

  if (snippets.length === 0) {
    logger.info('Aucun snippet à supprimer.');
    return;
  }

  const name = await select({
    message: 'Quel snippet supprimer ?',
    choices: [
      ...snippets.map((s) => ({ name: s.name, value: s.name })),
      { name: '🔙 Annuler', value: '__cancel__' },
    ],
  });

  if (name === '__cancel__') return;

  const success = snippetStore.remove(name);

  if (!success) {
    logger.error(`Snippet "${name}" introuvable`);
    return;
  }

  logger.success(`Snippet "${name}" supprimé`);
}