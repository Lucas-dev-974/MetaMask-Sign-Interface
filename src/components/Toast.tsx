import { Component, For, Show } from 'solid-js';
import { useToast } from '../hooks/useToast';

const Toast: Component = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div class="fixed top-4 right-4 z-50 space-y-2 w-full max-w-sm">
      <For each={toasts()}>
        {(toast) => (
          <div
            class={`p-4 rounded-lg shadow-lg border flex items-start gap-3 animate-slide-in-right ${
              toast.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : toast.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : toast.type === 'warning'
                ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            <div class="flex-1">
              <p class="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </For>
    </div>
  );
};

export default Toast;

