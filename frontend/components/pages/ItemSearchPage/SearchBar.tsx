import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ItemDataTypes } from '@/components/types/ItemDataTypes'; // この部分は適当に修正してください
import { useRecoilValue } from 'recoil';
import { apiFetchedItemsState } from '@/components/shares/atoms/state/apiFetchedItemsState';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const items = useRecoilValue(apiFetchedItemsState);

  return (
    <Autocomplete
      options={items}
      getOptionLabel={(option) => option.item_name}
      onInputChange={(_, newInputValue) => {
        setSearchTerm(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="商品名で検索" variant="outlined" />
      )}
    />
  );
};

export default SearchBar;
