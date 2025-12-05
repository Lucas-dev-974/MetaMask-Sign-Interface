import { createSignal, createEffect } from 'solid-js';
import type { SignedMessage, EthereumError } from '../types';
import { EthereumErrorCode } from '../types';
import {
  loadSignedMessages,
  saveSignedMessage as saveMessage,
  deleteSignedMessage as deleteMessage,
  clearAllSignedMessages as clearAll,
} from '../services/storage';
import { signMessage as signMessageService } from '../services/ethereum';
import { useI18n } from '../i18n/context';
import { isValidMessage } from '../utils/formatters';

export const useSignatures = (account: () => string | null) => {
  const { t } = useI18n();
  const [signedMessages, setSignedMessages] = createSignal<SignedMessage[]>([]);
  const [message, setMessage] = createSignal<string>('');
  const [signature, setSignature] = createSignal<string>('');
  const [isSigning, setIsSigning] = createSignal(false);
  const [error, setError] = createSignal<string>('');
  const [showHistory, setShowHistory] = createSignal(false);

  const loadMessages = () => {
    const messages = loadSignedMessages(account());
    setSignedMessages(messages);
  };

  createEffect(() => {
    loadMessages();
  });

  const signMessage = async () => {
    const currentAccount = account();
    if (!currentAccount) {
      setError(t().errors.walletNotConnected);
      return;
    }

    const messageText = message().trim();
    
    // Validation du message
    if (!messageText) {
      setError(t().errors.messageRequired);
      return;
    }

    if (!isValidMessage(messageText)) {
      setError(t().errors.messageRequired + ' (message too long)');
      return;
    }

    setIsSigning(true);
    setError('');
    setSignature('');

    try {
      const sig = await signMessageService(messageText, currentAccount);

      if (sig) {
        setSignature(sig);
        saveMessage(messageText, sig, currentAccount);
        loadMessages();
      }
    } catch (err: unknown) {
      const error = err as EthereumError;
      if (error.code === EthereumErrorCode.USER_REJECTED) {
        setError(t().errors.signatureRefused);
      } else if (error.code === EthereumErrorCode.DISCONNECTED) {
        setError(t().errors.walletNotConnected);
      } else {
        setError(t().errors.signatureError + ': ' + (error.message || 'Unknown error'));
      }
    } finally {
      setIsSigning(false);
    }
  };

  const deleteSignedMessage = (id: string) => {
    deleteMessage(id);
    loadMessages();
  };

  const clearAllSignedMessages = () => {
    if (confirm(t().history.clearConfirm)) {
      clearAll(account());
      loadMessages();
    }
  };

  const reset = () => {
    setMessage('');
    setSignature('');
    setError('');
    setShowHistory(false);
  };

  return {
    signedMessages,
    message,
    setMessage,
    signature,
    isSigning,
    error,
    showHistory,
    setShowHistory,
    signMessage,
    deleteSignedMessage,
    clearAllSignedMessages,
    reset,
  };
};

