import { Command } from 'commander';
import fs from 'node:fs';
import { logger } from '../utils/logger.js';
import { snippetStore } from '../storage/snippetStore.js';
import { noteStore } from '../storage/noteStore.js';

export function registerExportCommand(program: Command): void {
  program
    .command('export <file>')
    .description('Exporter snippets et notes dans un fichier JSON')
    .action((file: string) => {
      const snippets = snippetStore.list();
      const notes = noteStore.list();

      if (snippets.length === 0 && notes.length === 0) {
        logger.warn('Rien à exporter.');
        return;
      }

      const data = {
        exportedAt: new Date().toISOString(),
        version: '0.4.0',
        snippets,
        notes,
      };

      try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
        logger.success(`Export réussi : ${file}`);
        logger.info(`📝 ${snippets.length} snippet(s)`);
        logger.info(`📓 ${notes.length} note(s)`);
      } catch (err) {
        logger.error(`Erreur d'écriture : ${(err as Error).message}`);
      }
    });
}