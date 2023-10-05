import { atom } from "recoil";

/**
 * ボタンのローディング状態を管理するRecoil State
 * ローディング中はボタンを押せないようにする
 */
export const loadingButtonState = atom({
  key: "loadingButtonState",
  default: false,
});
