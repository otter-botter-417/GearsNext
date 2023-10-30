import React from 'react';
import fetch from 'node-fetch';
import { GetStaticPropsContext } from 'next';

import { useLayoutShowApi } from '@/hooks/api/useLayoutShowApi';

import { API_BASE_URL } from '@/components/constants';
import { LayoutDataType } from '@/components/types/LayoutDataType';

import { LayoutPageTemplate } from '@/components/templates/LayoutPageTemplate';
import { LayoutPageRightOrganism } from '@/components/pages/layoutPage/LayoutPageRightOrganism';
import { LayoutImageOnTagImageMap } from '@/components/pages/layoutPage/LayoutImageOnTagImageMap';
import { LayoutPageSelectedItemImageList } from '@/components/pages/layoutPage/LayoutPageSelectedItemImageList';

interface LayoutData {
  data: {
    data: LayoutDataType;
  };
}
interface ApiResponse {
  data: LayoutDataType[];
}
/**
 * SSGによる静的サイト生成のための関数
 * @param context - GetStaticPropsContext
 * @returns 静的生成されたプロップス
 */
export async function getStaticProps(context: GetStaticPropsContext) {
  const layoutId = context.params?.layoutId;
  try {
    const response = await fetch(API_BASE_URL + `layout/${layoutId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const itemData = (await response.json()) as LayoutData;
    if (!itemData || !itemData.data) {
      throw new Error('Invalid data format');
    }
    return {
      props: {
        layoutDetail: itemData.data,
        layoutId: layoutId,
      },
      revalidate: 60, // 30秒間隔で再生成
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    // APIからすべてのlayoutIdを取得
    const response = await fetch(API_BASE_URL + 'layout');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = (await response.json()) as ApiResponse;
    if (!data || !Array.isArray(data.data)) {
      throw new Error('Invalid data format');
    }

    const layouts: LayoutDataType[] = data.data;

    // 取得したlayoutIdをもとにpathsを生成
    const paths = layouts.map((layout: LayoutDataType) => ({
      params: { layoutId: layout.layoutId.toString() },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error(error);
    return { paths: [], fallback: 'blocking' };
  }
}

/**
 * レイアウト詳細ページ
 * ユーザーのレイアウトに対する状態(いいね、持っているもの)以外は静的サイト生成で表示
 * ユーザーのレイアウトに対する状態はクライアントサイドで取得
 *
 * @param layoutDetail - レイアウトの詳細データ
 * @param layoutId - レイアウトのID
 * @returns レイアウト詳細ページのReact要素
 */
export const LayoutPage = ({
  layoutDetail,
  layoutId,
}: {
  layoutDetail: LayoutDataType;
  layoutId: string;
}) => {
  useLayoutShowApi(layoutId);

  return (
    <LayoutPageTemplate
      leftSide={
        <LayoutImageOnTagImageMap
          layoutId={layoutDetail.layoutId}
          imageName={layoutDetail.imageName}
          tagPositions={layoutDetail.tagPositions}
        />
      }
      rightSide={<LayoutPageRightOrganism />}
      bottom={<LayoutPageSelectedItemImageList />}
    />
  );
};
export default LayoutPage;
