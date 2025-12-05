/**
 * Mapping des chainId vers les noms de réseaux Ethereum
 */
export const NETWORK_NAMES: Record<string, { name: string; shortName: string }> = {
  '0x1': { name: 'Ethereum Mainnet', shortName: 'Mainnet' },
  '0x3': { name: 'Ropsten Testnet', shortName: 'Ropsten' },
  '0x4': { name: 'Rinkeby Testnet', shortName: 'Rinkeby' },
  '0x5': { name: 'Goerli Testnet', shortName: 'Goerli' },
  '0x89': { name: 'Polygon Mainnet', shortName: 'Polygon' },
  '0x13881': { name: 'Polygon Mumbai', shortName: 'Mumbai' },
  '0xa': { name: 'Optimism', shortName: 'Optimism' },
  '0xa4b1': { name: 'Arbitrum One', shortName: 'Arbitrum' },
  '0x2105': { name: 'Base', shortName: 'Base' },
  '0xaa36a7': { name: 'Sepolia Testnet', shortName: 'Sepolia' },
  '0x1a4': { name: 'Optimism Goerli', shortName: 'Optimism Goerli' },
  '0x66eee': { name: 'Arbitrum Sepolia', shortName: 'Arbitrum Sepolia' },
};

/**
 * Convertit un chainId en nom de réseau
 * @param chainId - Le chainId (format hexadécimal ou décimal)
 * @returns Le nom du réseau ou le chainId si inconnu
 */
export const getNetworkName = (chainId: string): string => {
  // Normaliser le chainId en format hexadécimal
  let normalizedChainId = chainId;
  
  if (!chainId.startsWith('0x')) {
    // Si c'est un nombre décimal, le convertir en hex
    try {
      normalizedChainId = `0x${parseInt(chainId, 10).toString(16)}`;
    } catch {
      return chainId;
    }
  }
  
  const network = NETWORK_NAMES[normalizedChainId.toLowerCase()];
  return network ? network.name : chainId;
};

/**
 * Convertit un chainId en nom court de réseau
 * @param chainId - Le chainId (format hexadécimal ou décimal)
 * @returns Le nom court du réseau ou le chainId si inconnu
 */
export const getNetworkShortName = (chainId: string): string => {
  let normalizedChainId = chainId;
  
  if (!chainId.startsWith('0x')) {
    try {
      normalizedChainId = `0x${parseInt(chainId, 10).toString(16)}`;
    } catch {
      return chainId;
    }
  }
  
  const network = NETWORK_NAMES[normalizedChainId.toLowerCase()];
  return network ? network.shortName : chainId;
};

