import axios from "axios";
import { useCallback } from "react";
import { ItemDataTypes } from "../components/types/ItemDataTypes";

export const useItemApi = () => {
  const postItemData = useCallback(async (data: any) => {
    try {
      const res = await axios.post("http://localhost:3000/api/itemApi", data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getItemData = useCallback(
    async (
      finds: any
    ): Promise<{ success: boolean; data: ItemDataTypes[] }> => {
      try {
        const res = await axios.get("http://localhost:3000/api/itemApi", {
          params: finds,
        });
        return res.data;
      } catch (err) {
        return { success: false, data: [] };
      }
    },
    []
  );

  return { postItemData, getItemData };
};
