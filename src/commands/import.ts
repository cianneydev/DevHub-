import { Command } from 'commander';
import fs from 'node:fs';
import { logger } from '../utils/logger.js';
import { snippetStore } from '../storage/snippetStore.js';
import { noteStore } from '../storage/noteStore.js';

interface ImportData {
  exportedAt?: string;
  version?: string;
  snippets?: Array<{ name: string; code: string }>;
  notes?: Array<{ title: string; content: string }>;
}

export function registerImportCommand(program: Command): void {
  program
    .command('import <file>')
    .description('Importer snippets et notes depuis un fichier JSON')
    .action((file: string) => {
      if (!fs.existsSync(file)) {
        logger.error(`Fichier introuvable : ${file}`);
        return;
      }

      let data: ImportData;

      try {
        const raw = fs.readFileSync(file, 'utf-8');
        data = JSON.parse(raw) as ImportData;
      } catch (err) {
        logger.error(`JSON invalide : ${(err as Error).message}`);
        return;
      }

      let addedSnippets = 0;
      let skippedSnippets = 0;
      let addedNotes = 0;
      let skippedNotes = 0;

      if (data.snippets && Array.isArray(data.snippets)) {
        for (const s of data.snippets) {
          const ok = snippetStore.add(s.name, s.code);
          if (ok) addedSnippets++;
          else skippedSnippets++;
        }
      }

      if (data.notes && Array.isArray(data.notes)) {
        for (const n of data.notes) {
          const ok = noteStore.add(n.title, n.content);
          if (ok) addedNotes++;
          else skippedNotes++;
        }
      }

      logger.success(`Import terminé :`);
      logger.info(
        `📝 Snippets : ${addedSnippets} ajouté(s), ${skippedSnippets} ignoré(s)`
      );
      logger.info(
        `📓 Notes    : ${addedNotes} ajoutée(s), ${skippedNotes} ignorée(s)`
      );
    });
}