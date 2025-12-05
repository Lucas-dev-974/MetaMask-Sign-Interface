export interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  isMetaMask?: boolean;
  selectedAddress?: string;
  chainId?: string;
  on?: (event: string, callback: (...args: any[]) => void) => void;
  off?: (event: string, callback: (...args: any[]) => void) => void;
  removeListener?: (event: string, callback: (...args: any[]) => void) => void;
}

export interface EthereumError extends Error {
  code: number;
  message: string;
  data?: unknown;
}

export enum EthereumErrorCode {
  USER_REJECTED = 4001,
  UNAUTHORIZED = 4100,
  UNSUPPORTED_METHOD = 4200,
  DISCONNECTED = 4900,
  CHAIN_DISCONNECTED = 4901,
}

export interface SignedMessage {
  id: string;
  message: string;
  signature: string;
  address: string;
  timestamp: number;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

