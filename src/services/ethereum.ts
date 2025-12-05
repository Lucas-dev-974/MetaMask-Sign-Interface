import type { EthereumProvider, EthereumError } from '../types';
import { EthereumErrorCode } from '../types';
import { stringToHex, isValidEthereumAddress, isValidMessage } from '../utils/formatters';

export const getEthereumProvider = (): EthereumProvider | undefined => {
  // Support EIP-1193 : vérifier window.ethereum
  if (typeof window !== 'undefined' && window.ethereum) {
    return window.ethereum;
  }
  return undefined;
};

export const isMetaMaskInstalled = (): boolean => {
  return !!getEthereumProvider();
};

/**
 * Vérifie si le provider est compatible EIP-1193
 */
export const isEIP1193Provider = (provider: EthereumProvider): boolean => {
  return typeof provider.request === 'function';
};

/**
 * Crée une erreur Ethereum typée
 */
const createEthereumError = (error: any): EthereumError => {
  const ethereumError: EthereumError = {
    name: 'EthereumError',
    message: error?.message || 'Unknown error',
    code: error?.code || 0,
    data: error?.data,
  };
  return ethereumError;
};

export const requestAccounts = async (): Promise<string[]> => {
  const provider = getEthereumProvider();
  if (!provider) {
    const error = createEthereumError({
      code: EthereumErrorCode.DISCONNECTED,
      message: 'No Ethereum provider found',
    });
    throw error;
  }

  if (!isEIP1193Provider(provider)) {
    const error = createEthereumError({
      code: EthereumErrorCode.UNSUPPORTED_METHOD,
      message: 'Provider does not support EIP-1193',
    });
    throw error;
  }

  try {
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    });

    if (!Array.isArray(accounts) || accounts.length === 0) {
      throw createEthereumError({
        code: EthereumErrorCode.UNAUTHORIZED,
        message: 'No accounts returned',
      });
    }

    // Valider les adresses
    accounts.forEach((account) => {
      if (!isValidEthereumAddress(account)) {
        throw createEthereumError({
          code: 0,
          message: `Invalid Ethereum address: ${account}`,
        });
      }
    });

    return accounts as string[];
  } catch (error: any) {
    throw createEthereumError(error);
  }
};

export const getAccounts = async (): Promise<string[]> => {
  const provider = getEthereumProvider();
  if (!provider) {
    return [];
  }

  try {
    const accounts = await provider.request({
      method: 'eth_accounts',
    });

    if (!Array.isArray(accounts)) {
      return [];
    }

    // Valider les adresses
    return accounts.filter((account) => isValidEthereumAddress(account)) as string[];
  } catch (error) {
    console.error('Error getting accounts:', error);
    return [];
  }
};

export const getBalance = async (address: string): Promise<string> => {
  const provider = getEthereumProvider();
  if (!provider) {
    throw createEthereumError({
      code: EthereumErrorCode.DISCONNECTED,
      message: 'No Ethereum provider found',
    });
  }

  if (!isValidEthereumAddress(address)) {
    throw createEthereumError({
      code: 0,
      message: `Invalid Ethereum address: ${address}`,
    });
  }

  try {
    const balance = await provider.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });

    if (typeof balance !== 'string') {
      throw createEthereumError({
        code: 0,
        message: 'Invalid balance format',
      });
    }

    return balance as string;
  } catch (error: any) {
    throw createEthereumError(error);
  }
};

export const getChainId = async (): Promise<string> => {
  const provider = getEthereumProvider();
  if (!provider) {
    throw createEthereumError({
      code: EthereumErrorCode.DISCONNECTED,
      message: 'No Ethereum provider found',
    });
  }

  try {
    const chainId = await provider.request({
      method: 'eth_chainId',
    });

    if (typeof chainId !== 'string') {
      throw createEthereumError({
        code: 0,
        message: 'Invalid chain ID format',
      });
    }

    return chainId as string;
  } catch (error: any) {
    throw createEthereumError(error);
  }
};

export const signMessage = async (
  message: string,
  address: string
): Promise<string> => {
  const provider = getEthereumProvider();
  if (!provider) {
    throw createEthereumError({
      code: EthereumErrorCode.DISCONNECTED,
      message: 'No Ethereum provider found',
    });
  }

  // Valider le message
  if (!isValidMessage(message)) {
    throw createEthereumError({
      code: 0,
      message: 'Invalid message: message cannot be empty',
    });
  }

  // Valider l'adresse
  if (!isValidEthereumAddress(address)) {
    throw createEthereumError({
      code: 0,
      message: `Invalid Ethereum address: ${address}`,
    });
  }

  try {
    // Convertir le message en hexadécimal
    const messageHex = stringToHex(message);

    const signature = await provider.request({
      method: 'personal_sign',
      params: [messageHex, address],
    });

    if (typeof signature !== 'string' || !signature.startsWith('0x')) {
      throw createEthereumError({
        code: 0,
        message: 'Invalid signature format',
      });
    }

    return signature as string;
  } catch (error: any) {
    throw createEthereumError(error);
  }
};

