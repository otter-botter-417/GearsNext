import { useCallback, useEffect } from "react";
import { useApiRequest } from "./useApiRequest";
import { layoutDetailState } from "@/components/shares/atoms/state/layoutDetailState";
import { useSetRecoilState } from "recoil";
import { userItemStatesState } from "@/components/shares/atoms/state/userItemStatesState";

// TODO いいね　持っているもの　を取得できるようにする
export const useLayoutShowApi = (layoutId: string) => {
  const { sendRequest } = useApiRequest();
  const setLayoutDetail = useSetRecoilState(layoutDetailState);
  // const setUserItemStates = useSetRecoilState(userItemStatesState);


  const fetchData = useCallback(async () => {
    try {

      if (!layoutId) {
        console.log("layoutId is undefined or null");
        return;
      }
      const url = `layout/${layoutId}`;
      const response = await sendRequest('get', url, null);

      // Check if response.data is undefined or not
      if (!response) {
        console.log("response.data is undefined");
        return { success: false, data: [] };
      }
      setLayoutDetail(response.data.data);
      // setUserItemStates(response.data.data.user)

      return response.data;
    } catch (err) {
      console.error(err);
      return { success: false, data: [] };
    }
  }, [layoutId, sendRequest, setLayoutDetail]);
  useEffect(() => {
    if (layoutId) {
      fetchData();
    }
  }, [layoutId, fetchData]);
};