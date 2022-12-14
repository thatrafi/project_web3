import { Button } from "@mui/material";
import Head from "next/head";
import { Header } from "../src/components/Header";
import { TransactionForm } from "../src/components/TransactionForm";
import styled from "styled-components";

const Main = styled.div`
  padding: 3rem;
`;

export const Home = () => {
  return (
    <div>
      <Head>
        <title>Project Web3.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Main>
        <h1>Welcome to web 3.0</h1>
        <Button variant="outlined">Connect Wallet</Button>
        <TransactionForm />
      </Main>

      <footer></footer>
    </div>
  );
};

export default Home;
