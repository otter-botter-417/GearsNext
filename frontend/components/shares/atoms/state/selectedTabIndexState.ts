import { atom } from "recoil";

/**
 * レイアウト登録画面で使用するタブの選択状態を管理するRecoil State。
 * この状態は、ユーザーが特定のタブを選択することで変更されます。
 * 選択されたタブのインデックスが保存されます（デフォルトは0）。
 */
export const selectedTabIndexState = atom<number>
  ({
    key: "selectedTabIndexState",
    default: 0,
  });
