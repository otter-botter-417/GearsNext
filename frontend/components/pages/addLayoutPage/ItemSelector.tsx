import React, { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import { Dialog, DialogTitle, Box, Button, Typography } from '@mui/material';

import { CategoryNameTags } from './CategoryNameTags';
import { ItemsSelectCheckBox } from './ItemsSelectCheckBox';
import { CategoryNameList } from '@/components/shares/atoms/SelectNames/CategoryNameList';
import { selectedItemsListState } from '@/components/shares/atoms/state/selectedItemsListState';

type ItemSelectorProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * このコンポーネントは、レイアウト投稿ページでレイアウトに使用する商品を選択するダイアログUIを提供します。
 * - CategoryNameTags: 商品のカテゴリーを選択するUI。
 * - ItemsSelectCheckBox: 商品を選択するUI。
 * - リセットボタン: 選択した商品をリセットするボタン。
 *
 * @param {boolean} open - ダイアログが開いているかどうか。
 * @param {Function} onClose - ダイアログを閉じる関数。
 *
 * @returns {JSX.Element} 商品選択ダイアログ。
 */
export const ItemSelector: FC<ItemSelectorProps> = ({ open, onClose }) => {
  const setSelectedItemsList = useSetRecoilState(selectedItemsListState);
  const selectCategoryName = ['選択中', 'すべて', ...CategoryNameList];

  const selectReset = () => {
    setSelectedItemsList([]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="body1">
          持っているギアからレイアウトに登録するギアを選択してください。
        </Typography>
      </DialogTitle>
      <CategoryNameTags selectCategoryName={selectCategoryName} />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          maxHeight: '40vh',
          minHeight: '40vh',
        }}
      >
        <ItemsSelectCheckBox />
      </Box>
      <Button onClick={() => selectReset()}>リセット</Button>
    </Dialog>
  );
};
