import React from 'react';
import { useRecoilState } from 'recoil';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';

import { itemSearchQueryState } from '@/components/shares/atoms/state/itemSearchQueryState';

/**
 * 商品名で検索するためのテキストフィールドを提供します。
 * このコンポーネントは、ImageMapTagEditor内で呼び出されます。
 * ユーザーがテキストフィールドに入力すると、Recoil State（itemSearchQueryState）が更新されます。
 * ユーザーがテキストフィールドのリセットボタンをクリックすると、Recoil State（itemSearchQueryState）が初期化されます。
 */
export const ItemNameSearchField = () => {
  const [itemSearchQuery, setItemSearchQuery] =
    useRecoilState(itemSearchQueryState);

  const inputTextReset = () => {
    setItemSearchQuery('');
  };

  return (
    <TextField
      onChange={(e) => setItemSearchQuery(e.target.value)}
      label="商品名で検索"
      variant="outlined"
      value={itemSearchQuery}
      sx={{ width: 1 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear search query"
              edge="end"
              onClick={inputTextReset}
              size="large"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
