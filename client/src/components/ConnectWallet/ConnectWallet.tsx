import { Button, Typography } from "@mui/material";
import React from "react";
import {
  TransactionContext,
  TransactionContextType,
} from "../../contexts/TransactionContext";

export const ConnectWallet: React.FC = () => {
  const { connectWallet, currentAccount } = React.useContext(
    TransactionContext
  ) as TransactionContextType;
  return (
    <>
      <h1>Welcome to web 3.0</h1>
      {!currentAccount ? (
        <Button
          variant="outlined"
          onClick={async () => {
            console.log("Start connect wallet");
            await connectWallet();
          }}
        >
          Connect Wallet
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};
