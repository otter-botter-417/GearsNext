import React from 'react';
import { useRecoilValue } from 'recoil';
import Grid from '@mui/material/Grid';

import { ItemDataTypes } from '@/components/types/ItemDataTypes';
import { ItemThumbnail } from '@/components/shares/molecules/ItemThumbnail';
import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';

/**
 * 商品のサムネイル画像と基本情報を並べたグリッド
 *
 * @returns 商品のサムネイルを並べたグリッド
 * @example
 * <ItemThumbnailGrid />
 */
const ItemThumbnailGrid = () => {
  const filteredItemList = useRecoilValue(filteredItemsState);
  return (
    <Grid
      container
      spacing={2}
      sx={{ position: 'center' }}
      style={{ width: '80%', margin: '0 auto' }}
    >
      {filteredItemList ? (
        filteredItemList.map((data: ItemDataTypes, index: number) => (
          <Grid item xs={5} sm={4} md={3} key={index}>
            <ItemThumbnail ItemData={data} key={`item-${index}`} />
          </Grid>
        ))
      ) : (
        <p>No items found</p>
      )}
    </Grid>
  );
};

export default ItemThumbnailGrid;
