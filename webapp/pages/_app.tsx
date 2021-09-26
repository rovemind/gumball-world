import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import Navigation from "../components/Navigation";

const WalletConnectionProvider = dynamic(() => import('../components/WalletConnectionProvider'), {
    ssr: false,
});

function App({ Component, pageProps }: AppProps): ReactElement {
    return (
        <WalletConnectionProvider>
            <Navigation />
            <Component {...pageProps} />
        </WalletConnectionProvider>
    );
}

export default App;