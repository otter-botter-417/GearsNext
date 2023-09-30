import { atom } from 'recoil';
import { HomeItemType } from '@/components/types/HomeItemType';

/**
 * ホームで表示する情報を管理するrecoil State
 */
export type HomeItemStateType = {
  topViewedItems: HomeItemType[];
  topFavoriteItems: HomeItemType[];
  newlyArrivedItems: HomeItemType[];
};

export const homeItemDataState = atom<HomeItemStateType>({
  key: 'homeItemDataState',
  default: {
    topViewedItems: [],
    topFavoriteItems: [],
    newlyArrivedItems: [],
  },
});