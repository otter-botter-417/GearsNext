import { atom } from "recoil";
import { ItemDataType } from "@/components/types/ItemDataType";

export const filteredItemsState = atom({
  key: "filteredItemsState",
  default: <ItemDataType[]>[],
});
