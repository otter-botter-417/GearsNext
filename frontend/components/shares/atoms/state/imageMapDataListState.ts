import { ImageMapType } from "@/components/types/ImageMapType";
import { atom } from "recoil";

/**
 * レイアウト画面でイメージマップの情報の配列を管理するRecoil State
 */
export const imageMapDataListState = atom<ImageMapType[]>({
  key: "imageMapDataListState",
  default: [],
});
