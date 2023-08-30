import { atom } from "recoil";

/**
 * 商品の価格のリストを管理するRecoil State
 * 価格のリストはスライダーの価格帯の集計に使用する
 */
export const itemPriceListForSliderState = atom({
  key: "itemPriceListForSliderState",
  default: <number[]>[],
});
