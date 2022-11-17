import { Button, Divider, TextField } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
`;

export const TransactionForm: FC = () => {
  return (
    <Container>
      <TextField
        required
        id="outlined-required"
        label="Address To"
        placeholder="0x7187abckasd...."
      />
      <TextField
        required
        id="outlined-required"
        label="Amount (ETH)"
        placeholder="0"
      />
      <TextField
        required
        id="outlined-required"
        label="Keyword (GIF)"
        placeholder="Gif name..."
      />
      <TextField
        required
        id="outlined-required"
        label="Message"
        placeholder="Type message..."
      />
      <Divider variant="middle" />
      <Button variant="contained">Submit</Button>
    </Container>
  );
};
