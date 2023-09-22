import { atom } from "recoil";

/**
 * レイアウト登録画面でイメージ上の座標(x,y)を管理するRecoil State
 */
export const imageMapPositionState = atom
  <{
    x: number;
    y: number;
  }>({
    key: "imageMapPositionState",
    default: { x: 0, y: 0 },
  });
