export const formatBalance = (balance: string): string => {
  const eth = parseFloat(balance) / 1e18;
  return eth.toFixed(4);
};

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatDate = (timestamp: number, locale: string = 'fr-FR'): string => {
  const date = new Date(timestamp);
  return date.toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Convertit une chaîne de caractères en hexadécimal (format 0x...)
 * Utilise une méthode robuste compatible avec les caractères Unicode
 * @param str - La chaîne à convertir
 * @returns La représentation hexadécimale avec préfixe 0x
 */
export const stringToHex = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  // Utiliser TextEncoder pour une meilleure gestion Unicode
  try {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    const hex = Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
    return '0x' + hex;
  } catch (error) {
    // Fallback pour les navigateurs plus anciens
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      // Gérer les caractères surrogates (UTF-16)
      if (charCode >= 0xd800 && charCode <= 0xdbff && i + 1 < str.length) {
        const nextCharCode = str.charCodeAt(i + 1);
        if (nextCharCode >= 0xdc00 && nextCharCode <= 0xdfff) {
          // Paire de substitution UTF-16
          const codePoint = 0x10000 + ((charCode - 0xd800) << 10) + (nextCharCode - 0xdc00);
          const hexValue = codePoint.toString(16);
          hex += hexValue.padStart(4, '0');
          i++; // Skip le caractère suivant
          continue;
        }
      }
      const hexValue = charCode.toString(16);
      hex += hexValue.padStart(4, '0');
    }
    return '0x' + hex;
  }
};

/**
 * Valide qu'une adresse Ethereum est au format correct
 * @param address - L'adresse à valider
 * @returns true si l'adresse est valide
 */
export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Valide qu'un message n'est pas vide et respecte les limites
 * @param message - Le message à valider
 * @param maxLength - Longueur maximale (défaut: 10000 caractères)
 * @returns true si le message est valide
 */
export const isValidMessage = (message: string, maxLength: number = 10000): boolean => {
  if (typeof message !== 'string') return false;
  const trimmed = message.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength;
};

