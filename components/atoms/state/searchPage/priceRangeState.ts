import { atom } from "recoil";

export const priceRangeState = atom({
  key: "priceRangeState",
  default: { min: 0, max: 1000 },
});
