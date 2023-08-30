import { atom } from "recoil";

export const errorMessageState = atom<string | null>({
  key: "errorMessageState",
  default: null,
});
