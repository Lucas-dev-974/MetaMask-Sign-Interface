import { Component, Show, createSignal } from 'solid-js';
import Button from './Button';
import Alert from './Alert';
import { copyToClipboard } from '../utils/clipboard';
import { useI18n } from '../i18n/context';
import { useToast } from '../hooks/useToast';

interface SignMessageProps {
  message: string;
  setMessage: (value: string) => void;
  signature: string;
  isSigning: boolean;
  error: string;
  onSign: () => void;
}

const SignMessage: Component<SignMessageProps> = (props) => {
  const { t } = useI18n();
  const { showToast } = useToast();
  const [showContent, setShowContent] = createSignal(true);

  return (
    <div class="border-t border-gray-200 pt-4 mt-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">
          {t().signature.title}
        </h2>
        <button
          onClick={() => setShowContent(!showContent())}
          class="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          {showContent() ? t().signature.hide : t().signature.show}
        </button>
      </div>

      <Show when={showContent()}>
        <div class="space-y-3">
          <div>
            <label class="block text-xs text-gray-500 mb-2">
              {t().signature.messageLabel}
            </label>
            <textarea
              value={props.message}
              onInput={(e) => props.setMessage(e.currentTarget.value)}
              placeholder={t().signature.messagePlaceholder}
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows="3"
            />
          </div>

          <Button
            onClick={props.onSign}
            disabled={props.isSigning || !props.message.trim()}
            variant="gradient-purple"
            class="w-full"
          >
            {props.isSigning ? t().signature.signing : t().signature.signButton}
          </Button>

          <Alert message={props.error} type="error" />

          <Show when={props.signature}>
            <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4 space-y-2">
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs text-indigo-600 font-medium">{t().signature.success}</p>
                <button
                  onClick={async () => {
                    const success = await copyToClipboard(props.signature);
                    if (success) {
                      showToast(t().toast.copied, 'success');
                    }
                  }}
                  class="text-xs text-indigo-600 hover:text-indigo-800 underline"
                >
                  {t().signature.copy}
                </button>
              </div>
              <p class="text-xs text-gray-500 mb-1">{t().signature.signatureHex}</p>
              <p class="text-xs font-mono text-gray-800 break-all bg-white p-2 rounded border">
                {props.signature}
              </p>
              <p class="text-xs text-gray-500 mt-2">
                {t().signature.signatureProof}
              </p>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
};

export default SignMessage;

