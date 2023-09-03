import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';

import { itemTagsState } from '@/components/shares/atoms/state/itemTagsState';
import { colorTagsState } from '@/components/shares/atoms/state/colorTagsState';
import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';
import { priceAfterLimitValueState } from '@/components/shares/atoms/state/priceAfterLimitValueState';
import { itemPriceRangeForSliderState } from '@/components/shares/atoms/state/itemPriceRangeForSliderState';

/**
 * 商品検索ページの絞り込み条件を初期化するボタン
 *
 * @example
 * <FilterResetButton />
 */
export const FilterResetButton = () => {
  const setItemTags = useSetRecoilState(itemTagsState);
  const setColorTags = useSetRecoilState(colorTagsState);
  const setFilteredItems = useSetRecoilState(filteredItemsState);
  const setPriceAfterLimitValue = useSetRecoilState(priceAfterLimitValueState);
  const itemPriceRangeForSlider = useRecoilValue(itemPriceRangeForSliderState);

  const onClick = () => {
    setItemTags([]);
    setColorTags([]);
    setFilteredItems([]);
    setPriceAfterLimitValue(itemPriceRangeForSlider);
  };

  return (
    <Button variant="outlined" onClick={onClick}>
      条件をクリア
    </Button>
  );
};
