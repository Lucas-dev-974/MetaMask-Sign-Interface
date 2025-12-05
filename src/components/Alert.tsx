import { Component, Show } from 'solid-js';

interface AlertProps {
  message: string;
  type?: 'error' | 'warning' | 'success' | 'info';
}

const Alert: Component<AlertProps> = (props) => {
  const getStyles = () => {
    switch (props.type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-600';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-600';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-600';
    }
  };

  return (
    <Show when={props.message}>
      <div class={`mb-4 p-4 border rounded-lg ${getStyles()}`}>
        <p class="text-sm">{props.message}</p>
      </div>
    </Show>
  );
};

export default Alert;

