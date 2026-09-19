import { Command } from 'commander';
import { mainMenu } from '../ui/menu.js';

export function registerUiCommand(program: Command): void {
  program
    .command('ui')
    .description('Lancer l\'interface interactive (TUI)')
    .action(async () => {
      await mainMenu();
    });
}