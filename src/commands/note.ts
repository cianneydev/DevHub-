import { Command } from 'commander';
import { logger } from '../utils/logger.js';
import { noteStore } from '../storage/noteStore.js';
import { printTable, truncate } from '../utils/table.js';

export function registerNoteCommands(program: Command): void {
  const note = program.command('note').description('Gérer vos notes');

  // ➕ Ajouter
  note
    .command('add <title> <content>')
    .description('Ajouter une note')
    .action((title: string, content: string) => {
      const success = noteStore.add(title, content);

      if (!success) {
        logger.warn(`La note "${title}" existe déjà`);
        return;
      }

      logger.success(`Note "${title}" ajoutée !`);
      logger.info(`📁 Stocké dans : ${noteStore.getStorePath()}`);
    });

  // 📋 Lister
  note
    .command('list')
    .description('Lister toutes les notes')
    .action(() => {
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
    });

  // 👁️ Afficher
  note
    .command('show <title>')
    .description('Afficher une note complète')
    .action((title: string) => {
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
    });

  // 🗑️ Supprimer
  note
    .command('remove <title>')
    .description('Supprimer une note')
    .action((title: string) => {
      const success = noteStore.remove(title);

      if (!success) {
        logger.error(`Note "${title}" introuvable`);
        return;
      }

      logger.success(`Note "${title}" supprimée`);
    });
}