import React from 'react';
import { useRecoilValue } from 'recoil';
import { Box } from '@mui/material';

import { useFetchItems } from '@/hooks/ItemSearchPage/useFetchItems';
import { useItemFilters } from '@/hooks/ItemSearchPage/useItemFilters';

import { errorMessageState } from '@/components/shares/atoms/state/errorMessageState';

import { ItemFilterFields } from '@/components/pages/ItemSearchPage/ItemFilterFields';

/**
 * 商品検索ページ
 */
// サブカテゴリーが変更されたとき、商品一覧を取得
export const ItemSearchPage = () => {
  const errorMessage = useRecoilValue(errorMessageState);

  //  カテゴリーが変更されたとき、商品一覧を取得
  useFetchItems();

  // 絞り込み条件が変更されたとき、商品一覧を絞り込み
  useItemFilters();

  // エラーメッセージがあれば表示
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <Box
      display={'flex'}
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      width={'100%'}
    >
      {/* 絞り込み */}
      <ItemFilterFields />
      {/* 絞り込み後の商品表示 */}
      {/* TODO ItemThumbnailGrid　を修正 */}
      {/* </ThemeProvider> */}
    </Box>
  );
};

export default ItemSearchPage;
