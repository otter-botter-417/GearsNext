import { useCallback, useEffect } from "react";
import { useApiRequest } from "./useApiRequest";
import { itemDetailState } from "@/components/shares/atoms/state/itemDetailState";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { userItemStatesState } from "@/components/shares/atoms/state/userItemStatesState";

// TODO いいね　持っているもの　を取得できるようにする
export const useGetItemDataApi = (itemId: string) => {
  const { sendRequest } = useApiRequest();
  const setItemDetail = useSetRecoilState(itemDetailState);
  const setUserItemStates = useSetRecoilState(userItemStatesState);
  const resetUserItemStates = useResetRecoilState(userItemStatesState);

  const fetchData = useCallback(async () => {
    try {
      if (!itemId) {
        console.log("itemId is undefined or null");
        return;
      }
      const url = `items/${itemId}`;
      const response = await sendRequest('get', url, null);

      // Check if response.data is undefined or not
      if (!response) {
        console.log("response.data is undefined");
        return { success: false, data: [] };
      }
      setItemDetail(response.data.data);
      setUserItemStates(response.data.data.user)

      return response.data;
    } catch (err) {
      console.error(err);
      return { success: false, data: [] };
    }
  }, [itemId, sendRequest, setItemDetail]);
  useEffect(() => {
    if (itemId) {
      resetUserItemStates();
      fetchData();
    }
  }, [itemId, fetchData]);
};