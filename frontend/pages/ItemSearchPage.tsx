import React from 'react';
import { useRecoilValue } from 'recoil';
import { Box } from '@mui/material';

import { useFetchItems } from '@/hooks/ItemSearchPage/useFetchItems';
import { useItemFilters } from '@/hooks/ItemSearchPage/useItemFilters';

import { errorMessageState } from '@/components/shares/atoms/state/errorMessageState';

import { ItemFilterFields } from '@/components/pages/ItemSearchPage/ItemFilterFields';
import { ItemThumbnailGrid } from '@/components/shares/organisms/ItemThumbnailGrid';
import { useFlashBackgroundOnRender } from '@/hooks/useFlashBackgroundOnRender';

/**
 * 商品検索ページ
 */
// サブカテゴリーが変更されたとき、商品一覧を取得

export const ItemSearchPage = () => {
  const errorMessage = useRecoilValue(errorMessageState);
  // TODO カテゴリーが変更されたとき、サブカテゴリーを変更する
  // サブカテゴリーにすべてを追加する
  // 絞り込み見直し　多分おかしい

  //  カテゴリーが変更されたとき、商品一覧を取得
  useFetchItems();

  // 絞り込み条件が変更されたとき、商品一覧を絞り込み
  useItemFilters();

  // エラーメッセージがあれば表示
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  // レンダリング時に背景をフラッシュさせる
  const backgroundColor = useFlashBackgroundOnRender();

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
