import { atom } from "recoil";

/**
 * ユーザーに選択されたリストの値を管理するRecoil State
 * ユーザー管理画面のリストで使用
 */
export const selectedListState = atom({
    key: "selectedListState",
    default: "お気に入り",
});
