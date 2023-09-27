import React from 'react';
import Link from 'next/link';

import { NextPage } from 'next';
import { Box } from '@mui/system';
import { useRecoilValue } from 'recoil';
import { userState } from '@/components/shares/atoms/state/userState';

const Home: NextPage = () => {
  const user = useRecoilValue(userState);
  return (
    <React.StrictMode>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems="center"
        justifyContent="center"
      >
        {user && user ? 'ログイン済み' : '未ログイン'}
        {/* 各ページヘのリンク */}
        <Link href="/AddNewItemPage">AddNewItemPage</Link>
        <Link href="/AddNewLayoutPage">AddNewLayoutPage</Link>
        <Link href="/ItemPage">ItemPage</Link>
        <Link href="/ItemSearchPage">ItemSearchPage</Link>
        <Link href="/UserRegisterPage">UserRegisterPage</Link>
      </Box>
    </React.StrictMode>
  );
};

export default Home;
