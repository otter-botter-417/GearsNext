import { useEffect } from 'react'
import { useResetRecoilState, } from 'recoil';

import { textState } from '@/components/shares/atoms/state/textState';
import { imageFileState } from '@/components/shares/atoms/state/imageFileState';
import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';
import { imagePreviewUrlState } from '@/components/shares/atoms/state/imagePreviewUrlState';
import { itemSearchQueryState } from '@/components/shares/atoms/state/itemSearchQueryState';
import { imageMapPositionState } from '@/components/shares/atoms/state/imageMapPositionState';
import { imageMapDataListState } from '@/components/shares/atoms/state/imageMapDataListState';
import { loadingButtonState } from '@/components/shares/atoms/state/loadingButtonState';
import { selectedTabIndexState } from '@/components/shares/atoms/state/selectedTabIndexState';
import { selectedItemsListState } from '@/components/shares/atoms/state/selectedItemsListState';
import { selectedCategoryNameState } from '@/components/shares/atoms/state/selectedCategoryNameState';
import { userInventoryItemListState } from '@/components/shares/atoms/state/userInventoryItemListState';

/**
 * レイアウト登録ページの初期化処理を行うカスタムフック
 * - レイアウト登録ページに遷移した際に、初期化処理を行う
 */
export const useInitAddNewLayoutPage = (
) => {
    const resetText = useResetRecoilState(textState);
    const resetItemList = useResetRecoilState(filteredItemsState);
    const resetImageFile = useResetRecoilState(imageFileState);
    const resetImagePreviewUrl = useResetRecoilState(imagePreviewUrlState);
    const resetItemSearchQuery = useResetRecoilState(itemSearchQueryState);
    const resetImageMapDataList = useResetRecoilState(imageMapDataListState);
    const resetLoadingButtonState = useResetRecoilState(loadingButtonState);
    const resetTextFieldPosition = useResetRecoilState(imageMapPositionState);
    const resetSelectedTabIndex = useResetRecoilState(selectedTabIndexState);
    const resetSelectedItemsList = useResetRecoilState(selectedItemsListState,);
    const resetSelectedCategoryName = useResetRecoilState(selectedCategoryNameState);
    const resetUserInventoryItemList = useResetRecoilState(userInventoryItemListState);


    useEffect(() => {
        resetText();
        resetItemList();
        resetImageFile();
        resetImagePreviewUrl();
        resetItemSearchQuery();
        resetImageMapDataList();
        resetLoadingButtonState();
        resetTextFieldPosition();
        resetSelectedTabIndex();
        resetSelectedItemsList();
        resetSelectedCategoryName();
        resetUserInventoryItemList();
    }, []);
}
