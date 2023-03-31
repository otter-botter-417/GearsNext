import { atom } from "recoil";

export const sliderValueState = atom({
  key: "sliderValueState",
  default: <number[]>[0, 1000000],
});
