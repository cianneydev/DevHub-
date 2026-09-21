import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'DevHub',
  description: 'Le hub central du développeur moderne — CLI tout-en-un',

  base: '/DevHub-/',

  ignoreDeadLinks: true,

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'GitHub', link: 'https://github.com/cianneydev/DevHub-' },
    ],

    sidebar: [
      {
        text: '🚀 Démarrage',
        items: [
          { text: 'Installation', link: '/guide/getting-started' },
        ],
      },
      {
        text: '📚 Commandes',
        items: [
          { text: 'Snippets', link: '/guide/snippets' },
          { text: 'Notes', link: '/guide/notes' },
          { text: 'Recherche', link: '/guide/search' },
          { text: 'Avancé', link: '/guide/advanced' },
          { text: 'Interface TUI', link: '/guide/ui' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cianneydev/DevHub-' },
    ],

    footer: {
      message: 'Publié sous licence MIT',
      copyright: 'Copyright © 2026 cianneydev',
    },

    search: {
      provider: 'local',
    },
  },
});