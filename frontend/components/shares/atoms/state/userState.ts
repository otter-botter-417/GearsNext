import { atom, } from 'recoil';

/**
 * ユーザーの状態を管理するrecoil State
 */
export const userState = atom<{ userId: number, userName: string } | null>({
  key: 'userState',
  default: null,
});
