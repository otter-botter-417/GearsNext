import { atom } from "recoil";

/**
 * ユーザーに選択されたカテゴリー名の状態を管理するRecoilのatom
 */
export const selectedCategoryNameState = atom({
  key: "selectedCategoryNameState",
  default: 'すべて',
});
