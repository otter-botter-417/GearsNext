import { atom } from "recoil";

/**
 * リセットトリガーを管理するRecoil State
 * 価格スライダーのリセットのトリガーとして使用
 */
export const resetTriggerState = atom({
  key: "resetTriggerState",
  default: true,
});
