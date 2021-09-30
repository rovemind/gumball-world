import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Moment from "react-moment";

import { lamportToSol } from "../lib/solana";
import dbConnect from "../lib/database-connect";
import CandyMachine from "../models/candy-machine";
import ICandyMachine from "../types/candy-machine";

const Home: NextPage = ({ upcomingCandyMachines, recentCandyMachines }) => {
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

      <main className="max-w-7xl mb-8 mx-auto px-4 sm:px-6">
        <div className="mt-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold my-4 leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Upcoming Mints
          </h2>
          <p className="mt-1 text-md font-medium text-gray-600">
            {upcomingCandyMachines?.length + " items"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {upcomingCandyMachines?.map((candyMachine: ICandyMachine) => (
            <div key={candyMachine.public_key} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={candyMachine.image}
                  alt={"candy machine " + candyMachine.public_key + " image"}
                  className="shadow-lg object-cover w-full h-96 object-center object-cover group-hover:opacity-75"
                />
              </div>
              <div className="px-1">
                <div className="mt-2 flex items-center justify-between">
                  <h3 className="text-lg text-gray-900 font-bold">
                    {candyMachine?.symbol.length > 0 ? (
                      candyMachine.symbol
                    ) : (
                      <span className="text-xs font-bold px-3 rounded py-1 uppercase bg-red-300 text-red-900 leading-none mt-4 sm:mt-0 w-full sm:w-auto text-center">
                        Missing symbol
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-md font-medium text-gray-800">
                    {candyMachine?.price >= 0 ? (
                      <span className="font-bold">
                        {"◎ " + lamportToSol(candyMachine?.price)}
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-3 rounded py-1 uppercase bg-red-300 text-red-900 leading-none mt-4 sm:mt-0 w-full sm:w-auto text-center">
                        Missing price
                      </span>
                    )}
                  </p>
                </div>
                <p className="mt-1 text-md font-medium text-gray-500">
                  {"Collection of " + candyMachine?.items_num + " NFTs"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold mt-8 mb-4 leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Recent Drops
          </h2>
          <p className="mt-1 text-md font-medium text-gray-600">
            {recentCandyMachines?.length + " items"}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {recentCandyMachines?.map((candyMachine: ICandyMachine) => (
            <div key={candyMachine.public_key} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={candyMachine.image}
                  alt=""
                  className="object-cover w-full h-96 object-center object-cover group-hover:opacity-75"
                />
              </div>

              <div className="px-1">
                <div className="mt-2 flex items-center justify-between">
                  <h3 className="text-lg text-gray-900 font-bold">
                    {candyMachine?.symbol?.length > 0 ? (
                      candyMachine.symbol
                    ) : (
                      <span className="text-xs font-bold px-3 rounded py-1 uppercase bg-red-300 text-red-900 leading-none mt-4 sm:mt-0 w-full sm:w-auto text-center">
                        Missing symbol
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-md font-medium text-gray-800">
                    {candyMachine?.price >= 0 ? (
                      <span className="font-bold">
                        {"◎ " + lamportToSol(candyMachine?.price)}
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-3 rounded py-1 uppercase bg-red-300 text-red-900 leading-none mt-4 sm:mt-0 w-full sm:w-auto text-center">
                        Missing price
                      </span>
                    )}
                  </p>
                </div>
                <p className="mt-1 text-md font-medium text-gray-500">
                  Dropped{" "}
                  <Moment trim fromNow>
                    {candyMachine.date}
                  </Moment>
                </p>
                <p className="mt-1 text-md font-medium text-gray-500">
                  {candyMachine?.redeemed_items_num +
                    " of " +
                    candyMachine?.items_num +
                    " minted"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();
  const currentDate = new Date().toISOString();

  const upcoming = await CandyMachine.find({
    symbol: { $not: { $regex: "(STACC)" } },
    network: "mainnet",
    date: { $gt: currentDate },
  })
    .sort({ date: 1, name: 1, public_key: 1 })
    .limit(4);
  const upcomingCandyMachines = upcoming.map((doc) => {
    const candyMachine = doc.toObject();
    candyMachine._id = candyMachine._id.toString();
    return JSON.parse(JSON.stringify(candyMachine));
  });

  const mintable = await CandyMachine.find({
    symbol: { $not: { $regex: "(STACC)" } },
    network: "mainnet",
    date: { $lte: currentDate },
    $expr: { $lt: ["$redeemed_items_num", "$items_num"] },
  })
    .sort({ date: -1, name: 1, public_key: 1 })
    .limit(20);
  const recentCandyMachines = mintable.map((doc) => {
    const candyMachine = doc.toObject();
    candyMachine._id = candyMachine._id.toString();
    return JSON.parse(JSON.stringify(candyMachine));
  });

  return { props: { upcomingCandyMachines, recentCandyMachines } };
};
