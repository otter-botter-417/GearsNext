import { atom } from 'recoil';
import { HomeLayoutType } from '@/components/types/HomeLayoutType';

/**
 * ホームで表示する情報を管理するrecoil State
 */
export type HomeLayoutStateType = {
  topViewedLayouts: HomeLayoutType[];
  topFavoriteLayouts: HomeLayoutType[];
  newlyArrivedLayouts: HomeLayoutType[];
};

export const homeLayoutDataState = atom<HomeLayoutStateType>({
  key: 'homeLayoutDataState',
  default: {
    topViewedLayouts: [],
    topFavoriteLayouts: [],
    newlyArrivedLayouts: [],
  },
});