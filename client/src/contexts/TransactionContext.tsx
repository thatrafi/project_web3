import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export type TransactionContextType = {
  titleName: string;
  connectWallet: Function;
  currentAccount: string;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  formData: TransactionFormDataType;
  sendTransaction: Function;
  isLoading: boolean;
  message: string;
};

export type TransactionFormDataType = {
  addressTo: string;
  amount: string;
  keyword: string;
  message?: string;
};

export const TransactionContext = React.createContext<
  TransactionContextType | {}
>({});

export const TransactionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [formData, setFormData] = useState<TransactionFormDataType>({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState<number>();
  const [message, setMessage] = useState<string>();
  const isMetamaskInstalled =
    typeof window !== "undefined" && window.ethereum !== undefined;

  const checkIfWalletConnected = async () => {
    if (isMetamaskInstalled) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length <= 0) return console.log("No account found!");
        setCurrentAccount(accounts[0]);
      } catch (e) {
        console.log(e);
        throw new Error("No Ethereum object!");
      }
    }
  };

  const connectWallet = async () => {
    if (isMetamaskInstalled) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
      } catch (e) {
        console.log(e);
        throw new Error("No Ethereum object!");
      }
    }
  };

  const sendTransaction = async () => {
    if (isMetamaskInstalled) {
      try {
        const { addressTo, amount, keyword, message } = formData;
        const transactionContract = getEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);
        console.log("ready to send");
        await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: "0x5208",
              value: parsedAmount._hex,
            },
          ],
        });
        setIsLoading(true);
        const transactionHash = await transactionContract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          amount
        );
        setMessage(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        setIsLoading(false);
        const transactionCount = await transactionContract.getTransactionCount();
        console.log(`Transaction count : ${transactionCount}`);
        setMessage(`Success - ${transactionHash.hash}`);
        setTransactionCount(parseInt(transactionCount));
      } catch (e: any) {
        setMessage(e.message);
        throw new Error("No Ethereum object!");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    checkIfWalletConnected();
    const count = localStorage.getItem("transactionCount");
    count && setTransactionCount(parseInt(count))
  }, []);

  useEffect(() => {
    transactionCount && localStorage.setItem("transactionCount", transactionCount.toString());
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        titleName: "web3 rafi",
        connectWallet,
        currentAccount,
        handleChange,
        formData,
        sendTransaction,
        isLoading,
        message
      }}
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

  return transactionContract;
};
