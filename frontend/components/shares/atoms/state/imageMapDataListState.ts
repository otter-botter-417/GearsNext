import { ImageMapData } from "@/components/types/ImageMapTypes";
import { atom } from "recoil";

/**
 * レイアウト画面でイメージマップの情報の配列を管理するRecoil State
 */
export const imageMapDataListState = atom<ImageMapData[]>({
  key: "imageMapDataListState",
  default: [],
});
