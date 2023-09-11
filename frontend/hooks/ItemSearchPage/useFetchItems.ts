import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useApiRequest } from '@/hooks/api/useApiRequest';
import { useErrorHandler } from '@/hooks/api/useErrorHandler ';

import { categoryValueState } from '@/components/shares/atoms/state/categoryValueState';
import { apiFetchedItemsState } from '@/components/shares/atoms/state/apiFetchedItemsState';
import { ItemDataTypes } from '@/components/types/ItemDataTypes';
import { itemPriceListForSliderState } from '@/components/shares/atoms/state/itemPriceListForSliderState';
import { itemPriceRangeForSliderState } from '@/components/shares/atoms/state/itemPriceRangeForSliderState';
import { useEffect } from 'react';
import { priceAfterLimitValueState } from '@/components/shares/atoms/state/priceAfterLimitValueState';
import { initializeFiltersState } from '@/components/shares/atoms/state/initializeFiltersState';

/**
 * 商品一覧と価格情報を管理するカスタムフック。
 * カテゴリーが変更された場合、APIから商品一覧を取得する。
 * 
 * @example
 * useGetItems();
 */
export const useFetchItems = () => {
    const { sendRequest } = useApiRequest();
    const { handleError, clearError } = useErrorHandler();

    const categoryValue = useRecoilValue(categoryValueState);
    const setApiFetchedItems = useSetRecoilState(apiFetchedItemsState);
    const setItemPriceListForSlider = useSetRecoilState(itemPriceListForSliderState);
    const setItemPriceRangeForSliderState = useSetRecoilState(itemPriceRangeForSliderState);
    const setPriceAfterLimitValue = useSetRecoilState(priceAfterLimitValueState);
    const initializeFilters = useRecoilValue(initializeFiltersState);


    /**
     * 価格情報を設定するヘルパー関数
     * 商品一覧から価格のみを抽出し、価格スライダーの設定に使用する
     * @param items 商品一覧
     */
    const setPriceInfoForSlider = (items: ItemDataTypes[]) => {
        const prices = items.map(item => item.price);
        setItemPriceListForSlider(prices);
        setItemPriceRangeForSliderState({
            min: Math.min(...prices),
            max: Math.max(...prices),
        });
        setPriceAfterLimitValue({
            min: Math.min(...prices),
            max: Math.max(...prices),
        });

    };

    /**
     * 商品一覧を非同期に取得する。
     * カテゴリーに応じてURLを変更し、APIリクエストを行う。
     */
    const fetchItems = async () => {
        try {
            console.log('fetchItems');
            if (typeof window === 'undefined') return;
            const url = categoryValue !== 'すべてのカテゴリー'
                ? `items?category_name=${categoryValue}`
                : 'items';

            const response = await sendRequest('get', url, []);
            if (!response) {
                handleError(null, 'レスポンスが無効です。');
                return;
            }

            const fetchedItems = response.data.data;
            console.log(response.data.data);
            setApiFetchedItems(fetchedItems);
            setPriceInfoForSlider(fetchedItems);

            // エラーが発生していた場合、エラーをクリアする
            clearError();
        } catch (error) {
            // エラーが発生した場合、エラーを処理する
            handleError(error);
        }
    };

    useEffect(() => {
        if (!initializeFilters) return;
        fetchItems();
    }, [categoryValue]);

    return { setPriceInfoForSlider };
};
