import { UserProfilePageContentType } from "@/components/types/UserProfilePageContentType";
import { atom } from "recoil";

/**
 * ユーザーの投稿したレイアウトの配列を管理するRecoilのatom
 * ユーザー管理画面で使用
 */
export const userLayoutListState = atom({
    key: "userLayoutListState",
    default: <UserProfilePageContentType[]>[],
});