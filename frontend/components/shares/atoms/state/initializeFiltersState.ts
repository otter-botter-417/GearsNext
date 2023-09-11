import { atom } from "recoil";

/**
 * 初期読み込み時にフィルターを初期化するかどうかの状態を管理するRecoil
 */
export const initializeFiltersState = atom({
  key: "initializeFiltersState",
  default: false,
});
