export type Language = 'fr' | 'en';

export interface Translations {
  app: {
    title: string;
    subtitle: string;
    subtitleConnected: string;
  };
  wallet: {
    connect: string;
    connecting: string;
    connected: string;
    disconnect: string;
    address: string;
    balance: string;
    chainId: string;
    network: string;
  };
  errors: {
    metamaskNotInstalled: string;
    metamaskNotInstalledLink: string;
    metamaskNotDetected: string;
    connectionRefused: string;
    connectionError: string;
    walletNotConnected: string;
    messageRequired: string;
    signatureRefused: string;
    signatureError: string;
  };
  signature: {
    title: string;
    messageLabel: string;
    messagePlaceholder: string;
    signButton: string;
    signing: string;
    success: string;
    copy: string;
    signatureHex: string;
    signatureProof: string;
    show: string;
    hide: string;
  };
  history: {
    title: string;
    show: string;
    hide: string;
    clearAll: string;
    empty: string;
    copySignature: string;
    copyMessage: string;
    delete: string;
    viewFullSignature: string;
    clearConfirm: string;
  };
  verification: {
    title: string;
    messageLabel: string;
    messagePlaceholder: string;
    signatureLabel: string;
    signaturePlaceholder: string;
    addressLabel: string;
    addressPlaceholder: string;
    verifyButton: string;
    verifying: string;
    clear: string;
    allFieldsRequired: string;
    validSignature: string;
    invalidSignature: string;
    success: string;
    invalid: string;
    error: string;
    show: string;
    hide: string;
  };
  toast: {
    copied: string;
    signatureSaved: string;
    messageDeleted: string;
    historyCleared: string;
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    app: {
      title: 'MetaMask Wallet',
      subtitle: 'Connectez-vous à votre wallet MetaMask',
      subtitleConnected: 'Connecté à MetaMask',
    },
    wallet: {
      connect: 'Se connecter à MetaMask',
      connecting: 'Connexion...',
      connected: '✓ Connecté',
      disconnect: 'Déconnecter',
      address: 'Adresse du wallet',
      balance: 'Balance',
      chainId: 'Chain ID',
      network: 'Réseau',
    },
    errors: {
      metamaskNotInstalled: "MetaMask n'est pas installé. Veuillez l'installer depuis https://metamask.io/",
      metamaskNotInstalledLink: 'MetaMask',
      metamaskNotDetected: "MetaMask n'est pas détecté. Veuillez installer",
      connectionRefused: 'Connexion refusée par l\'utilisateur',
      connectionError: 'Erreur lors de la connexion',
      walletNotConnected: 'Wallet non connecté',
      messageRequired: 'Veuillez entrer un message à signer',
      signatureRefused: 'Signature refusée par l\'utilisateur',
      signatureError: 'Erreur lors de la signature',
    },
    signature: {
      title: 'Signature de message',
      messageLabel: 'Message à signer',
      messagePlaceholder: 'Entrez un message pour prouver la possession de votre wallet...',
      signButton: 'Signer le message',
      signing: 'Signature en cours...',
      success: '✓ Signature générée et sauvegardée',
      copy: 'Copier',
      signatureHex: 'Signature (hex):',
      signatureProof: 'Cette signature prouve que vous êtes le détenteur de ce wallet.',
      show: 'Afficher',
      hide: 'Masquer',
    },
    history: {
      title: 'Historique des signatures',
      show: 'Afficher',
      hide: 'Masquer',
      clearAll: 'Tout supprimer',
      empty: 'Aucune signature sauvegardée',
      copySignature: 'Copier signature',
      copyMessage: 'Copier message',
      delete: 'Supprimer',
      viewFullSignature: 'Voir la signature complète',
      clearConfirm: 'Êtes-vous sûr de vouloir supprimer tout l\'historique des signatures ?',
    },
    verification: {
      title: 'Vérification de signature',
      messageLabel: 'Message original',
      messagePlaceholder: 'Entrez le message original...',
      signatureLabel: 'Signature',
      signaturePlaceholder: 'Entrez la signature hexadécimale (0x...)',
      addressLabel: 'Adresse Ethereum',
      addressPlaceholder: '0x...',
      verifyButton: 'Vérifier',
      verifying: 'Vérification...',
      clear: 'Effacer',
      allFieldsRequired: 'Tous les champs sont requis',
      validSignature: '✓ Signature valide ! Cette signature correspond à l\'adresse et au message.',
      invalidSignature: '✗ Signature invalide. La signature ne correspond pas à l\'adresse ou au message.',
      success: 'Signature vérifiée avec succès',
      invalid: 'Signature invalide',
      error: 'Erreur lors de la vérification',
      show: 'Afficher',
      hide: 'Masquer',
    },
    toast: {
      copied: 'Copié dans le presse-papiers',
      signatureSaved: 'Signature sauvegardée',
      messageDeleted: 'Message supprimé',
      historyCleared: 'Historique supprimé',
    },
  },
  en: {
    app: {
      title: 'MetaMask Wallet',
      subtitle: 'Connect to your MetaMask wallet',
      subtitleConnected: 'Connected to MetaMask',
    },
    wallet: {
      connect: 'Connect to MetaMask',
      connecting: 'Connecting...',
      connected: '✓ Connected',
      disconnect: 'Disconnect',
      address: 'Wallet address',
      balance: 'Balance',
      chainId: 'Chain ID',
      network: 'Network',
    },
    errors: {
      metamaskNotInstalled: 'MetaMask is not installed. Please install it from https://metamask.io/',
      metamaskNotInstalledLink: 'MetaMask',
      metamaskNotDetected: 'MetaMask is not detected. Please install',
      connectionRefused: 'Connection refused by user',
      connectionError: 'Error connecting',
      walletNotConnected: 'Wallet not connected',
      messageRequired: 'Please enter a message to sign',
      signatureRefused: 'Signature refused by user',
      signatureError: 'Error signing',
    },
    signature: {
      title: 'Message signature',
      messageLabel: 'Message to sign',
      messagePlaceholder: 'Enter a message to prove ownership of your wallet...',
      signButton: 'Sign message',
      signing: 'Signing...',
      success: '✓ Signature generated and saved',
      copy: 'Copy',
      signatureHex: 'Signature (hex):',
      signatureProof: 'This signature proves that you are the owner of this wallet.',
      show: 'Show',
      hide: 'Hide',
    },
    history: {
      title: 'Signature history',
      show: 'Show',
      hide: 'Hide',
      clearAll: 'Clear all',
      empty: 'No saved signatures',
      copySignature: 'Copy signature',
      copyMessage: 'Copy message',
      delete: 'Delete',
      viewFullSignature: 'View full signature',
      clearConfirm: 'Are you sure you want to delete all signature history?',
    },
    verification: {
      title: 'Signature verification',
      messageLabel: 'Original message',
      messagePlaceholder: 'Enter the original message...',
      signatureLabel: 'Signature',
      signaturePlaceholder: 'Enter the hexadecimal signature (0x...)',
      addressLabel: 'Ethereum address',
      addressPlaceholder: '0x...',
      verifyButton: 'Verify',
      verifying: 'Verifying...',
      clear: 'Clear',
      allFieldsRequired: 'All fields are required',
      validSignature: '✓ Valid signature! This signature matches the address and message.',
      invalidSignature: '✗ Invalid signature. The signature does not match the address or message.',
      success: 'Signature verified successfully',
      invalid: 'Invalid signature',
      error: 'Error verifying signature',
      show: 'Show',
      hide: 'Hide',
    },
    toast: {
      copied: 'Copied to clipboard',
      signatureSaved: 'Signature saved',
      messageDeleted: 'Message deleted',
      historyCleared: 'History cleared',
    },
  },
};

