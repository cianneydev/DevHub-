import { select, input } from '@inquirer/prompts';
import { logger } from '../utils/logger.js';
import { noteStore } from '../storage/noteStore.js';
import { printTable, truncate } from '../utils/table.js';

export async function noteMenu(): Promise<void> {
  while (true) {
    try {
      const choice = await select({
        message: '📓 Notes — Que faire ?',
        choices: [
          { name: '📋 Lister toutes', value: 'list' },
          { name: '➕ Ajouter', value: 'add' },
          { name: '👁️  Afficher', value: 'show' },
          { name: '🗑️  Supprimer', value: 'remove' },
          { name: '🔙 Retour', value: 'back' },
        ],
      });

      if (choice === 'back') return;

      if (choice === 'list') {
        await listNotes();
      } else if (choice === 'add') {
        await addNote();
      } else if (choice === 'show') {
        await showNote();
      } else if (choice === 'remove') {
        await removeNote();
      }
    } catch (err) {
      if ((err as Error).name === 'ExitPromptError') return;
      throw err;
    }
  }
}

async function listNotes(): Promise<void> {
  const notes = noteStore.list();

  if (notes.length === 0) {
    logger.info('Aucune note pour le moment.');
    return;
  }

  const rows = notes.map((n, i) => [
    String(i + 1),
    n.title,
    truncate(n.content, 40),
    new Date(n.createdAt).toLocaleDateString(),
  ]);

  logger.title(`${notes.length} note(s)`);
  printTable(['#', 'Titre', 'Contenu', 'Date'], rows, {
    colWidths: [4, 20, 42, 12],
  });
}

async function addNote(): Promise<void> {
  const title = await input({ message: 'Titre de la note :' });
  const content = await input({ message: 'Contenu :' });

  const success = noteStore.add(title, content);

  if (!success) {
    logger.warn(`La note "${title}" existe déjà`);
    return;
  }

  logger.success(`Note "${title}" ajoutée !`);
}

async function showNote(): Promise<void> {
  const notes = noteStore.list();

  if (notes.length === 0) {
    logger.info('Aucune note à afficher.');
    return;
  }

  const title = await select({
    message: 'Quelle note afficher ?',
    choices: notes.map((n) => ({ name: n.title, value: n.title })),
  });

  const n = noteStore.get(title);

  if (!n) {
    logger.error(`Note "${title}" introuvable`);
    return;
  }

  logger.title(n.title);
  console.log(n.content);
  console.log('');
  console.log(`📅 Créée le     : ${new Date(n.createdAt).toLocaleString()}`);
  console.log(`🔄 Modifiée le  : ${new Date(n.updatedAt).toLocaleString()}`);
}

async function removeNote(): Promise<void> {
  const notes = noteStore.list();

  if (notes.length === 0) {
    logger.info('Aucune note à supprimer.');
    return;
  }

  const title = await select({
    message: 'Quelle note supprimer ?',
    choices: [
      ...notes.map((n) => ({ name: n.title, value: n.title })),
      { name: '🔙 Annuler', value: '__cancel__' },
    ],
  });

  if (title === '__cancel__') return;

  const success = noteStore.remove(title);

  if (!success) {
    logger.error(`Note "${title}" introuvable`);
    return;
  }

  logger.success(`Note "${title}" supprimée`);
}