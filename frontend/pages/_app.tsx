// pages/_app.tsx
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import '../styles/global.css';
import { useMediaQuery } from '@mui/material';

import { themeOptions } from '@/styles/themes/themeOptions';
import { NextComponentType, NextPageContext } from 'next';
import { useGetUserApi } from '@/hooks/UserAuth/useGetUserApi';

const theme = createTheme(themeOptions);
interface InsideRecoilRootProps {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: any;
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <InsideRecoilRoot Component={Component} pageProps={pageProps} />
    </RecoilRoot>
  );
}

const InsideRecoilRoot = ({ Component, pageProps }: InsideRecoilRootProps) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const paddingTop = isSmallScreen ? '130px' : '100px'; // こちらの値は実際のヘッダーの高さに合わせて調整してください。
  useGetUserApi();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ pt: paddingTop }}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
};

export default MyApp;
