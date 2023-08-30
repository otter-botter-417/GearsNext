import { atom } from "recoil";
import { ItemDataTypes } from "@/components/types/ItemDataTypes";

/**
 * APIから取得した商品一覧を管理するRecoil State
 */
export const apiFetchedItemsState = atom({
  key: "apiFetchedItemsState",
  default: <ItemDataTypes[]>[],
});
