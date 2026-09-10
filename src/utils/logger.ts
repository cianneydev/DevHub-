here/**
 * Logger simple pour DevHub
 * Affiche des messages colorés dans le terminal
 */

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

export const logger = {
  /**
   * Message d'information (cyan)
   */
  info(message: string): void {
    console.log(`${colors.cyan}ℹ${colors.reset} ${message}`);
  },

  /**
   * Message de succès (vert)
   */
  success(message: string): void {
    console.log(`${colors.green}✅${colors.reset} ${message}`);
  },

  /**
   * Message d'avertissement (jaune)
   */
  warn(message: string): void {
    console.log(`${colors.yellow}⚠️${colors.reset}  ${message}`);
  },

  /**
   * Message d'erreur (rouge)
   */
  error(message: string): void {
    console.error(`${colors.red}❌${colors.reset} ${message}`);
  },

  /**
   * Message de debug (gris)
   */
  debug(message: string): void {
    console.log(`${colors.gray}🐛 ${message}${colors.reset}`);
  },

  /**
   * Titre de section (magenta)
   */
  title(message: string): void {
    console.log(`\n${colors.magenta}━━━ ${message} ━━━${colors.reset}\n`);
  },
};
