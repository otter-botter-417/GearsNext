import React from 'react';
import Link from 'next/link';

import { NextPage } from 'next';
import { Box } from '@mui/system';

const Home: NextPage = () => {
  return (
    <React.StrictMode>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems="center"
        justifyContent="center"
      >
        Welcome to my site
        {/* 各ページヘのリンク */}
        <Link href="/AddNewItemPage">AddNewItemPage</Link>
        <Link href="/ItemPage">ItemPage</Link>
        <Link href="/ItemSearchPage">ItemSearchPage</Link>
        <Link href="/UserRegisterPage">UserRegisterPage</Link>
      </Box>
    </React.StrictMode>
  );
};

export default Home;
