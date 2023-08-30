import { atom } from "recoil";
import { ItemDataTypes } from "@/components/types/ItemDataTypes";

export const itemDataMapState = atom({
  key: "itemDataMapState",
  default: <ItemDataTypes[]>[],
});
