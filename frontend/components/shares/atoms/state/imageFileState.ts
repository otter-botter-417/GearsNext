import { atom, } from 'recoil';

/**
 * ユーザーに選択されたイメージファイルを管理するrecoil State
 * nullの場合、イメージファイルが選択されていないことを示す。
 */
export const imageFileState = atom<File | null>({
  key: 'imageFileState',
  default: null,
});
