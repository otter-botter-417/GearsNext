import { atom } from "recoil";

/**
 * 画像のプレビューURLを管理するRecoil State。
 * nullの場合、プレビューURLが設定されていないことを示す。
 */
export const imagePreviewUrlState = atom<string | null>({
  key: 'imagePreviewUrlState',
  default: null,
});