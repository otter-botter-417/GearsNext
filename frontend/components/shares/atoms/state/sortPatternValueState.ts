import { atom } from "recoil";

/**
 * 商品一覧を絞り込む値を管理するRecoil State
 */
export const sortPatternValueState = atom({
  key: "sortPatternValueState",
  default: "閲覧数",
});
