import { atom, } from 'recoil';

/**
 * テキストを管理するrecoil State
 */
export const textState = atom<string>({
  key: 'textState',
  default: '',
});
