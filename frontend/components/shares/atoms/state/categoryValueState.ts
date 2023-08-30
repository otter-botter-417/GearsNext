import { atom } from "recoil";

/**
 * カテゴリーの値を管理するRecoil State
 */
export const categoryValueState = atom({
  key: "categoryValueState",
  default: "すべてのカテゴリー",
});
