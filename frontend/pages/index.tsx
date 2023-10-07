import React from 'react';

import { NextPage } from 'next';
import { Box } from '@mui/system';
import { HomeImageGrid } from '@/components/pages/homePage/HomeImageGrid';
import { useFetchHomeDataApi } from '@/hooks/api/useFetchHomeDataApi';

const Home: NextPage = () => {
  //データの取得
  useFetchHomeDataApi();

  return (
    <Box display="flex" justifyContent="center">
      <Box width="80%">
        <HomeImageGrid />
      </Box>
    </Box>
  );
};

export default Home;
