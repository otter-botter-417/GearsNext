import { atom } from "recoil";
import { ItemDataType } from "@/components/types/ItemDataType";

/**
 * APIから取得した商品一覧を管理するRecoil State
 */
export const apiFetchedItemsState = atom({
  key: "apiFetchedItemsState",
  default: <ItemDataType[]>[],
});
