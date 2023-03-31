import { atom } from "recoil";

export const priceDataState = atom({
  key: "priceDataState",
  default: <number[]>[],
});
