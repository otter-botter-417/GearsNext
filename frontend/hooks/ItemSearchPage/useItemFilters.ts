import { useRecoilValue, useSetRecoilState } from 'recoil';

import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';
import { subCategoryValueState } from '@/components/shares/atoms/state/subCategoryValueState';
import { priceAfterLimitValueState } from '@/components/shares/atoms/state/priceAfterLimitValueState';
import { itemTagsState } from '@/components/shares/atoms/state/itemTagsState';
import { colorTagsState } from '@/components/shares/atoms/state/colorTagsState';
import { sortPatternValueState } from '@/components/shares/atoms/state/sortPatternValueState';
import { filteredItemCountState } from '@/components/shares/atoms/state/filteredItemCountState';
import { filterSwitchState } from '@/components/shares/atoms/state/filterSwitchState';
import { apiFetchedItemsState } from '@/components/shares/atoms/state/apiFetchedItemsState';
import { useEffect } from 'react';
import { useAllRecoilValuesForSearch } from './useAllRecoilValuesForSearch';
import { itemSearchQueryState } from '@/components/shares/atoms/state/itemSearchQueryState';
import { initializeFiltersState } from '@/components/shares/atoms/state/initializeFiltersState';

/**
 * 絞り込み条件変更時、商品一覧を絞り込みするカスタムフック
 * 
 * @example
 * useItemFilters();
 */
export const useItemFilters = () => {
    const setFilteredItems = useSetRecoilState(filteredItemsState);
    const setFilteredItemCount = useSetRecoilState(filteredItemCountState);
    const subCategoryValue = useRecoilValue(subCategoryValueState);
    const sliderValue = useRecoilValue(priceAfterLimitValueState);
    const itemTags = useRecoilValue(itemTagsState);
    const colorTags = useRecoilValue(colorTagsState);
    const sortPatternValue = useRecoilValue(sortPatternValueState);
    const filterSwitch = useRecoilValue(filterSwitchState);
    const apiFetchedItems = useRecoilValue(apiFetchedItemsState);
    const itemSearchQuery = useRecoilValue(itemSearchQueryState);
    const initializeFilters = useRecoilValue(initializeFiltersState);

    // すべてのRecoilの値を一つのオブジェクトで管理
    const allRecoilValues = useAllRecoilValuesForSearch();
    interface TagObject {
        [key: string]: any;
    }
    /**
    * 共通のタグフィルタリングロジック
    * @param items フィルタリング対象のアイテム
    * @param tags フィルタリングに使用するタグ
    * @param tagKey タグのプロパティ名
    * @returns フィルタリングされたアイテム
    */
    const filterItemsByTags = (items: any[], tags: string[], tagKey: string, tagNameKey: string) => {
        return filterSwitch === 'or'
            ? items.filter((item) => tags.some((tag) => item[tagKey].some((tagObj: TagObject) => tagObj[tagNameKey] === tag)))
            : items.filter((item) => tags.every((tag) => item[tagKey].some((tagObj: TagObject) => tagObj[tagNameKey] === tag)));
    };

    /**
     * 商品一覧を絞り込む関数
     */
    const applyFilters = () => {
        let filtered = [...apiFetchedItems];
        if (!initializeFilters) {
            setFilteredItems(filtered);
            setFilteredItemCount(filtered.length);
            return
        };


        // サブカテゴリーが選択されている場合は、サブカテゴリーで絞り込む
        if (subCategoryValue) {
            filtered = filtered.filter((item) => item.subCategoryName === subCategoryValue);
        }

        //商品名で絞り込む
        if (itemSearchQuery) {
            filtered = filtered.filter((item) => item.itemName.includes(itemSearchQuery));
        }

        // スライダーの値が設定されている場合は、価格で絞り込む

        filtered = filtered.filter((item) => item.price >= sliderValue.min && item.price <= sliderValue.max);


        // 商品タグが設定されている場合は、商品タグで絞り込む
        if (itemTags.length > 0) {
            filtered = filterItemsByTags(filtered, itemTags, 'itemTags', 'itemTagName');
        }

        // カラータグが設定されている場合は、カラータグで絞り込む
        if (colorTags.length > 0) {
            filtered = filterItemsByTags(filtered, colorTags, 'colorTags', 'colorTagName');
        }

        // 並び替えパターンが設定されている場合は、並び替える
        if (sortPatternValue) {
            const sortFunc = sortPatternValue === '高い順'
                ? (a: any, b: any) => b.price - a.price
                : (a: any, b: any) => a.price - b.price;
            filtered.sort(sortFunc);
        }

        setFilteredItems(filtered);
        setFilteredItemCount(filtered.length);
    };
    useEffect(() => {
        applyFilters();
    }, [allRecoilValues, itemSearchQuery]);

    return { applyFilters };
};