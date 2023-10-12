import React from 'react';

import { NextPage } from 'next';
import { Box } from '@mui/system';
import { HomeImageGrid } from '@/components/pages/homePage/HomeImageGrid';
import { useFetchHomeDataApi } from '@/hooks/api/useFetchHomeDataApi';
import { DEFAULT_PAGE_WIDTH } from '@/components/constants';
import { LinkButton } from '@/components/shares/molecules/LinkButton';

const Home: NextPage = () => {
  //データの取得
  useFetchHomeDataApi();

  return (
    <Box display="flex" justifyContent="center">
      <Box width="100%" maxWidth={DEFAULT_PAGE_WIDTH}>
        <LinkButton link="/AddNewItemPage" text={'新規商品登録'} />
        <HomeImageGrid />
      </Box>
    </Box>
  );
};

export default Home;
