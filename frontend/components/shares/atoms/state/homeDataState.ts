import { atom } from 'recoil';
import { HomeDataType } from '@/components/types/HomeDataType';

/**
 * ホームで表示する情報を管理するrecoil State
 */

export const homeDataState = atom<HomeDataType>({
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