import { atom } from "recoil";

/**
 * 商品の価格の絞り込み後の値を管理するRecoil State
 * 絞り込み時、価格スライダー値変更時に使用する
 */
export const priceAfterLimitValueState = atom({
  key: "priceAfterLimitValueState",
  default: { min: 0, max: 100000 },
});
