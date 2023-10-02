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
        <Box display="flex" justifyContent="center" pt={3} padding={3}>
          <NextLink href="/ItemSearchPage">
            <Button variant="outlined">商品を探す</Button>
          </NextLink>
        </Box>
        <HomeImageGrid />
      </Box>
    </Box>
  );
};

export default Home;
