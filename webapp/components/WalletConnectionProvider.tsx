import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import {
    getLedgerWallet,
    getPhantomWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolletWallet,
    getSolletExtensionWallet,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, useCallback, useMemo } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Notification from './Notification';

const WalletConnectionProvider: FC = ({ children }) => {
    // Can be set to 'Devnet', 'Testnet', or 'Mainnet'
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application
    const wallets = useMemo(
        () => [
            getPhantomWallet(),
            getSolflareWallet(),
            getLedgerWallet(),
            getSlopeWallet(),
            getSolletWallet({ network }),
            getSolletExtensionWallet({ network }),
        ],
        [network]
    );

    const onError = useCallback(
        (error: WalletError) =>
            toast.custom(
                <Notification
                    message={error.message ? `${error.name}: ${error.message}` : error.name}
                    variant="error"
                />
            ),
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
                <Toaster position="bottom-left" reverseOrder={false} />
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletConnectionProvider;