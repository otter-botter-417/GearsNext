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

/**
 * SSGによる静的サイト生成のための関数
 * @param context - GetStaticPropsContext
 * @returns 静的生成されたプロップス
 */
export async function getStaticProps(context: GetStaticPropsContext) {
  const layoutId = context.params?.layoutId;
  const response = await fetch(API_BASE_URL + `layout/${layoutId}`);
  const itemData = (await response.json()) as LayoutData;

  return {
    props: {
      layoutDetail: itemData.data,
      layoutId: layoutId,
    },
    revalidate: 60, // 30秒間隔で再生成
  };
}

export async function getStaticPaths() {
  const paths = [{ params: { layoutId: '1' } }];

  return {
    paths,
    fallback: 'blocking',
  };
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
          tagPositions={layoutDetail.tagPositions}
        />
      }
      rightSide={<LayoutPageRightOrganism layoutDetail={layoutDetail} />}
      bottom={<LayoutPageSelectedItemImageList />}
    />
  );
};
export default LayoutPage;
