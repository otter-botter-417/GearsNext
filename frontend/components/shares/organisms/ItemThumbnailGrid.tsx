import React from 'react';
import { useRecoilValue } from 'recoil';
import Grid from '@mui/material/Grid';

import { ItemDataTypes } from '@/components/types/ItemDataTypes';
import { ItemThumbnail } from '@/components/shares/molecules/ItemThumbnail';
import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';
import { paginationState } from '../atoms/state/paginationState';
import { PaginationControls } from '../molecules/PaginationControls';
import { Box } from '@mui/system';

/**
 * 商品のサムネイル画像と基本情報を並べたグリッド
 * ページネーション機能付き
 *
 * @returns 商品のサムネイルを並べたグリッド
 * @example
 * <ItemThumbnailGrid />
 */
export const ItemThumbnailGrid = () => {
  const filteredItemList = useRecoilValue(filteredItemsState);

  // ページネーションの設定
  const pagination = useRecoilValue(paginationState);
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const currentItems = filteredItemList?.slice(startIndex, endIndex);
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems="center"
    >
      <PaginationControls />
      <Grid
        container
        spacing={2}
        sx={{ position: 'center' }}
        style={{ width: '80%', margin: '0 auto' }}
      >
        {currentItems ? (
          currentItems.map((data: ItemDataTypes, index: number) => (
            <Grid item xs={5} sm={4} md={3} key={index}>
              <ItemThumbnail ItemData={data} key={`item-${index}`} />
            </Grid>
          ))
        ) : (
          <p>No items found</p>
        )}
      </Grid>
      <PaginationControls />
    </Box>
  );
};
