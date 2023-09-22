import { atom } from "recoil";

/**
 * レイアウト登録画面でイメージのサイズを管理するRecoil State
 */
export const imageOriginalSizeState = atom<{
  width: number;
  height: number;
}>({
  key: "imageOriginalSizeState",
  default: { width: 0, height: 0 },
});
