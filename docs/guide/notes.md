# 📓 Notes

Les notes sont des **mémos texte libre** pour capturer des idées.

## 📋 Commandes disponibles

| Commande | Description |
|---|---|
| `devhub note add <titre> <contenu>` | Ajouter une note |
| `devhub note list` | Lister toutes les notes |
| `devhub note show <titre>` | Afficher une note |
| `devhub note remove <titre>` | Supprimer une note |

## ➕ Ajouter une note

```bash
devhub note add "Idées" "Créer une TUI pour DevHub"
```

## 📋 Lister les notes

```bash
devhub note list
```

## 👁️ Afficher une note

```bash
devhub note show "Idées"
```

## 🗑️ Supprimer une note

```bash
devhub note remove "Idées"
```

## 💡 Différence avec les snippets

| | Snippet | Note |
|---|---|---|
| **Contenu** | Code | Texte libre |
| **Usage** | Réutiliser du code | Mémoriser des idées |

## 📂 Stockage

Les notes sont dans `~/.devhub/notes.json`.