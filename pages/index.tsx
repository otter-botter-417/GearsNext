import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Link from "next/link";

import { NextPage } from "next";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import themeOptions from "@/styles/themes/themeOptions";
import { Typography } from "@mui/material";

const Home: NextPage = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={themeOptions}>
        <App />

        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
        >
          Welcome to my site
          <Link href="/ItemAppendPage">Item Append Page</Link>
          <Link href="/ItemPage">ItemPage</Link>
          <Link href="/SearchPage">SearchPage</Link>
        </Box>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default Home;
