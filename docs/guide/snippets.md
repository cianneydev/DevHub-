# 📝 Snippets

Les snippets sont des **fragments de code** que vous réutilisez souvent.

## 📋 Commandes disponibles

| Commande | Description |
|---|---|
| `devhub snippet add <nom> <code>` | Ajouter un snippet |
| `devhub snippet list` | Lister tous les snippets |
| `devhub snippet remove <nom>` | Supprimer un snippet |

## ➕ Ajouter un snippet

```bash
devhub snippet add hello "console.log('Bonjour !')"
```

**Résultat :**
```
✅ Snippet "hello" ajouté !
ℹ 📁 Stocké dans : /home/user/.devhub/snippets.json
```

## 📋 Lister les snippets

```bash
devhub snippet list
```

**Résultat :**
```
━━━ 2 snippet(s) ━━━

┌────┬────────┬──────────────────────────────┬────────────┐
│ #  │ Nom    │ Code                         │ Date       │
├────┼────────┼──────────────────────────────┼────────────┤
│ 1  │ hello  │ console.log('Bonjour !')     │ 21/09/2026 │
│ 2  │ add    │ function add(a, b) { ... }   │ 21/09/2026 │
└────┴────────┴──────────────────────────────┴────────────┘
```

## 🗑️ Supprimer un snippet

```bash
devhub snippet remove hello
```

## 💡 Astuces

- **Nommez court** : `hello`, `fetch`, `debounce`
- **Code entre guillemets** : `"console.log('test')"`
- **Utilisez `search`** pour retrouver un snippet

## 📂 Stockage

Les snippets sont dans `~/.devhub/snippets.json`.