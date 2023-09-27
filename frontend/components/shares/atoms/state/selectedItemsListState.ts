import { atom } from "recoil";
import { ItemDataType } from "@/components/types/ItemDataType";

/**
 * ユーザーに選択された商品の配列を管理するRecoil State
 */
export const selectedItemsListState = atom({
  key: "selectedItemsListState",
  default: <ItemDataType[]>[],
});
