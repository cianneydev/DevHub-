import { Command } from 'commander';
import { logger } from '../utils/logger.js';
import { snippetStore } from '../storage/snippetStore.js';

export function registerSearchCommand(program: Command): void {
  program
    .command('search <query>')
    .description('Rechercher dans les snippets (nom et code)')
    .action((query: string) => {
      const snippets = snippetStore.list();

      if (snippets.length === 0) {
        logger.info('Aucun snippet enregistré.');
        return;
      }

      const lowerQuery = query.toLowerCase();

      const matches = snippets.filter(
        (s) =>
          s.name.toLowerCase().includes(lowerQuery) ||
          s.code.toLowerCase().includes(lowerQuery)
      );

      if (matches.length === 0) {
        logger.warn(`Aucun résultat pour "${query}"`);
        return;
      }

      logger.title(`${matches.length} résultat(s) pour "${query}"`);

      matches.forEach((s, i) => {
        console.log(`  ${i + 1}. ${s.name}`);
        console.log(`     ${s.code}`);
        console.log(`     📅 ${new Date(s.createdAt).toLocaleDateString()}`);
        console.log('');
      });
    });
}
