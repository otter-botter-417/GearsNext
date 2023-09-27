import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Box } from '@mui/material';

import { useFetchItems } from '@/hooks/ItemSearchPage/useFetchItems';
import { useItemFilters } from '@/hooks/ItemSearchPage/useItemFilters';

import { errorMessageState } from '@/components/shares/atoms/state/errorMessageState';

import { ItemFilterFields } from '@/components/pages/ItemSearchPage/ItemFilterFields';
import { ItemThumbnailGrid } from '@/components/shares/organisms/ItemThumbnailGrid';
import { useFlashBackgroundOnRender } from '@/hooks/useFlashBackgroundOnRender';
import { GetStaticPropsContext } from 'next';
import { apiFetchedItemsState } from '@/components/shares/atoms/state/apiFetchedItemsState';
import { ItemDataTypes } from '@/components/types/ItemDataTypes';
import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';
import { initializeFiltersState } from '@/components/shares/atoms/state/initializeFiltersState';
import { API_BASE_URL } from '@/components/constants';

/**
 * 商品検索ページ
 */
// サブカテゴリーが変更されたとき、商品一覧を取得
// SSG　静的サイト生成のための関数　ビルド時に取得したデータをpropsとして渡す
export async function getStaticProps() {
  const response = await fetch(API_BASE_URL + 'items');
  const itemData = await response.json();

  if (!itemData || !itemData.data) {
    console.error('Invalid data structure:', itemData);
    return {
      props: {
        fetchedItems: [],
      },
      revalidate: 3600,
    };
  }

  return {
    props: {
      fetchedItems: itemData.data,
    },
    revalidate: 3600, // 60秒間隔で再生成
  };
}

export const ItemSearchPage = ({
  fetchedItems,
}: {
  fetchedItems: ItemDataTypes[];
}) => {
  const errorMessage = useRecoilValue(errorMessageState);
  // TODO カテゴリーが変更されたとき、サブカテゴリーを変更する
  // サブカテゴリーにすべてを追加する
  // 絞り込み見直し　多分おかしい

  const backgroundColor = useFlashBackgroundOnRender();
  const setInitializeFilters = useSetRecoilState(initializeFiltersState);
  const setApiFetchedItems = useSetRecoilState(apiFetchedItemsState);

  //  カテゴリーが変更されたとき、商品一覧を取得
  const { setPriceInfoForSlider } = useFetchItems();

  // 絞り込み条件が変更されたとき、商品一覧を絞り込み
  useItemFilters();

  // 初回レンダリング時だけSSGで取得した商品一覧をセット
  useEffect(() => {
    if (fetchedItems) {
      setApiFetchedItems(fetchedItems);
      setPriceInfoForSlider(fetchedItems);
      setInitializeFilters(true);
    }
  }, []);

  // エラーメッセージがあれば表示
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="flashBackground" style={{ backgroundColor }}>
      <Box flexDirection="column">
        {/* 絞り込み */}
        <ItemFilterFields />
        {/* 絞り込み後の商品表示 */}
        <ItemThumbnailGrid />
      </Box>
    </div>
  );
};

export default ItemSearchPage;
