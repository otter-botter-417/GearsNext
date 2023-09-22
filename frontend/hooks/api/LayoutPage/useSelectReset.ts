import { selectedItemsState } from "@/components/shares/atoms/state/selectedItemsState";
import { userInventoryItemListState } from "@/components/shares/atoms/state/userInventoryItemListState";
import { useRecoilState, useRecoilValue } from "recoil";

export const useSelectReset = () => {
    const [checkedItems, setCheckedItems] = useRecoilState(selectedItemsState);
    const userInventoryItemList = useRecoilValue(userInventoryItemListState);

    const initialCheckedState = userInventoryItemList.reduce((acc, item) => {
        return {
            ...acc,
            [item.itemId]: {
                ...checkedItems[item.itemId],
                selected: false,
                isPosition: false,
                position: { x: 0, y: 0 }
            },
        };
    }, {});
    setCheckedItems(initialCheckedState);
};