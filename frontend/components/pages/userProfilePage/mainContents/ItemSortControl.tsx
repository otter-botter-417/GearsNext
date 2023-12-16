import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { UserProfilePageContentType } from '@/components/types/UserProfilePageContentType';
import SortToggle from './SortToggle';

type ItemSortControlProps = {
  sortedItems: UserProfilePageContentType[];
  sortAscending: boolean;
  handleSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * アイテムリストの総数と登録日によるソートスイッチを表示します。
 * SortToggle コンポーネントを使用して、アイテムのソート順を切り替える機能を提供します。
 *
 * @param sortedItems: ソートされた UserProfilePageContentType オブジェクトの配列
 * @param sortAscending: 現在のソート順 boolean
 * @param handleSwitchChange: ソート順を切り替えるためのハンドラー関数
 * 
 * @returns アイテムリストの総数と登録日によるソートスイッチを表示するコンポーネント。
 */
const ItemSortControl: FC<ItemSortControlProps> = ({
  sortedItems,
  sortAscending,
  handleSwitchChange,
}) => {
  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1" mr={5}>{sortedItems.length}件</Typography>
      <SortToggle
        switchState={sortAscending}
        handleChange={handleSwitchChange}
        leftLabel={'新'}
        rightLabel={'古'}
      />
    </Box>
  );
};

export default ItemSortControl;
