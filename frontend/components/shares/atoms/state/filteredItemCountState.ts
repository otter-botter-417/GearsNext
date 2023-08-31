import { atom } from "recoil";

/**
 * 絞り込み後の商品数を管理するRecoil State
 */
export const filteredItemCountState = atom({
  key: "filteredItemCountState",
  default: 0,
});
