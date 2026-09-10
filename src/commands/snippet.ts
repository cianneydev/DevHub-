import { Command } from 'commander';
import { logger } from '../utils/logger.js';

interface Snippet {
  name: string;
  code: string;
  createdAt: string;
}

// Stockage en mémoire (sera remplacé par un fichier plus tard)
const snippets: Snippet[] = [];

export function registerSnippetCommands(program: Command): void {
  const snippet = program
    .command('snippet')
    .description('Gérer vos snippets de code');

  // ➕ Ajouter un snippet
  snippet
    .command('add <name> <code>')
    .description('Ajouter un snippet')
    .action((name: string, code: string) => {
      const exists = snippets.find((s) => s.name === name);

      if (exists) {
        logger.warn(`Le snippet "${name}" existe déjà`);
        return;
      }

      snippets.push({
        name,
        code,
        createdAt: new Date().toISOString(),
      });

      logger.success(`Snippet "${name}" ajouté !`);
    });

  // 📋 Lister les snippets
  snippet
    .command('list')
    .description('Lister tous les snippets')
    .action(() => {
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
      const index = snippets.findIndex((s) => s.name === name);

      if (index === -1) {
        logger.error(`Snippet "${name}" introuvable`);
        return;
      }

      snippets.splice(index, 1);
      logger.success(`Snippet "${name}" supprimé`);
    });
}
