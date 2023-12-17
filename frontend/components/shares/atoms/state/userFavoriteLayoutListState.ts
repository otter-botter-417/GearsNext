import { UserProfilePageContentType } from "@/components/types/UserProfilePageContentType";
import { atom } from "recoil";

/**
 * ユーザーのお気に入りレイアウトの配列を管理するRecoilのatom
 */
export const userFavoriteLayoutListState = atom({
    key: "userFavoriteLayoutListState",
    default: <UserProfilePageContentType[]>[],
});