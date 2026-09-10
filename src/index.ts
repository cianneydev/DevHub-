#!/usr/bin/env node
import { Command } from 'commander';
import { registerSnippetCommands } from './commands/snippet.js';

const program = new Command();

program
  .name('devhub')
  .description('Le hub central du développeur moderne — CLI tout-en-un')
  .version('0.1.0');

registerSnippetCommands(program);

program.parse(process.argv);
