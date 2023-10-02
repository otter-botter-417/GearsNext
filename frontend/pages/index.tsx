import React from 'react';
import NextLink from 'next/link';


import { NextPage } from 'next';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { HomeImageGrid } from '@/components/pages/homePage/HomeImageGrid';
import { useFetchHomeDataApi } from '@/hooks/api/useFetchHomeDataApi';

const Home: NextPage = () => {
  //データの取得
  useFetchHomeDataApi();

  return (
    <Box display="flex" justifyContent="center">
      <Box width="80%">
        <NextLink href="/ItemSearchPage">
          <Button variant="outlined">商品を検索する</Button>
        </NextLink>
        <HomeImageGrid />
      </Box>
    </Box>
  );
};

export default Home;
