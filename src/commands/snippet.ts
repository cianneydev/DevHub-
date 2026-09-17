import { Command } from 'commander';
import { logger } from '../utils/logger.js';
import { snippetStore } from '../storage/snippetStore.js';

export function registerSnippetCommands(program: Command): void {
  const snippet = program
    .command('snippet')
    .description('Gérer vos snippets de code');

  // ➕ Ajouter un snippet
  snippet
    .command('add <name> <code>')
    .description('Ajouter un snippet')
    .action((name: string, code: string) => {
      const success = snippetStore.add(name, code);

      if (!success) {
        logger.warn(`Le snippet "${name}" existe déjà`);
        return;
      }

      logger.success(`Snippet "${name}" ajouté !`);
      logger.info(`📁 Stocké dans : ${snippetStore.getStorePath()}`);
    });

  // 📋 Lister les snippets
  snippet
    .command('list')
    .description('Lister tous les snippets')
    .action(() => {
      const snippets = snippetStore.list();

      if (snippets.length === 0) {
        logger.info('Aucun snippet pour le moment.');
        return;
      }

      logger.title(`${snippets.length} snippet(s)`);
      snippets.forEach((s, i) => {
        console.log(`  ${i + 1}. ${s.name}`);
        console.log(`     ${s.code}`);
      });
    });

  // 🗑️ Supprimer un snippet
  snippet
    .command('remove <name>')
    .description('Supprimer un snippet')
    .action((name: string) => {
      const success = snippetStore.remove(name);

      if (!success) {
        logger.error(`Snippet "${name}" introuvable`);
        return;
      }

      logger.success(`Snippet "${name}" supprimé`);
    });
}