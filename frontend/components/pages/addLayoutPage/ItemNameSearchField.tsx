import React from 'react';
import { useRecoilState } from 'recoil';
import TextField from '@mui/material/TextField';

import { itemSearchQueryState } from '@/components/shares/atoms/state/itemSearchQueryState';

/**
 * このコンポーネントは、ImageMapTagEditor内で呼び出されます。
 * 商品名で検索するためのテキストフィールドを提供します。
 * ユーザーがテキストフィールドに入力すると、Recoil State（itemSearchQueryState）が更新されます。
 */
export const ItemNameSearchField = () => {
  const [itemSearchQuery, setItemSearchQuery] =
    useRecoilState(itemSearchQueryState);

  return (
    <TextField
      onChange={(e) => setItemSearchQuery(e.target.value)}
      label="商品名で検索"
      variant="outlined"
      value={itemSearchQuery}
      sx={{
        width: 1,
      }}
    />
  );
};
