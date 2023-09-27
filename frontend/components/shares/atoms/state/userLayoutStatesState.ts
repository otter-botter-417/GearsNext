import { atom } from "recoil";

/**
 * ユーザーのレイアウトに対する状態を管理するRecoilのatom
 */
export const userLayoutStatesState = atom({
  key: "userLayoutStatesState",
  default: {
    isFavorited: false,
    isInInventory: false,
  },
});
