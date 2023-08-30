import { atom } from "recoil";

export const itemTagsState = atom({
  key: "itemTagsState",
  default: <string[]>[],
});
