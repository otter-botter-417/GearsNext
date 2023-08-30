import { colorTagsState } from '@/components/shares/atoms/state/colorTagsState';
import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';
import { itemTagsState } from '@/components/shares/atoms/state/itemTagsState';
import { itemPriceRangeForSliderState } from '@/components/shares/atoms/state/itemPriceRangeForSliderState';
import { sliderValueState } from '@/components/shares/atoms/state/sliderValueState';
import { Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';

/**
 * 商品検索ページの絞り込み条件を初期化するボタン
 */
export const FilterResetButton = () => {
  const setItemPriceRangeForSliderState = useSetRecoilState(
    itemPriceRangeForSliderState,
  );
  const setSliderValue = useSetRecoilState(sliderValueState);
  const setItemTags = useSetRecoilState(itemTagsState);
  const setColorTags = useSetRecoilState(colorTagsState);
  const setFilteredItems = useSetRecoilState(filteredItemsState);

  const onClick = () => {
    setItemPriceRangeForSliderState({ min: 0, max: 100000 });
    setSliderValue([0, 1000000]);
    setItemTags([]);
    setColorTags([]);
    setFilteredItems([]);
  };

  return (
    <Button variant="outlined" onClick={onClick}>
      条件をクリア
    </Button>
  );
};
