// pages/_app.tsx
import type { AppProps } from 'next/app';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from 'react';
import '../styles/global.css';

import themeOptions from '@/styles/themes/themeOptions';
import { userState } from '@/components/shares/atoms/state/userState';
import { apiGetUser } from '@/hooks/UserAuth/apiGetUser';
import { useRouter } from 'next/router';
import { NextComponentType, NextPageContext } from 'next';

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
  const router = useRouter();
    apiGetUser(); 

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ pt: '64px' }}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
};

export default MyApp;
