// pages/_app.tsx
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

import themeOptions from "@/styles/themes/themeOptions";

const theme = createTheme(themeOptions);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Box sx={{ pt: "124px" }}>
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
        </Box>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
