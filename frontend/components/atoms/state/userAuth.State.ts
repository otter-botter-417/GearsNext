import { atom } from "recoil";
import { User } from "firebase/auth";

export const userState = atom<string | null>({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
