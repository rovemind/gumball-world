import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>gumball.world</title>
        <meta
          name="description"
          content="Candy Machine Explorer - NFT explorer and analytics platform for Solana."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mb-8 mx-auto px-4 sm:px-6"></main>

      <footer className={styles.footer}>
        <a href="https://solana.com" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className="ml-2">
            <Image
              src="/solana.svg"
              alt="Vercel Logo"
              width={100}
              height={19}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
