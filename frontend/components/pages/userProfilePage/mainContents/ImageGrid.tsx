import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';

import { ContentType } from '@/components/types/ContentType';
import { UserProfilePageContentType } from '@/components/types/UserProfilePageContentType';
import ImageGridViewer from './ImageGridViewer';
import ItemSortControl from './ItemSortControl';

type ImageGridProps = {
  sortedItems: UserProfilePageContentType[];
  type: ContentType;
  sortAscending: boolean;
  handleSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * ソートされたアイテムのリストをグリッド形式で表示します。
 * ImageGridViewer と ItemSortControl コンポーネントを使用し、
 * アイテムのグリッド表示とソートスイッチ機能を提供します。
 *
 * @param sortedItems: ソートされた UserProfilePageContentType オブジェクトの配列
 * @param type: アイテムのタイプ（'item' または 'layout'）
 * @param sortAscending: 現在のソート順 boolean
 * @param handleSwitchChange: ソート順を切り替えるためのハンドラー関数
 *
 * @returns ソートされたアイテムのリストをグリッド形式で表示するコンポーネント。
 */
const ImageGrid: FC<ImageGridProps> = ({
  sortedItems,
  type,
  sortAscending,
  handleSwitchChange,
}) => {
  const imageGridViewer = () => {
    return <ImageGridViewer items={sortedItems} type={type} />;
  };

  const itemSortControl = () => {
    return (
      <ItemSortControl
        sortedItems={sortedItems}
        sortAscending={sortAscending}
        handleSwitchChange={handleSwitchChange}
      />
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {itemSortControl()}
      <Grid container spacing={2}>
        {imageGridViewer()}
      </Grid>
    </Box>
  );
};

export default ImageGrid;
