import { Component, Show, For } from 'solid-js';
import type { SignedMessage } from '../types';
import { formatDate } from '../utils/formatters';
import { copyToClipboard } from '../utils/clipboard';
import { useI18n } from '../i18n/context';
import { useToast } from '../hooks/useToast';

interface HistoryProps {
  messages: SignedMessage[];
  showHistory: boolean;
  onToggleHistory: () => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

const History: Component<HistoryProps> = (props) => {
  const { t, language } = useI18n();
  const { showToast } = useToast();
  const locale = () => language() === 'fr' ? 'fr-FR' : 'en-US';

  return (
    <div class="border-t border-gray-200 pt-4 mt-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">
          {t().history.title}
        </h2>
        <div class="flex gap-2">
          <button
            onClick={props.onToggleHistory}
            class="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {props.showHistory ? t().history.hide : t().history.show} ({props.messages.length})
          </button>
          <Show when={props.messages.length > 0}>
            <button
              onClick={props.onClearAll}
              class="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              {t().history.clearAll}
            </button>
          </Show>
        </div>
      </div>

      <Show when={props.showHistory}>
        <Show
          when={props.messages.length > 0}
          fallback={
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <p class="text-gray-500 text-sm">{t().history.empty}</p>
            </div>
          }
        >
          <div class="space-y-3 max-h-96 overflow-y-auto">
            <For each={props.messages}>
              {(signedMsg) => (
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <p class="text-xs text-gray-500 mb-1">
                        {formatDate(signedMsg.timestamp, locale())}
                      </p>
                      <p class="text-sm font-medium text-gray-800 mb-2 break-words">
                        {signedMsg.message}
                      </p>
                      <div class="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={async () => {
                            const success = await copyToClipboard(signedMsg.signature);
                            if (success) {
                              showToast(t().toast.copied, 'success');
                            }
                          }}
                          class="text-xs text-indigo-600 hover:text-indigo-800 underline"
                        >
                          {t().history.copySignature}
                        </button>
                        <span class="text-gray-300">|</span>
                        <button
                          onClick={async () => {
                            const success = await copyToClipboard(signedMsg.message);
                            if (success) {
                              showToast(t().toast.copied, 'success');
                            }
                          }}
                          class="text-xs text-indigo-600 hover:text-indigo-800 underline"
                        >
                          {t().history.copyMessage}
                        </button>
                        <span class="text-gray-300">|</span>
                        <button
                          onClick={() => props.onDelete(signedMsg.id)}
                          class="text-xs text-red-600 hover:text-red-800 underline"
                        >
                          {t().history.delete}
                        </button>
                      </div>
                    </div>
                  </div>
                  <details class="mt-2">
                    <summary class="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                      {t().history.viewFullSignature}
                    </summary>
                    <p class="text-xs font-mono text-gray-800 break-all bg-white p-2 rounded border mt-2">
                      {signedMsg.signature}
                    </p>
                  </details>
                </div>
              )}
            </For>
          </div>
        </Show>
      </Show>
    </div>
  );
};

export default History;

