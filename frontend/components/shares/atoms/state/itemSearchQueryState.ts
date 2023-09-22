import { atom } from "recoil";

/**
 * 商品名で検索するためのクエリを管理するRecoil State。
 * このStateは、複数の商品検索関連のコンポーネントで共有されます。
 */
export const itemSearchQueryState = atom<string>({
  key: "itemSearchQueryState",
  default: '',
});
