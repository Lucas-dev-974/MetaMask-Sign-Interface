import { Component, JSX } from 'solid-js';

interface ButtonProps {
  children: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'gradient-blue' | 'gradient-purple';
  class?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: Component<ButtonProps> = (props) => {
  const getVariantStyles = () => {
    switch (props.variant) {
      case 'primary':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-700';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'gradient-blue':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5';
      case 'gradient-purple':
        return 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl';
      default:
        return 'bg-gray-200 hover:bg-gray-300 text-gray-700';
    }
  };

  return (
    <button
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      class={`font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${getVariantStyles()} ${props.class || ''}`}
    >
      {props.children}
    </button>
  );
};

export default Button;

