import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import themeOptions from '@/styles/themes/themeOptions';

import { useGetItems } from '@/hooks/ItemSearchPage/useGetItems';
import { useItemFilters } from '@/hooks/useItemFilters';
import { useAllRecoilValuesForSearch } from '@/hooks/ItemSearchPage/useAllRecoilValuesForSearch';

import { categoryValueState } from '@/components/shares/atoms/state/categoryValueState';
import { errorMessageState } from '@/components/shares/atoms/state/errorMessageState';

import { ItemFilterFields } from '@/components/pages/ItemSearchPage/ItemFilterFields';

/**
 * 商品検索ページ
 */
export const ItemSearchPage = () => {
  const { getItems } = useGetItems();
  const { applyFilters } = useItemFilters();
  const errorMessage = useRecoilValue(errorMessageState);

  // すべてのRecoilの値を一つのオブジェクトで管理
  const allRecoilValues = useAllRecoilValuesForSearch();

  const categoryValue = useRecoilValue(categoryValueState);

  //  商品一覧を取得
  useEffect(() => {
    getItems();
  }, [categoryValue]);

  // エラーメッセージがあれば表示
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  // 商品一覧を絞り込み;
  useEffect(() => {
    applyFilters();
  }, [allRecoilValues]);

  return (
    <Box
      display={'flex'}
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      width={'80%'}
    >
      <ThemeProvider theme={themeOptions}>
        {/* 絞り込み */}
        <ItemFilterFields />
        {/* 絞り込み後の商品表示 */}
        {/* TODO ItemThumbnailGrid　を修正 */}
        {/* <ItemThumbnailGrid /> */}
      </ThemeProvider>
    </Box>
  );
};

export default ItemSearchPage;
