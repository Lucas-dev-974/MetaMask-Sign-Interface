import { Component, createSignal, Show } from 'solid-js';
import Button from './Button';
import Alert from './Alert';
import { verifySignature } from '../services/signatureVerification';
import { useI18n } from '../i18n/context';
import { useToast } from '../hooks/useToast';

const VerifySignature: Component = () => {
  const { t } = useI18n();
  const { showToast } = useToast();
  const [showContent, setShowContent] = createSignal(false);
  const [message, setMessage] = createSignal<string>('');
  const [signature, setSignature] = createSignal<string>('');
  const [address, setAddress] = createSignal<string>('');
  const [isVerifying, setIsVerifying] = createSignal<boolean>(false);
  const [verificationResult, setVerificationResult] = createSignal<{
    isValid: boolean;
    error?: string;
  } | null>(null);

  const handleVerify = async () => {
    const msg = message().trim();
    const sig = signature().trim();
    const addr = address().trim();

    if (!msg || !sig || !addr) {
      setVerificationResult({
        isValid: false,
        error: t().verification.allFieldsRequired,
      });
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const isValid = await verifySignature(msg, sig, addr);
      setVerificationResult({ isValid });

      if (isValid) {
        showToast(t().verification.success, 'success');
      } else {
        showToast(t().verification.invalid, 'error');
      }
    } catch (error: any) {
      setVerificationResult({
        isValid: false,
        error: error.message || t().verification.error,
      });
      showToast(t().verification.error, 'error');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClear = () => {
    setMessage('');
    setSignature('');
    setAddress('');
    setVerificationResult(null);
  };

  return (
    <div class="border-t border-gray-200 pt-4 mt-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">
          {t().verification.title}
        </h2>
        <button
          onClick={() => setShowContent(!showContent())}
          class="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          {showContent() ? t().verification.hide : t().verification.show}
        </button>
      </div>

      <Show when={showContent()}>
        <div class="space-y-3">
          <div>
            <label class="block text-xs text-gray-500 mb-2">
              {t().verification.messageLabel}
            </label>
            <textarea
              value={message()}
              onInput={(e) => setMessage(e.currentTarget.value)}
              placeholder={t().verification.messagePlaceholder}
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows="2"
            />
          </div>

          <div>
            <label class="block text-xs text-gray-500 mb-2">
              {t().verification.signatureLabel}
            </label>
            <textarea
              value={signature()}
              onInput={(e) => setSignature(e.currentTarget.value)}
              placeholder={t().verification.signaturePlaceholder}
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
              rows="2"
            />
          </div>

          <div>
            <label class="block text-xs text-gray-500 mb-2">
              {t().verification.addressLabel}
            </label>
            <input
              type="text"
              value={address()}
              onInput={(e) => setAddress(e.currentTarget.value)}
              placeholder={t().verification.addressPlaceholder}
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
            />
          </div>

          <div class="flex gap-2">
            <Button
              onClick={handleVerify}
              disabled={isVerifying() || !message().trim() || !signature().trim() || !address().trim()}
              variant="gradient-purple"
              class="flex-1"
            >
              {isVerifying() ? t().verification.verifying : t().verification.verifyButton}
            </Button>
            <Button
              onClick={handleClear}
              variant="secondary"
              disabled={isVerifying()}
            >
              {t().verification.clear}
            </Button>
          </div>

          {verificationResult() && (
            <div>
              {verificationResult()!.isValid ? (
                <Alert
                  message={t().verification.validSignature}
                  type="success"
                />
              ) : (
                <Alert
                  message={verificationResult()!.error || t().verification.invalidSignature}
                  type="error"
                />
              )}
            </div>
          )}
        </div>
      </Show>
    </div>
  );
};

export default VerifySignature;

