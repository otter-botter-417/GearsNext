import React from 'react';

import { NextPage } from 'next';
import { Box } from '@mui/system';
import { HomeImageGrid } from '@/components/pages/homePage/HomeImageGrid';
import { useFetchHomeDataApi } from '@/hooks/api/useFetchHomeDataApi';
import { API_BASE_URL, DEFAULT_PAGE_WIDTH } from '@/components/constants';
import { LinkButton } from '@/components/shares/molecules/LinkButton';
import { HomeDataType } from '@/components/types/HomeDataType';
import { useSetRecoilState } from 'recoil';
import { homeDataState } from '@/components/shares/atoms/state/homeDataState';

interface HomeData {
  data: {
    data: HomeDataType;
  };
}
/**
 * SSGによる静的サイト生成のための関数
 * @param context - GetStaticPropsContext
 * @returns 静的生成されたプロップス
 */
export async function getStaticProps() {
  try {
    const response = await fetch(API_BASE_URL + 'home');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const homeData = (await response.json()) as HomeData;
    if (!homeData || !homeData.data) {
      throw new Error('Invalid data format');
    }
    return {
      props: {
        homeData: homeData.data,
      },
      revalidate: 60, // 60秒間隔で再生成
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

const Home = ({ homeData }: { homeData: HomeDataType }) => {
  //データの取得
  // useFetchHomeDataApi();
  const setHomeItemData = useSetRecoilState(homeDataState);
  setHomeItemData(homeData);

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
