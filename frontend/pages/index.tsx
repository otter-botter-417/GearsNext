import React from 'react';
import Link from 'next/link';

import { NextPage } from 'next';
import { Box } from '@mui/system';

import { useRecoilState } from 'recoil';
import { userState } from '@/components/atoms/state/userAuth.State';

const Home: NextPage = () => {
  const user = useRecoilState(userState);
  console.log(user);
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
        <Link href="/SearchPage">SearchPage</Link>
        <Link href="/UserRegisterPage">UserRegisterPage</Link>
      </Box>
    </React.StrictMode>
  );
};

export default Home;
