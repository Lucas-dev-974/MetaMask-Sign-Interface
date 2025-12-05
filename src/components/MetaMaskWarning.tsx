import { Component, Show } from 'solid-js';
import { isMetaMaskInstalled } from '../services/ethereum';
import { useI18n } from '../i18n/context';

const MetaMaskWarning: Component = () => {
  const { t } = useI18n();

  return (
    <Show when={!isMetaMaskInstalled()}>
      <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p class="text-yellow-800 text-sm text-center">
          {t().errors.metamaskNotDetected}{' '}
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline font-semibold"
          >
            {t().errors.metamaskNotInstalledLink}
          </a>
        </p>
      </div>
    </Show>
  );
};

export default MetaMaskWarning;

