import {
  Divider,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { ChangeEvent, FC } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import {
  TransactionContext,
  TransactionContextType,
} from "../../contexts/TransactionContext";

const Container = styled.div`
  .MuiFormControl-root {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
  }
`;

export const TransactionForm: FC = () => {
  const { handleChange, formData, sendTransaction, isLoading, message } =
    React.useContext(TransactionContext) as TransactionContextType;

  const handleSubmit = () => {
    const { addressTo, amount, keyword, message } = formData;
    if (!addressTo || !amount || !keyword || !message) return;
    sendTransaction();
  };

  return (
    <Container>
      <FormControl>
        <OutlinedInput
          required
          name="addressTo"
          placeholder="Address To"
          onChange={handleChange}
        />
        <OutlinedInput
          required
          name="amount"
          type="number"
          placeholder="Amount (ETH)"
          onChange={handleChange}
        />
        <OutlinedInput
          required
          name="keyword"
          placeholder="Keyword (GIF)"
          onChange={handleChange}
        />
        <OutlinedInput
          required
          name="message"
          placeholder="Message"
          onChange={handleChange}
        />
        <Divider variant="middle" />
        <LoadingButton loading={isLoading} variant="outlined" onClick={handleSubmit}>
          Submit
        </LoadingButton>
        {message && <Typography variant="body1">{message}</Typography>}
      </FormControl>
    </Container>
  );
};
