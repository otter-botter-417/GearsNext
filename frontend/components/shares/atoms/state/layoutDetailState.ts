import { atom } from "recoil";
import { LayoutDataType } from "@/components/types/LayoutDataType";

/**
 * レイアウト詳細のデータを管理するRecoilのatom
 */
export const layoutDetailState = atom<LayoutDataType | null>({
  key: "layoutDetailState",
  default: null,
});
