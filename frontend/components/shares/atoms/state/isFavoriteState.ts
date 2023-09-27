import { atom } from "recoil";

/**
 * お気に入り状態を管理するRecoil State
 */
export const isFavoriteState = atom<boolean>({
    key: "isFavoriteState",
    default: false,
});
