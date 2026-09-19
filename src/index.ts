#!/usr/bin/env node
import { Command } from 'commander';
import { registerSnippetCommands } from './commands/snippet.js';
import { registerSearchCommand } from './commands/search.js';
import { registerNoteCommands } from './commands/note.js';
import { registerStatsCommand } from './commands/stats.js';
import { registerExportCommand } from './commands/export.js';
import { registerImportCommand } from './commands/import.js';
import { registerUiCommand } from './commands/ui.js';

const program = new Command();

program
  .name('devhub')
  .description('Le hub central du développeur moderne — CLI tout-en-un')
  .version('0.5.0');

registerSnippetCommands(program);
registerSearchCommand(program);
registerNoteCommands(program);
registerStatsCommand(program);
registerExportCommand(program);
registerImportCommand(program);
registerUiCommand(program);

program.parse(process.argv);