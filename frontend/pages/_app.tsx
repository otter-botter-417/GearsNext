// pages/_app.tsx
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

import themeOptions from "@/styles/themes/themeOptions";
import AuthProvider from "@/components/atoms/AuthProvider";

const theme = createTheme(themeOptions);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Box sx={{ pt: "64px" }}>
            <CssBaseline />
            <Header />
            <Component {...pageProps} />
          </Box>
        </ThemeProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;
