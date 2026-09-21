# 🔍 Recherche

La commande `search` permet de **retrouver instantanément** un snippet.

## 📋 Commande

```bash
devhub search <motif>
```

## 🎯 Exemples

### Chercher par nom

```bash
devhub search hello
```

### Chercher par contenu

```bash
devhub search "console.log"
```

### Insensible à la casse

```bash
devhub search HELLO
devhub search hello
```

→ **Mêmes résultats.** ✅

## 🚫 Aucun résultat

```bash
devhub search xyz-inexistant
```

**Résultat :**
```
⚠️ Aucun résultat pour "xyz-inexistant"
```

## 💡 Cas d'usage

Vous avez un snippet avec `fetch` mais vous ne vous rappelez plus du nom :

```bash
devhub search fetch
```

## ⚡ Performance

La recherche parcourt **tous les snippets** en mémoire. Même avec **1000+ snippets**, le résultat est **instantané**.