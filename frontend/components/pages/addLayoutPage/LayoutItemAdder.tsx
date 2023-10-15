import React from 'react';
import { Button } from '@mui/material';
import { ItemSelector } from './ItemSelector';
import { useState } from 'react';
import { Box } from '@mui/system';

/**
 * このコンポーネントは、レイアウト投稿ページでレイアウトに登録する商品を選択するUIを提供します。
 * - "レイアウトに商品を追加" ボタン: このボタンをクリックするとItemSelectorが開きます。
 * - ItemSelector: レイアウトに登録商品の選択ができるダイアログです。
 *
 * @returns {JSX.Element} 商品を選択するためのボタンと、商品選択ダイアログ。
 */
export const LayoutItemAdder = () => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  return (
    <Box display={'flex'} height={'80%'} justifyContent={'center'} pt={3}>
      <Button variant="outlined" onClick={() => setIsSelectorOpen(true)}>
        レイアウトにギアを追加
      </Button>
      <ItemSelector
        open={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
      />
    </Box>
  );
};
