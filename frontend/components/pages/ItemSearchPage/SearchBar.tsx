import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { apiFetchedItemsState } from '@/components/shares/atoms/state/apiFetchedItemsState';
import { itemSearchQueryState } from '@/components/shares/atoms/state/itemSearchQueryState';

/**
 * 商品検索ページで商品名で検索するためのコンポーネント
 * オートコンプリート機能付き
 *
 * @example
 * <SearchBar />
 */
export const SearchBar = () => {
  const items = useRecoilValue(apiFetchedItemsState);
  const setItemSearchQuery = useSetRecoilState(itemSearchQueryState);

  return (
    <Autocomplete
      options={items}
      getOptionLabel={(option) => option.item_name}
      onInputChange={(_, newInputValue) => {
        setItemSearchQuery(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="商品名で検索" variant="outlined" />
      )}
      sx={{
        width: 1,
      }}
    />
  );
};
