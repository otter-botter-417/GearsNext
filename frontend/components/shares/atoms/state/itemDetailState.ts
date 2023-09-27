import { atom } from "recoil";
import { ItemDataType } from "@/components/types/ItemDataType";

/**
 * アイテム詳細のデータを管理するRecoilのatom
 */
export const itemDetailState = atom<ItemDataType | null>({
  key: "itemDetailState",
  default: null,
});
