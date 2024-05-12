import { fromNano } from '@ton/core';
import { TonConnectButton } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import './App.css';
import { useMainContract } from './hooks/use-main-contract';
import { useTonConnect } from './hooks/use-ton-connect';

function App() {
  const {
    contractAddress,
    balance,
    counter,
    increment,
    deposit,
    withdraw,
  } = useMainContract();

  const { connected } = useTonConnect();

  const showAlert = () => {
    WebApp.showAlert('Hello from React');
  };

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className="Card">
          <div>TWA Platform {<b>{WebApp.platform}</b>}</div>
          <b>Our contract Address</b>
          <div className="">{contractAddress?.slice(0, 30) + '...'}</div>
          <b>Our contract Balance</b>
          <span>
            {balance?.toString() && (
              <div className="">{fromNano(balance)}</div>
            )}
          </span>
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{counter ?? 'Loading...'}</div>
        </div>

        <div className="button-group">
          <button
            onClick={() => {
              showAlert();
            }}
          >
            Show Alert
          </button>

          {connected && (
            <button
              onClick={() => {
                increment();
              }}
            >
              Increment by 1
            </button>
          )}

          {connected && (
            <button
              onClick={() => {
                deposit(1);
              }}
            >
              Request deposit of 1 TON
            </button>
          )}

          {connected && (
            <button
              onClick={() => {
                withdraw(0.7);
              }}
            >
              Request 0.7 TON withdrawal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
