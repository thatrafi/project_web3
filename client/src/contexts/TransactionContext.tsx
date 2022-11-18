import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export type TransactionContextType = {
  titleName: string;
  connectWallet: Function;
  currentAccount: string;
};

export const TransactionContext = React.createContext<
  TransactionContextType | {}
>({});

export const TransactionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const isMetamaskInstalled = typeof window !== "undefined" && window.ethereum !== undefined;

  const checkIfWalletConnected = async () => {
    if (isMetamaskInstalled) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log(accounts);
    }
  };

  const connectWallet = async () => {
    if (isMetamaskInstalled) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ titleName: "web3 rafi", connectWallet, currentAccount }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(
    typeof window !== "undefined" ? window.ethereum : undefined
  );
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log({
    provider,
    signer,
    transactionContract,
  });
};
