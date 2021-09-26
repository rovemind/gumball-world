import Image from "next/image";
import React, { FC, Fragment } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Navigation: FC = () => {
  const { wallet } = useWallet();

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/" className="flex justify-center items-center">
              <span className="sr-only">gumball.world</span>
              <Image
                height="42px"
                width="42px"
                className="h-8 w-auto sm:h-10"
                src="/logo192.png"
                alt="gumball.world logo"
              />
              <p className="not-sr-only mx-3 text-gray-800 text-xl font-medium">
                gumball.world
              </p>
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group
            as="nav"
            className="hidden md:flex space-x-10"
          ></Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <WalletMultiButton>{wallet ? null : "Connect"}</WalletMultiButton>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="z-10 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="flex justify-center items-center">
                  <Image
                    height="42px"
                    width="42px"
                    className="h-8 w-auto"
                    src="/logo192.png"
                    alt="Workflow"
                  />
                  <p className="not-sr-only mx-3 text-gray-800 text-xl font-medium">gumbal.world</p>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8"></nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-1 gap-y-4 gap-x-8">
                <WalletMultiButton>
                  {wallet ? null : "Connect"}
                </WalletMultiButton>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navigation;
