import { useCallback, useEffect } from "react";
import { useApiRequest } from "./useApiRequest";
import { itemDetailState } from "@/components/shares/atoms/state/itemDetailState";
import { useSetRecoilState } from "recoil";

// TODO いいね　持っているもの　を取得できるようにする
export const useFetchUserItemStates = (itemId: string) => {
  const { sendRequest } = useApiRequest();
  const setItemDetail = useSetRecoilState(itemDetailState);

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

      return response.data;
    } catch (err) {
      console.error(err);
      return { success: false, data: [] };
    }
  }, [itemId, sendRequest, setItemDetail]);
  useEffect(() => {
    if (itemId) {
      fetchData();
    }
  }, [itemId, fetchData]);
};