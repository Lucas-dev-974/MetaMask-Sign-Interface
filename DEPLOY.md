# Guide de déploiement sur Vercel

## 🚀 Déploiement rapide

### Option 1 : Via l'interface web (Recommandé)

1. **Prérequis**
   - Un compte GitHub/GitLab/Bitbucket
   - Votre code poussé sur un repository

2. **Étapes**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Sign Up" ou "Log In"
   - Cliquez sur "Add New Project"
   - Importez votre repository
   - Vercel détectera automatiquement Vite
   - Cliquez sur "Deploy"

3. **C'est tout !** Votre app sera déployée en quelques minutes.

### Option 2 : Via la CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer (dans le répertoire du projet)
vercel

# Pour la production
vercel --prod
```

## 📋 Configuration

Le fichier `vercel.json` est déjà configuré avec les bons paramètres :

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## ⚙️ Paramètres recommandés sur Vercel

- **Framework Preset** : Vite
- **Build Command** : `npm run build`
- **Output Directory** : `dist`
- **Install Command** : `npm install`
- **Node.js Version** : 18.x ou supérieur

## 🔧 Variables d'environnement

Si nécessaire, ajoutez des variables d'environnement dans :
- Vercel Dashboard → Project Settings → Environment Variables

Exemple :
- `VITE_API_URL` = `https://api.example.com`
- `VITE_APP_NAME` = `SignEthWallet`

## 🌐 Domaine personnalisé

1. Allez dans Project Settings → Domains
2. Ajoutez votre domaine
3. Configurez les enregistrements DNS selon les instructions

## 📝 Notes importantes

- ✅ Vercel détecte automatiquement Vite
- ✅ Les builds sont automatiques à chaque push
- ✅ Les previews sont créées pour chaque PR
- ✅ HTTPS est activé par défaut
- ✅ Le routing SPA est configuré via les rewrites

## 🐛 Dépannage

### Build échoue

1. Vérifiez les logs de build sur Vercel
2. Testez le build localement : `npm run build`
3. Vérifiez que toutes les dépendances sont dans `package.json`

### L'app ne fonctionne pas après déploiement

1. Vérifiez que `vercel.json` est présent
2. Vérifiez les rewrites pour le routing SPA
3. Vérifiez la console du navigateur pour les erreurs

### Problèmes de dépendances

Si vous utilisez `pnpm` ou `yarn`, vous pouvez configurer :
- **Install Command** : `pnpm install` ou `yarn install`

## 🔗 Liens utiles

- [Documentation Vercel](https://vercel.com/docs)
- [Guide Vite sur Vercel](https://vercel.com/docs/frameworks/vite)
- [Support Vercel](https://vercel.com/support)

