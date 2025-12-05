import { createSignal, onMount, onCleanup } from 'solid-js';
import {
  getEthereumProvider,
  requestAccounts,
  getAccounts,
  getBalance,
  getChainId,
} from '../services/ethereum';
import { useI18n } from '../i18n/context';
import type { EthereumError } from '../types';
import { EthereumErrorCode } from '../types';

export const useWallet = () => {
  const { t } = useI18n();
  const [account, setAccount] = createSignal<string | null>(null);
  const [balance, setBalance] = createSignal<string>('0');
  const [chainId, setChainId] = createSignal<string>('');
  const [isConnecting, setIsConnecting] = createSignal(false);
  const [error, setError] = createSignal<string>('');

  const updateBalance = async (address: string) => {
    try {
      const bal = await getBalance(address);
      setBalance(bal);
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  };

  const updateChainId = async () => {
    try {
      const id = await getChainId();
      setChainId(id);
    } catch (err) {
      console.error('Error fetching chain ID:', err);
    }
  };

  const connect = async () => {
    if (!getEthereumProvider()) {
      setError(t().errors.metamaskNotInstalled);
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      const accounts = await requestAccounts();

      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        setAccount(address);
        await updateBalance(address);
        await updateChainId();
      }
    } catch (err: unknown) {
      const error = err as EthereumError;
      if (error.code === EthereumErrorCode.USER_REJECTED) {
        setError(t().errors.connectionRefused);
      } else if (error.code === EthereumErrorCode.DISCONNECTED) {
        setError(t().errors.metamaskNotInstalled);
      } else {
        setError(t().errors.connectionError + ': ' + (error.message || 'Unknown error'));
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setBalance('0');
    setChainId('');
    setError('');
  };

  const refresh = async () => {
    const currentAccount = account();
    if (currentAccount) {
      await updateBalance(currentAccount);
      await updateChainId();
    }
  };

  onMount(() => {
    const provider = getEthereumProvider();
    if (!provider) return;

    // Vérifier si déjà connecté
    if (provider.selectedAddress) {
      const address = provider.selectedAddress;
      setAccount(address);
      updateBalance(address);
      updateChainId();
    }

    // Récupérer les comptes existants
    getAccounts().then((accounts) => {
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        updateBalance(accounts[0]);
        updateChainId();
      }
    });

    // Écouter les changements de compte
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        updateBalance(accounts[0]);
      } else {
        disconnect();
      }
    };

    // Écouter les changements de réseau
    const handleChainChanged = () => {
      refresh();
    };

    provider.on?.('accountsChanged', handleAccountsChanged);
    provider.on?.('chainChanged', handleChainChanged);

    onCleanup(() => {
      provider.removeListener?.('accountsChanged', handleAccountsChanged);
      provider.removeListener?.('chainChanged', handleChainChanged);
      // Fallback pour les providers qui utilisent 'off' au lieu de 'removeListener'
      if (typeof provider.off === 'function') {
        provider.off('accountsChanged', handleAccountsChanged);
        provider.off('chainChanged', handleChainChanged);
      }
    });
  });

  return {
    account,
    balance,
    chainId,
    isConnecting,
    error,
    connect,
    disconnect,
    refresh,
  };
};

