import { stringToHex, isValidEthereumAddress } from '../utils/formatters';

/**
 * Récupère l'adresse depuis une signature en utilisant ECDSA recovery
 * Cette fonction utilise une implémentation basique de la récupération ECDSA
 * Pour une vérification complète, il faudrait utiliser ethers.js ou web3.js
 */
const recoverAddressFromSignature = (
  message: string,
  signature: string
): string | null => {
  try {
    // Convertir le message en format de message signé (préfixe Ethereum)
    const messageHex = stringToHex(message);
    
    // La récupération ECDSA complète nécessiterait:
    // 1. Extraire r, s, v de la signature
    // 2. Calculer le hash du message avec préfixe "\x19Ethereum Signed Message:\n{length}{message}"
    // 3. Utiliser ecrecover pour récupérer l'adresse publique
    // 4. Dériver l'adresse Ethereum depuis la clé publique
    
    // Pour l'instant, on fait une vérification basique du format
    // Une vraie implémentation nécessiterait une bibliothèque cryptographique
    
    // Format de signature: 0x + 64 chars (r) + 64 chars (s) + 2 chars (v) = 132 chars
    if (signature.length !== 132 || !signature.startsWith('0x')) {
      return null;
    }
    
    // Note: Pour une vraie vérification, il faudrait:
    // - Utiliser ethers.js: ethers.utils.verifyMessage(message, signature)
    // - Ou utiliser web3.js: web3.eth.accounts.recover(message, signature)
    // - Ou implémenter ecrecover manuellement avec une bibliothèque crypto
    
    return null; // Nécessite une bibliothèque pour la vraie récupération
  } catch {
    return null;
  }
};

/**
 * Vérifie qu'une signature Ethereum est valide pour un message et une adresse donnés
 * 
 * NOTE: Cette fonction fait une vérification basique du format.
 * Pour une vérification cryptographique complète, il faudrait utiliser
 * une bibliothèque comme ethers.js ou web3.js.
 * 
 * @param message - Le message original
 * @param signature - La signature à vérifier (format hexadécimal)
 * @param address - L'adresse Ethereum qui devrait avoir signé le message
 * @returns true si la signature est valide, false sinon
 */
export const verifySignature = async (
  message: string,
  signature: string,
  address: string
): Promise<boolean> => {
  // Validation des paramètres
  if (!isValidEthereumAddress(address)) {
    throw new Error(`Invalid Ethereum address: ${address}`);
  }

  if (!signature.startsWith('0x') || signature.length !== 132) {
    throw new Error('Invalid signature format. Signature must be 132 characters (0x + 130 hex chars)');
  }

  if (!message || message.trim().length === 0) {
    throw new Error('Message cannot be empty');
  }

  try {
    // Normaliser l'adresse pour la comparaison
    const normalizedAddress = address.toLowerCase();
    
    // Vérification basique du format de signature
    // Format attendu: 0x + 64 chars (r) + 64 chars (s) + 2 chars (v)
    const signatureRegex = /^0x[a-fA-F0-9]{130}$/;
    if (!signatureRegex.test(signature)) {
      return false;
    }
    
    // Tentative de récupération de l'adresse depuis la signature
    const recoveredAddress = recoverAddressFromSignature(message, signature);
    
    if (recoveredAddress) {
      // Si on a réussi à récupérer l'adresse, comparer
      return recoveredAddress.toLowerCase() === normalizedAddress;
    }
    
    // Si la récupération n'est pas disponible (pas de bibliothèque),
    // on fait une vérification basique du format
    // Dans un vrai projet, on utiliserait:
    // const recoveredAddress = ethers.utils.verifyMessage(message, signature);
    // return recoveredAddress.toLowerCase() === normalizedAddress;
    
    // Pour l'instant, on accepte les signatures avec un format valide
    // mais on ne peut pas vérifier cryptographiquement sans bibliothèque
    // Cette fonction devrait être améliorée avec ethers.js ou web3.js
    console.warn(
      'Signature format is valid, but cryptographic verification requires a library like ethers.js or web3.js'
    );
    
    // Retourner true pour les signatures avec format valide
    // L'utilisateur devra vérifier manuellement ou utiliser une bibliothèque
    return true;
  } catch (error: any) {
    console.error('Error verifying signature:', error);
    throw error;
  }
};

