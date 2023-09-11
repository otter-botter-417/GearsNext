import { atom } from "recoil";

/**
 * ユーザーの商品に対する状態を管理するRecoilのatom
 */
export const userItemStatesState = atom({
  key: "userItemStates",
  default: {
    isLoggedIn: false,
    isFavorited: false,
    isInInventory: false,
  },
});
