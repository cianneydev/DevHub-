import { select } from '@inquirer/prompts';
import { logger } from '../utils/logger.js';
import { snippetMenu } from './snippetMenu.js';
import { noteMenu } from './noteMenu.js';
import { snippetStore } from '../storage/snippetStore.js';
import { noteStore } from '../storage/noteStore.js';

export async function mainMenu(): Promise<void> {
  while (true) {
    try {
      const choice = await select({
        message: '🚀 DevHub — Que voulez-vous faire ?',
        choices: [
          {
            name: `📝 Snippets (${snippetStore.count()})`,
            value: 'snippets',
          },
          {
            name: `📓 Notes (${noteStore.count()})`,
            value: 'notes',
          },
          {
            name: '📊 Statistiques',
            value: 'stats',
          },
          {
            name: '❌ Quitter',
            value: 'quit',
          },
        ],
      });

      if (choice === 'quit') {
        logger.info('👋 À bientôt !');
        return;
      }

      if (choice === 'snippets') {
        await snippetMenu();
      } else if (choice === 'notes') {
        await noteMenu();
      } else if (choice === 'stats') {
        showStats();
      }
    } catch (err) {
      if ((err as Error).name === 'ExitPromptError') {
        logger.info('👋 À bientôt !');
        return;
      }
      throw err;
    }
  }
}

function showStats(): void {
  const snippets = snippetStore.list();
  const notes = noteStore.list();

  logger.title('📊 Statistiques');
  console.log(`📝 Snippets   : ${snippets.length}`);
  console.log(`📓 Notes      : ${notes.length}`);
  console.log('');
}