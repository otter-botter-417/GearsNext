import { atom } from 'recoil';

/**
 * ページネーションの状態を管理するRecoil
 */
export const paginationState = atom({
  key: 'paginationState',
  default: {
    currentPage: 1,
    itemsPerPage: 20,
  },
});