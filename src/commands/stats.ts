import { Command } from 'commander';
import { logger } from '../utils/logger.js';
import { snippetStore } from '../storage/snippetStore.js';
import { noteStore } from '../storage/noteStore.js';
import { printTable } from '../utils/table.js';

export function registerStatsCommand(program: Command): void {
  program
    .command('stats')
    .description('Afficher les statistiques de DevHub')
    .action(() => {
      const snippets = snippetStore.list();
      const notes = noteStore.list();

      const totalSnippetChars = snippets.reduce(
        (sum, s) => sum + s.code.length,
        0
      );
      const totalNoteChars = notes.reduce(
        (sum, n) => sum + n.content.length,
        0
      );

      logger.title('📊 Statistiques DevHub');

      const rows = [
        ['📝 Snippets', String(snippets.length), `${totalSnippetChars} caractères`],
        ['📓 Notes', String(notes.length), `${totalNoteChars} caractères`],
        ['💾 Fichiers', '2', '~/.devhub/'],
      ];

      printTable(['Type', 'Nombre', 'Détails'], rows, {
        colWidths: [16, 10, 30],
      });

      console.log('');

      if (snippets.length > 0) {
        const oldest = snippets.reduce((a, b) =>
          a.createdAt < b.createdAt ? a : b
        );
        logger.info(`Snippet le plus ancien : "${oldest.name}"`);
      }

      if (notes.length > 0) {
        const mostRecent = notes.reduce((a, b) =>
          a.updatedAt > b.updatedAt ? a : b
        );
        logger.info(`Note la plus récente : "${mostRecent.title}"`);
      }

      console.log('');
      logger.info(`📁 Snippets : ${snippetStore.getStorePath()}`);
      logger.info(`📁 Notes    : ${noteStore.getStorePath()}`);
    });
}