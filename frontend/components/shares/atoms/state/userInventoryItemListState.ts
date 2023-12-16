import { UserProfilePageContentType } from "@/components/types/UserProfilePageContentType";
import { atom } from "recoil";

/**
 * ユーザーの持っている商品の配列を管理するRecoilのatom
 */
export const userInventoryItemListState = atom({
    key: "userInventoryItemListState",
    default: <UserProfilePageContentType[]>[],
});