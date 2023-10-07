import React from 'react';

import { NextPage } from 'next';
import { Box } from '@mui/system';
import { HomeImageGrid } from '@/components/pages/homePage/HomeImageGrid';
import { useFetchHomeDataApi } from '@/hooks/api/useFetchHomeDataApi';
import { DEFAULT_PAGE_WIDTH } from '@/components/constants';

const Home: NextPage = () => {
  //データの取得
  useFetchHomeDataApi();

  return (
    <Box display="flex" justifyContent="center">
      <Box width="80%" maxWidth={DEFAULT_PAGE_WIDTH}>
        <HomeImageGrid />
      </Box>
    </Box>
  );
};

export default Home;
