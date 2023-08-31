import { useRecoilValue, useSetRecoilState } from 'recoil';

import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';
import { subCategoryValueState } from '@/components/shares/atoms/state/subCategoryValueState';
import { sliderValueState } from '@/components/shares/atoms/state/sliderValueState';
import { itemTagsState } from '@/components/shares/atoms/state/itemTagsState';
import { colorTagsState } from '@/components/shares/atoms/state/colorTagsState';
import { sortPatternValueState } from '@/components/shares/atoms/state/sortPatternValueState';
import { filteredItemCountState } from '@/components/shares/atoms/state/filteredItemCountState';
import { filterSwitchState } from '@/components/shares/atoms/state/filterSwitchState';
import { apiFetchedItemsState } from '@/components/shares/atoms/state/apiFetchedItemsState';
import { useEffect } from 'react';
import { useAllRecoilValuesForSearch } from './ItemSearchPage/useAllRecoilValuesForSearch';

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
    const sliderValue = useRecoilValue(sliderValueState);
    const itemTags = useRecoilValue(itemTagsState);
    const colorTags = useRecoilValue(colorTagsState);
    const sortPatternValue = useRecoilValue(sortPatternValueState);
    const filterSwitch = useRecoilValue(filterSwitchState);
    const apiFetchedItems = useRecoilValue(apiFetchedItemsState);
    // すべてのRecoilの値を一つのオブジェクトで管理
    const allRecoilValues = useAllRecoilValuesForSearch();
    interface TagObject {
        [key: string]: any;
    }
    /**
    * 共通のフィルタリングロジック
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

        // サブカテゴリーが選択されている場合は、サブカテゴリーで絞り込む
        if (subCategoryValue) {
            filtered = filtered.filter((item) => item.sub_category_name === subCategoryValue);
        }

        // スライダーの値が設定されている場合は、価格で絞り込む
        if (sliderValue) {
            const [min, max] = sliderValue;
            filtered = filtered.filter((item) => item.price >= min && item.price <= max);
        }

        // 商品タグが設定されている場合は、商品タグで絞り込む
        if (itemTags.length > 0) {
            filtered = filterItemsByTags(filtered, itemTags, 'item_tags', 'item_tag_name');
        }

        // カラータグが設定されている場合は、カラータグで絞り込む
        if (colorTags.length > 0) {
            filtered = filterItemsByTags(filtered, colorTags, 'color_tags', 'color_tag_name');
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
    }, [allRecoilValues]);

    return { applyFilters };
};