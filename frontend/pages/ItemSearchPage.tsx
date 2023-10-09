import React from 'react';
import { useRecoilValue } from 'recoil';

import { useItemListFilters } from '@/hooks/ItemSearchPage/useItemListFilters';
import { useInitItemSearchPage } from '@/hooks/ItemSearchPage/useInitItemSearchPage';

import { API_BASE_URL } from '@/components/constants';
import { ItemDataType } from '@/components/types/ItemDataType';
import { errorMessageState } from '@/components/shares/atoms/state/errorMessageState';
import { ItemFilterFields } from '@/components/pages/ItemSearchPage/ItemFilterFields';
import { ItemThumbnailGrid } from '@/components/shares/organisms/ItemThumbnailGrid';
import { ItemSearchPageTemplate } from '@/components/templates/ItemSearchPageTemplate';

/**
 * ビルド時に初期の商品リストを取得する（SSG）。
 * 取得した商品はプロップとしてコンポーネントに渡されます。
 * @returns  取得した商品と再検証時間を含むプロップ。
 */
export async function getStaticProps(): Promise<{
  props: {
    fetchedItems: ItemDataType[];
  };
  revalidate: number;
}> {
  const response = await fetch(API_BASE_URL + 'items');
  const itemData = await response.json();

  if (!itemData || !itemData.data) {
    console.error('無効なデータ構造:', itemData);
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
    revalidate: 3600, // 60秒ごとに再検証
  };
}

/**
 * 商品検索ページのメインコンポーネント。
 * - 取得した商品でページを初期化
 * - 商品のフィルタリングを処理
 * - フィルタリングされた商品を表示
 *
 * @param fetchedItems SSGで取得した商品リスト
 */
export const ItemSearchPage = ({
  fetchedItems,
}: {
  fetchedItems: ItemDataType[];
}) => {
  const errorMessage = useRecoilValue(errorMessageState);

  // 取得した商品でページを初期化
  useInitItemSearchPage(fetchedItems);

  // 商品のフィルタリングロジックを処理
  useItemListFilters();

  // エラーメッセージがあれば表示
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <ItemSearchPageTemplate
      filterSection={<ItemFilterFields />}
      itemGridSection={<ItemThumbnailGrid />}
    />
  );
};

export default ItemSearchPage;
