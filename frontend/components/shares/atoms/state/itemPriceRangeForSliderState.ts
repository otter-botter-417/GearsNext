import { atom } from "recoil";

/**
 * スライダーの下限、上限を管理するRecoil State
 */
export const itemPriceRangeForSliderState = atom({
  key: "itemPriceRangeForSliderState",
  default: { min: 0, max: 100000 },
});
