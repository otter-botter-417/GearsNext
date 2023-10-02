import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';

import { itemTagsState } from '@/components/shares/atoms/state/itemTagsState';
import { colorTagsState } from '@/components/shares/atoms/state/colorTagsState';
import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';
import { resetTriggerState } from '@/components/shares/atoms/state/resetTriggerState';
import { categoryValueState } from '@/components/shares/atoms/state/categoryValueState';
import { subCategoryValueState } from '@/components/shares/atoms/state/subCategoryValueState';
import { itemSearchQueryState } from '@/components/shares/atoms/state/itemSearchQueryState';

/**
 * 商品検索ページの絞り込み条件を初期化するボタン
 *
 * @example
 * <FilterResetButton />
 */
export const FilterResetButton = () => {
  const resetItemTags = useResetRecoilState(itemTagsState);
  const resetColorTags = useResetRecoilState(colorTagsState);
  const resetItemSearchQuery = useResetRecoilState(itemSearchQueryState);
  const resetFilteredItems = useResetRecoilState(filteredItemsState);
  const resetCategoryValue = useResetRecoilState(categoryValueState);
  const resetSubCategoryValue = useResetRecoilState(subCategoryValueState);
  const setResetTrigger = useSetRecoilState(resetTriggerState);

  const onClick = () => {
    resetItemTags();
    resetColorTags();
    resetFilteredItems();
    resetCategoryValue();
    resetItemSearchQuery();
    resetSubCategoryValue();
    setResetTrigger((prev) => !prev);
  };

  return (
    <Button variant="outlined" onClick={onClick}>
      条件をクリア
    </Button>
  );
};
