import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

import { ItemDataType } from '@/components/types/ItemDataType';

import { apiFetchedItemsState } from '@/components/shares/atoms/state/apiFetchedItemsState';
import { categoryValueState } from '@/components/shares/atoms/state/categoryValueState';
import { colorTagsState } from '@/components/shares/atoms/state/colorTagsState';
import { filterSwitchState } from '@/components/shares/atoms/state/filterSwitchState';
import { filteredItemCountState } from '@/components/shares/atoms/state/filteredItemCountState';
import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';
import { initializeFiltersState } from '@/components/shares/atoms/state/initializeFiltersState';
import { itemTagsState } from '@/components/shares/atoms/state/itemTagsState';
import { itemSearchQueryState } from '@/components/shares/atoms/state/itemSearchQueryState';
import { priceAfterLimitValueState } from '@/components/shares/atoms/state/priceAfterLimitValueState';
import { subCategoryValueState } from '@/components/shares/atoms/state/subCategoryValueState';
import { sortPatternValueState } from '@/components/shares/atoms/state/sortPatternValueState';
import { useAllRecoilValuesForSearch } from './useAllRecoilValuesForSearch';

/**
 * 商品一覧のフィルタリングを行うカスタムフック
 *
 * @example
 * const { applyFilters } = useItemFilters();
 * applyFilters();
 */
export const useItemListFilters = () => {
    const setFilteredItems = useSetRecoilState(filteredItemsState);
    const setFilteredItemCount = useSetRecoilState(filteredItemCountState);
    const categoryValue = useRecoilValue(categoryValueState);
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
    const allItemFilterRecoilValues = useAllRecoilValuesForSearch();

    interface TagObject {
        [key: string]: any;
    }
    /**
     * タグによってアイテムの配列をフィルタリングします。
     *
     * @param items - フィルタリング対象のアイテムの配列
     * @param tags - フィルタリングに使用するタグの配列
     * @param tagKey - タグ情報が格納されているアイテムオブジェクトのプロパティ名
     * @param tagNameKey - タグオブジェクト内でタグ名が格納されているプロパティ名
     * @returns - フィルタリングされたアイテムの配列
     *
     * @example
     * // 'or' モードで 'tag1' または 'tag2' を含むアイテムをフィルタリング
     * const filteredItems = filterItemsByTags(originalItems, ['tag1', 'tag2'], 'itemTags', 'tagName');
     */
    const filterItemsByTags = (items: any[], tags: string[], tagKey: string, tagNameKey: string) => {
        return filterSwitch === 'or'
            ? items.filter((item) => tags.some((tag) => item[tagKey].some((tagObj: TagObject) => tagObj[tagNameKey] === tag)))
            : items.filter((item) => tags.every((tag) => item[tagKey].some((tagObj: TagObject) => tagObj[tagNameKey] === tag)));
    };

    /**
     * 一般的なフィルタリング条件を適用する高階関数
     *
     * @param condition - フィルタリング条件を定義する関数
     * @returns - フィルタリング処理を行う関数
     */
    const filterByCondition = (condition: (item: ItemDataType) => boolean) => (items: ItemDataType[]) => {
        return items.filter(condition);
    };

    /**
     *  複数のフィルタリング条件を適用する
     */
    const applyItemFilters = () => {
        let filtered: ItemDataType[] = [...apiFetchedItems];
        if (!initializeFilters) {
            setFilteredItems(filtered);
            setFilteredItemCount(filtered.length);
            return;
        }

        // タグによるフィルタリング
        if (itemTags.length > 0) {
            filtered = filterItemsByTags(filtered, itemTags, 'itemTags', 'itemTagName');
        }
        if (colorTags.length > 0) {
            filtered = filterItemsByTags(filtered, colorTags, 'colorTags', 'colorTagName');
        }

        // フィルタリング関数の配列
        const filters = [
            filterByCondition((item) => categoryValue === 'すべてのカテゴリー' || item.categoryName === categoryValue),
            filterByCondition((item) => !subCategoryValue || subCategoryValue === 'すべてのサブカテゴリー' || item.subCategoryName === subCategoryValue),
            filterByCondition((item) => itemSearchQuery ? item.itemName.includes(itemSearchQuery) : true),
            filterByCondition((item) => item.price >= sliderValue.min && item.price <= sliderValue.max),
            // 並び替え 
            (items: ItemDataType[]): ItemDataType[] => {
                if (sortPatternValue === '新着順') {
                    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                } else if (sortPatternValue === '閲覧数順') {
                    return items.sort((a, b) => b.viewCount - a.viewCount);
                } else if (sortPatternValue === '高い順') {
                    return items.sort((a, b) => b.price - a.price);
                } else if (sortPatternValue === '安い順') {
                    return items.sort((a, b) => a.price - b.price);
                } else {
                    return items.sort((a, b) => b.favoriteCount - a.favoriteCount);
                }
            },
        ];

        // フィルタリング処理
        for (const filter of filters) {
            filtered = filter(filtered);
            if (filtered.length === 0) {
                break; // アイテムが0になった場合、それ以上のフィルタリングは無意味なので処理を中断
            }
        }

        // 絞り込んだ結果をRecoil Stateに保存
        setFilteredItems(filtered);
        setFilteredItemCount(filtered.length);
    };

    // すべてのRecoil Valueが変更されたら、フィルタリングを適用
    useEffect(() => {
        applyItemFilters();
    }, [allItemFilterRecoilValues, itemSearchQuery]);

    return { applyItemFilters };
};