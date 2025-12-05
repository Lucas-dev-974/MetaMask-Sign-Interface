import { Component, Show } from 'solid-js';
import { formatBalance, formatAddress } from '../utils/formatters';
import { useI18n } from '../i18n/context';

interface WalletInfoProps {
  account: string;
  balance: string;
  chainId: string;
}

const WalletInfo: Component<WalletInfoProps> = (props) => {
  const { t } = useI18n();

  return (
    <div class="bg-gray-50 rounded-lg p-4 space-y-3">
        <div>
          <p class="text-xs text-gray-500 mb-1">{t().wallet.address}</p>
          <p class="text-sm font-mono font-semibold text-gray-800 break-all">
            {props.account}
          </p>
          <p class="text-xs text-gray-400 mt-1 font-mono">
            {formatAddress(props.account)}
          </p>
        </div>

        <div class="border-t border-gray-200 pt-3">
          <p class="text-xs text-gray-500 mb-1">{t().wallet.balance}</p>
          <p class="text-2xl font-bold text-indigo-600">
            {formatBalance(props.balance)} ETH
          </p>
        </div>

        <Show when={props.chainId}>
          <div class="border-t border-gray-200 pt-3">
            <p class="text-xs text-gray-500 mb-1">{t().wallet.chainId}</p>
            <p class="text-sm font-mono text-gray-800">{props.chainId}</p>
          </div>
        </Show>
      </div>
  );
};

export default WalletInfo;

