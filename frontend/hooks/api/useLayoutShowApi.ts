import { useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useApiRequest } from "./useApiRequest";

import { isFavoriteState } from "@/components/shares/atoms/state/isFavoriteState";
import { layoutDetailState } from "@/components/shares/atoms/state/layoutDetailState";

/**
 * layoutIdに基づいてレイアウト情報をフェッチし、Recoilステートを更新するカスタムフック
 * @param layoutId - レイアウトのID
 */
export const useLayoutShowApi = (layoutId: string) => {
  const { sendRequest } = useApiRequest();
  const setLayoutDetail = useSetRecoilState(layoutDetailState);
  const setIsFavorite = useSetRecoilState(isFavoriteState);

  /**
   * レイアウト情報をフェッチする関数
   * - レイアウト情報を取得し、Recoilステートを更新する
   * - レイアウト情報の取得に失敗した場合は、空の配列を返す
   * - isFavoriteを更新する (レイアウト詳細画面でいいねの状態を反映させるため)
   */
  const fetchData = useCallback(async () => {
    try {
      // サーバーサイドレンダリング時は処理を中断する
      if (typeof window === 'undefined') return;

      // layoutIdが未定義の場合は処理を中断する
      if (!layoutId) {
        console.log("layoutId is undefined or null");
        return;
      }

      setLayoutDetail(null); //初期化

      const url = `layout/${layoutId}`;
      const response = await sendRequest('get', url, null);

      if (!response) {
        console.log("response.data is undefined");
        return { success: false, data: [] };
      }

      // レイアウト情報をRecoilステートにセットする
      setLayoutDetail(response.data.data);
      setIsFavorite(response.data.data.user.isFavorite)
    } catch (err) {
      console.error(err);
      return { success: false, data: [] };
    }
  }, [layoutId, sendRequest, setLayoutDetail]);

  useEffect(() => {
    if (layoutId) {
      fetchData();
    }
  }, [layoutId]);

};