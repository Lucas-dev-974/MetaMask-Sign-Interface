# SignEthWallet

Application web moderne pour signer des messages avec un wallet Ethereum (MetaMask). Cette application permet de prouver la possession d'un wallet en signant des messages cryptographiquement sécurisés.

## 🌐 Application en ligne

**🔗 [Accéder à l'application](https://meta-mask-sign-interface.vercel.app/)**

L'application est déployée et accessible en ligne sur Vercel.

## 🚀 Fonctionnalités

- **Connexion Wallet** : Connexion sécurisée via MetaMask ou tout wallet compatible EIP-1193
- **Signature de messages** : Signez n'importe quel message pour prouver la possession de votre wallet
- **Historique** : Conservez un historique de toutes vos signatures (jusqu'à 50 messages)
- **Multi-langue** : Interface disponible en français et en anglais
- **Interface moderne** : Design élégant avec TailwindCSS
- **Responsive** : Fonctionne sur tous les appareils

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- Un wallet Ethereum installé (MetaMask recommandé)
- Un navigateur moderne (Chrome, Firefox, Edge, Safari)

## 🛠️ Installation

1. Clonez le repository :
```bash
git clone <repository-url>
cd SignEthWallet
```

2. Installez les dépendances :
```bash
npm install
# ou
pnpm install
# ou
yarn install
```

## 🎯 Utilisation

### Mode développement

Lancez le serveur de développement :
```bash
npm run dev
# ou
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Build de production

Créez une version optimisée pour la production :
```bash
npm run build
```

Les fichiers seront générés dans le dossier `dist/`.

### Prévisualisation du build

Pour prévisualiser le build de production :
```bash
npm run serve
```

## 🚀 Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandé)

1. **Préparer le repository**
   - Assurez-vous que votre code est poussé sur GitHub, GitLab ou Bitbucket
   - Vérifiez que le fichier `vercel.json` est présent dans le projet

2. **Créer un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Créez un compte ou connectez-vous

3. **Importer le projet**
   - Cliquez sur "Add New Project"
   - Importez votre repository Git
   - Vercel détectera automatiquement les paramètres (Vite)

4. **Configurer le projet**
   - **Framework Preset** : Vite (détecté automatiquement)
   - **Build Command** : `npm run build` (déjà configuré dans vercel.json)
   - **Output Directory** : `dist` (déjà configuré dans vercel.json)
   - **Install Command** : `npm install` (déjà configuré dans vercel.json)

5. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez la fin du build (quelques minutes)
   - Votre application sera accessible via une URL Vercel

### Méthode 2 : Via la CLI Vercel

1. **Installer la CLI Vercel**
   ```bash
   npm install -g vercel
   ```

2. **Se connecter à Vercel**
   ```bash
   vercel login
   ```

3. **Déployer depuis le répertoire du projet**
   ```bash
   vercel
   ```

4. **Pour un déploiement en production**
   ```bash
   vercel --prod
   ```

### Configuration automatique

Le fichier `vercel.json` est déjà configuré avec :
- ✅ Build command : `npm run build`
- ✅ Output directory : `dist`
- ✅ Framework : Vite
- ✅ Rewrites pour le routing SPA

### Variables d'environnement

Si vous avez besoin de variables d'environnement :
1. Allez dans les paramètres du projet sur Vercel
2. Section "Environment Variables"
3. Ajoutez vos variables (ex: `VITE_API_URL`, etc.)

### Domaine personnalisé

Pour ajouter un domaine personnalisé :
1. Allez dans les paramètres du projet
2. Section "Domains"
3. Ajoutez votre domaine
4. Suivez les instructions DNS

### Déploiements automatiques

Vercel déploie automatiquement :
- ✅ Chaque push sur `main` → Production
- ✅ Chaque pull request → Preview deployment
- ✅ Chaque branche → Preview deployment

## 📖 Guide d'utilisation

1. **Connecter votre wallet** :
   - Cliquez sur "Se connecter à MetaMask"
   - Autorisez la connexion dans MetaMask
   - Votre adresse et votre balance s'afficheront

2. **Signer un message** :
   - Entrez le message que vous souhaitez signer dans le champ texte
   - Cliquez sur "Signer le message"
   - Confirmez la signature dans MetaMask
   - La signature hexadécimale sera générée et sauvegardée

3. **Consulter l'historique** :
   - Cliquez sur "Afficher" dans la section Historique
   - Consultez toutes vos signatures précédentes
   - Copiez les signatures ou messages si nécessaire
   - Supprimez des entrées individuelles ou tout l'historique

4. **Changer de langue** :
   - Utilisez le sélecteur de langue en haut à droite
   - Choisissez entre français et anglais

## 🏗️ Architecture

Le projet est structuré de la manière suivante :

```
src/
├── components/      # Composants UI réutilisables
│   ├── Alert.tsx
│   ├── Button.tsx
│   ├── ConnectButton.tsx
│   ├── History.tsx
│   ├── LanguageSelector.tsx
│   ├── MetaMaskWarning.tsx
│   ├── SignMessage.tsx
│   └── WalletInfo.tsx
├── hooks/          # Hooks personnalisés SolidJS
│   ├── useSignatures.ts
│   └── useWallet.ts
├── i18n/           # Internationalisation
│   ├── context.tsx
│   └── translations.ts
├── services/       # Services métier
│   ├── ethereum.ts
│   └── storage.ts
├── types/          # Définitions TypeScript
│   └── index.ts
├── utils/          # Fonctions utilitaires
│   ├── clipboard.ts
│   └── formatters.ts
├── App.tsx         # Composant principal
├── index.tsx       # Point d'entrée
└── index.css       # Styles globaux
```

## 🔧 Technologies utilisées

- **SolidJS** : Framework réactif moderne et performant
- **TypeScript** : Typage statique pour une meilleure sécurité
- **Vite** : Build tool rapide et moderne
- **TailwindCSS** : Framework CSS utilitaire
- **EIP-1193** : Standard pour l'interaction avec les wallets Ethereum

## 🔒 Sécurité

- ✅ Validation stricte des adresses Ethereum
- ✅ Validation des messages avant signature
- ✅ Gestion sécurisée des erreurs
- ✅ Aucune clé privée n'est stockée ou transmise
- ✅ Conformité avec les standards EIP-1193

## 📝 Notes importantes

- Les signatures sont stockées localement dans le navigateur (localStorage)
- L'historique est limité à 50 messages par adresse
- Les signatures sont uniques et prouvent la possession du wallet
- L'application fonctionne uniquement avec des wallets compatibles EIP-1193

## 🐛 Dépannage

### MetaMask n'est pas détecté
- Assurez-vous que MetaMask est installé et activé
- Rafraîchissez la page après l'installation
- Vérifiez que MetaMask est déverrouillé

### La connexion échoue
- Vérifiez que MetaMask est déverrouillé
- Autorisez l'accès au site dans les paramètres MetaMask
- Essayez de vous reconnecter

### La signature échoue
- Vérifiez que votre wallet est connecté
- Assurez-vous que le message n'est pas vide
- Vérifiez que vous confirmez la transaction dans MetaMask

## 📄 Licence

MIT

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 🔗 Liens utiles

- [SolidJS Documentation](https://www.solidjs.com/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [EIP-1193 Specification](https://eips.ethereum.org/EIPS/eip-1193)
