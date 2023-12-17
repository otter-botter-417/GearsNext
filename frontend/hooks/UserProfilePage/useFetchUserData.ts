import { selectedListState } from "@/components/shares/atoms/state/selectedListState";
import { useRecoilValue } from "recoil";
import { useFetchUserInventory } from "../api/useFetchUserInventory";
import { useFetchUserFavoriteItem } from "../api/useFetchUserFavoriteItem";
import { useFetchUserFavoriteLayout } from "../api/useFetchUserFavoriteLayout";
import { useFetchUserLayout } from "../api/useFetchUserLayout";

const useFetchUserData = (): string => {
    const selectedIndex = useRecoilValue(selectedListState);

    //TODO APIをまとめるて１回で取得するようにする
    // useFetchUserInventory();
    // useFetchUserFavoriteItem();
    // useFetchUserFavoriteLayout();
    // useFetchUserLayout();

    return selectedIndex;
}
export default useFetchUserData;