import { TonConnectButton } from '@tonconnect/ui-react';
import './App.css';
import reactLogo from './assets/react.svg';
import { useMainContract } from './hooks/use-main-contract';
import viteLogo from '/vite.svg';

function App() {
    const { contractAddress, contractBalance, counter, latestAddress, ownerAddress, increment } = useMainContract();

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <button onClick={() => increment()}>Increment</button>

            <div className="card">
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            <TonConnectButton />
            <div>
                <div className="Card">
                    <b>Our contract Address</b>
                    <div className="Hint">{contractAddress?.slice(0, 30) + '...'}</div>
                    <b>Our contract Balance</b>
                    <div className="Hint">{contractBalance?.toString()}</div>
                </div>

                <div className="Card">
                    <b>Counter Value</b>
                    <div>{counter ?? 'Loading...'}</div>
                </div>

                <div className="Card">
                    <b>Latest Address</b>
                    <div>{latestAddress ?? 'Loading...'}</div>
                </div>

                <div className="Card">
                    <b>Owner Address</b>
                    <div>{ownerAddress ?? 'Loading...'}</div>
                </div>
            </div>
        </>
    );
}

export default App;
