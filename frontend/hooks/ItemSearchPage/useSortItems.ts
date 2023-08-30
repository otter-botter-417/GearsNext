import { itemPriceRangeForSliderState } from '@/components/shares/atoms/state/itemPriceRangeForSliderState';
import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';
import { itemDataMapState } from '@/components/shares/atoms/itemDataMapState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { itemPriceListForSliderState } from '@/components/shares/atoms/state/itemPriceListForSliderState';
import { sortPatternValueState } from '@/components/shares/atoms/state/sortPatternValueState';
import { ItemDataTypes } from '@/components/types/ItemDataTypes';
/**
 * 商品一覧をソートするカスタムフック
 * @param {string} itemList 商品一覧
 * 
 * @returns {formMethods, onSubmit} フォームのメソッドとonSubmit関数
 */
export const useSortItems = () => {

    const setItemDataMap = useSetRecoilState(itemDataMapState);
    const setItemPriceListForSlider = useSetRecoilState(itemPriceListForSliderState);
    const setItemPriceRangeForSliderState = useSetRecoilState(itemPriceRangeForSliderState);
    const setFilteredItems = useSetRecoilState(filteredItemsState);
    const sortPatternValue = useRecoilValue(sortPatternValueState);
    let sortedItemList: any = [];

    const sortItems = (itemList: any) => {
        //並び替え条件に従って並び替える
        if (sortPatternValue === '高い順') {
            sortedItemList = itemList.slice().sort((a: any, b: any) => b.price - a.price);
        } else if (sortPatternValue === '安い順') {
            sortedItemList = itemList.slice().sort((a: any, b: any) => a.price - b.price);
        }

        //取得データをそれぞれ設定しておく
        setItemDataMap(sortedItemList);
        setFilteredItems(sortedItemList);
        //価格スライダー用

        const prices = sortedItemList.map((item: ItemDataTypes) => item.price);
        setItemPriceListForSlider(prices);
        setItemPriceRangeForSliderState({
            min: Math.min(...prices),
            max: Math.max(...prices),
        }

        );
        return { sortedItemList };
    };
    return { sortedItemList, sortItems };

}





