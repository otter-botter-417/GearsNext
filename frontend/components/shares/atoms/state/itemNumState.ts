import { atom } from "recoil";

/**
 * 絞り込み後の商品数を管理するRecoil State
 */
export const itemNumState = atom({
  key: "itemNumState",
  default: 0,
});
