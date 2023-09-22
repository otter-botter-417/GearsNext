import { atom } from "recoil";
import { ItemDataTypes } from "@/components/types/ItemDataTypes";

/**
 * ユーザーに選択された商品の配列を管理するRecoil State
 */
export const selectedItemsListState = atom({
  key: "selectedItemsListState",
  default: <ItemDataTypes[]>[],
});
