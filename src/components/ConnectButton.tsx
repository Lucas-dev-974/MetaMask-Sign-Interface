import { Component } from 'solid-js';
import Button from './Button';
import { isMetaMaskInstalled } from '../services/ethereum';
import { useI18n } from '../i18n/context';

interface ConnectButtonProps {
  isConnecting: boolean;
  onConnect: () => void;
}

const ConnectButton: Component<ConnectButtonProps> = (props) => {
  const { t } = useI18n();

  return (
    <Button
      onClick={props.onConnect}
      disabled={props.isConnecting || !isMetaMaskInstalled()}
      variant="gradient-blue"
      class="w-full py-4"
    >
      {props.isConnecting ? t().wallet.connecting : t().wallet.connect}
    </Button>
  );
};

export default ConnectButton;

