import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';
import { apiFetchedItemsState } from '@/components/shares/atoms/state/apiFetchedItemsState';
import { itemSearchQueryState } from '@/components/shares/atoms/state/itemSearchQueryState';
import { selectedTabIndexState } from '@/components/shares/atoms/state/selectedTabIndexState';
import { selectedItemsListState } from '@/components/shares/atoms/state/selectedItemsListState';
import { userInventoryItemListState } from '@/components/shares/atoms/state/userInventoryItemListState';

/**
 * 絞り込み条件変更時、商品一覧を絞り込みするカスタムフック
 * レイアウト投稿ページで使用
 * 
 * @example
 * useItemNameFilters();
 */
export const useItemNameFilters = () => {
    const setFilteredItems = useSetRecoilState(filteredItemsState);
    const userInventoryItemList = useRecoilValue(userInventoryItemListState)
    const selectedItemsList = useRecoilValue(selectedItemsListState);

    const apiFetchedItems = useRecoilValue(apiFetchedItemsState);
    const itemSearchQuery = useRecoilValue(itemSearchQueryState);
    const selectedTabIndex = useRecoilValue(selectedTabIndexState);


    /**
     * 商品一覧を絞り込む関数
     */
    const applyFilters = () => {
        let filtered

        //絞り込み条件に応じて商品一覧を変更する
        if (selectedTabIndex === 0) {
            filtered = [...apiFetchedItems];
        } else if (selectedTabIndex === 1) {
            filtered = [...userInventoryItemList]
        } else {
            filtered = [...selectedItemsList]
        }

        //商品名で絞り込む
        if (itemSearchQuery) {
            filtered = filtered.filter((item) => item.itemName.includes(itemSearchQuery));
        }
        setFilteredItems(filtered);
    };
    useEffect(() => {
        applyFilters();
    }, [itemSearchQuery, selectedTabIndex, apiFetchedItems]);

    return { applyFilters };
};