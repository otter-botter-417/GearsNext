import { atom } from 'recoil';
import { HomeItemType } from '@/components/types/HomeItemType';
import { HomeLayoutType } from '@/components/types/HomeLayoutType';

/**
 * ホームで表示する情報を管理するrecoil State
 */
export type HomeStateType = {
  topViewedItems: HomeItemType[];
  topFavoriteItems: HomeItemType[];
  newlyArrivedItems: HomeItemType[];
  topViewedLayouts: HomeLayoutType[];
  topFavoriteLayouts: HomeLayoutType[];
  newlyArrivedLayouts: HomeLayoutType[];
};

export const homeDataState = atom<HomeStateType>({
  key: 'homeDataState',
  default: {
    topViewedItems: [],
    topFavoriteItems: [],
    newlyArrivedItems: [],
    topViewedLayouts: [],
    topFavoriteLayouts: [],
    newlyArrivedLayouts: [],
  },
});