import { atom } from "recoil";
import { ItemDataTypes } from "@/components/types/ItemDataTypes";

/**
 * アイテム詳細のデータを管理するRecoilのatom
 */
export const itemDetailState = atom<ItemDataTypes | null>({
  key: "itemDetailState",
  default: null,
});
