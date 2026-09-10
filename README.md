# 🚀 DevHub

> Le hub central du développeur moderne — CLI tout-en-un

[![CI](https://github.com/cianneydev/devhub/actions/workflows/ci.yml/badge.svg)](https://github.com/cianneydev/devhub/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)

## ✨ Fonctionnalités

- 📝 **Snippets** — Sauvegardez et retrouvez vos bouts de code
- 🔍 **Recherche rapide** — Retrouvez tout instantanément
- 🛠️ **Extensible** — Ajoutez vos propres commandes
- ⚡ **Léger** — Zéro dépendance superflue
- 🌍 **Open Source** — MIT, contributions bienvenues

## 📦 Installation

```bash
# Via npm (bientôt disponible)
npm install -g devhub

# Ou depuis les sources
git clone https://github.com/cianneydev/devhub.git
cd devhub
npm install
npm run build
npm link1Enter
# Ajouter un snippet
devhub snippet add mon-snippet "console.log('hello')"

# Lister tous les snippets
devhub snippet list

# Voir l'aide
devhub --help
