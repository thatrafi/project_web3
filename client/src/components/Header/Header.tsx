import { FC } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  TransactionContext,
  TransactionContextType,
} from "../../contexts/TransactionContext";

export const Header: FC = () => {
  const { titleName, currentAccount } = React.useContext(
    TransactionContext
  ) as TransactionContextType;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {titleName}
          </Typography>
          <Button color="inherit">{currentAccount || "Login"}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
