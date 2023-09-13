import { atom } from "recoil";
import { LayoutDataTypes } from "@/components/types/LayoutDataTypes";

/**
 * レイアウト詳細のデータを管理するRecoilのatom
 */
export const layoutDetailState = atom<LayoutDataTypes | null>({
  key: "layoutDetailState",
  default: null,
});
