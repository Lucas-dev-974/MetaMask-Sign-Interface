import type { SignedMessage } from '../types';

const STORAGE_KEY = 'metamask_signed_messages';
const MAX_MESSAGES = 50;

export const loadSignedMessages = (filterAddress?: string | null): SignedMessage[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const messages = JSON.parse(stored) as SignedMessage[];

    if (filterAddress) {
      return messages.filter(
        (msg) => msg.address.toLowerCase() === filterAddress.toLowerCase()
      );
    }

    return messages;
  } catch (err) {
    console.error('Error loading signed messages:', err);
    return [];
  }
};

export const saveSignedMessage = (
  message: string,
  signature: string,
  address: string
): void => {
  try {
    const signedMessage: SignedMessage = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      message,
      signature,
      address,
      timestamp: Date.now(),
    };

    const existing = loadSignedMessages();
    const messages = [signedMessage, ...existing].slice(0, MAX_MESSAGES);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (err) {
    console.error('Error saving signed message:', err);
  }
};

export const deleteSignedMessage = (id: string): void => {
  try {
    const messages = loadSignedMessages();
    const filtered = messages.filter((msg) => msg.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Error deleting signed message:', err);
  }
};

export const clearAllSignedMessages = (filterAddress?: string | null): void => {
  try {
    if (filterAddress) {
      const messages = loadSignedMessages();
      const filtered = messages.filter(
        (msg) => msg.address.toLowerCase() !== filterAddress.toLowerCase()
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (err) {
    console.error('Error clearing signed messages:', err);
  }
};

