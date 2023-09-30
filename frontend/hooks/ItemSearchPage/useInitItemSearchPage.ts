import { apiFetchedItemsState } from '@/components/shares/atoms/state/apiFetchedItemsState';
import { initializeFiltersState } from '@/components/shares/atoms/state/initializeFiltersState';
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil';
import { useFetchItems } from './useFetchItems';
import { ItemDataType } from '@/components/types/ItemDataType';

/**
 * 商品検索ページの初期化処理を行うカスタムフック
 * - APIから取得した商品一覧をRecoilの状態にセット
 * - フィルターの初期化を行う
 * - 価格スライダーの初期化を行う
 * 
 * @param fetchedItems APIから取得した商品一覧
 */
export const useInitItemSearchPage = (
    fetchedItems: ItemDataType[],
) => {
    const setInitializeFilters = useSetRecoilState(initializeFiltersState);
    const setApiFetchedItems = useSetRecoilState(apiFetchedItemsState);
    const { setPriceInfoForSlider } = useFetchItems();

    useEffect(() => {
        if (fetchedItems) {
            setApiFetchedItems(fetchedItems);
            setPriceInfoForSlider(fetchedItems);
            setInitializeFilters(true);
        }
    }, []);
}
