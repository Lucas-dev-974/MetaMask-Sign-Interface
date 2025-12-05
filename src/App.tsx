import { Component, Show } from 'solid-js';
import { useWallet } from './hooks/useWallet';
import { useSignatures } from './hooks/useSignatures';
import { useI18n } from './i18n/context';
import ConnectButton from './components/ConnectButton';
import WalletInfo from './components/WalletInfo';
import SignMessage from './components/SignMessage';
import History from './components/History';
import Alert from './components/Alert';
import MetaMaskWarning from './components/MetaMaskWarning';
import Button from './components/Button';
import LanguageSelector from './components/LanguageSelector';
import VerifySignature from './components/VerifySignature';
import Toast from './components/Toast';

const App: Component = () => {
  const { t } = useI18n();
  const wallet = useWallet();
  const signatures = useSignatures(wallet.account);

  const handleDisconnect = () => {
    wallet.disconnect();
    signatures.reset();
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Toast />
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <LanguageSelector />

        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">{t().app.title}</h1>
          <p class="text-gray-600">
            {wallet.account() ? t().app.subtitleConnected : t().app.subtitle}
          </p>
        </div>

        <Alert message={wallet.error()} type="error" />

        <Show
          when={wallet.account()}
          fallback={<ConnectButton isConnecting={wallet.isConnecting()} onConnect={wallet.connect} />}
        >
          <div class="space-y-4">
            <WalletInfo
              account={wallet.account()!}
              balance={wallet.balance()}
              chainId={wallet.chainId()}
            />

            <SignMessage
              message={signatures.message()}
              setMessage={signatures.setMessage}
              signature={signatures.signature()}
              isSigning={signatures.isSigning()}
              error={signatures.error()}
              onSign={signatures.signMessage}
            />

            <History
              messages={signatures.signedMessages()}
              showHistory={signatures.showHistory()}
              onToggleHistory={() => signatures.setShowHistory(!signatures.showHistory())}
              onDelete={signatures.deleteSignedMessage}
              onClearAll={signatures.clearAllSignedMessages}
            />

            <VerifySignature />

            <Button onClick={handleDisconnect} variant="secondary" class="w-full">
              {t().wallet.disconnect}
            </Button>
          </div>
        </Show>

        <MetaMaskWarning />
      </div>
    </div>
  );
};

export default App;
