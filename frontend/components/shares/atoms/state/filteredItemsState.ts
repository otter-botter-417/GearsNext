import { atom } from "recoil";
import { ItemDataTypes } from "@/components/types/ItemDataTypes";

export const filteredItemsState = atom({
  key: "filteredItemsState",
  default: <ItemDataTypes[]>[],
});
