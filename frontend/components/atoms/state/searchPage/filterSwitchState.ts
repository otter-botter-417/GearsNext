import { atom } from "recoil";

export const filterSwitchState = atom({
  key: "filterSwitchState",
  default: "or",
});
