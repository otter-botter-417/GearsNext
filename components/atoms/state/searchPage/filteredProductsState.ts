import { atom } from "recoil";
import { ItemDataTypes } from "@/components/types/ItemDataTypes";

export const filteredProductsState = atom({
  key: "filteredProductsState",
  default: <ItemDataTypes[]>[],
});
