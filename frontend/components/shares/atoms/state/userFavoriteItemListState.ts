import { UserProfilePageContentType } from "@/components/types/UserProfilePageContentType";
import { atom } from "recoil";

/**
 * ユーザーのお気に入り商品の配列を管理するRecoilのatom
 */
export const userFavoriteItemListState = atom({
    key: "userFavoriteItemListState",
    default: <UserProfilePageContentType[]>[],
});