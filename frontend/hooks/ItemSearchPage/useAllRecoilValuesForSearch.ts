// useAllRecoilValuesForSearch.js
import { useRecoilValue } from 'recoil';

import { subCategoryValueState } from '@/components/shares/atoms/state/subCategoryValueState';
import { itemTagsState } from '@/components/shares/atoms/state/itemTagsState';
import { colorTagsState } from '@/components/shares/atoms/state/colorTagsState';
import { filterSwitchState } from '@/components/shares/atoms/state/filterSwitchState';
import { sliderValueState } from '@/components/shares/atoms/state/sliderValueState';
import { sortPatternValueState } from '@/components/shares/atoms/state/sortPatternValueState';
import { apiFetchedItemsState } from '@/components/shares/atoms/state/apiFetchedItemsState';

/**
 * 商品検索ページで使用するRecoilの状態をまとめて取得するカスタムフック
 * applyFiltersを呼び出すために必要な状態をまとめて取得する
 * @returns {subCategoryValue, itemTags, colorTags, filterSwitch, sliderValue, sortPatternValue, itemList} 商品検索ページで使用するRecoilの状態
 * @example
 *   useEffect(() => {
 *  applyFilters(itemList);
 *  }, [allRecoilValues]);
 */
export const useAllRecoilValuesForSearch = () => {
    const subCategoryValue = useRecoilValue(subCategoryValueState);
    const itemTags = useRecoilValue(itemTagsState);
    const colorTags = useRecoilValue(colorTagsState);
    const filterSwitch = useRecoilValue(filterSwitchState);
    const sliderValue = useRecoilValue(sliderValueState);
    const sortPatternValue = useRecoilValue(sortPatternValueState);
    const itemList = useRecoilValue(apiFetchedItemsState);

    return {
        subCategoryValue,
        itemTags,
        colorTags,
        filterSwitch,
        sliderValue,
        sortPatternValue,
        itemList,
    };
};
