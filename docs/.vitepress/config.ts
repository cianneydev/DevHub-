import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'DevHub',
  description: 'Le hub central du développeur moderne — CLI tout-en-un',

  base: '/devhub/',

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'GitHub', link: 'https://github.com/cianneydev/devhub' },
    ],

    sidebar: [
      {
  text: '📚 Commandes',
  items: [
    { text: 'Snippets', link: '/guide/snippets' },
    { text: 'Notes', link: '/guide/notes' },
    { text: 'Recherche', link: '/guide/search' },
    { text: 'Avancé', link: '/guide/advanced' },
  ],
},

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cianneydev/devhub' },
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