import { atom } from "recoil";

/**
 * 商品名で商品検索でするRecoil State
 */
export const itemSearchQueryState = atom({
  key: "itemSearchQueryState",
  default: <string>('')
});
