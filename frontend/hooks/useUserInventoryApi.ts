// idを渡して特定の商品の情報を取得するAPI

import { useRecoilState } from "recoil";
import { userState } from "@/components/atoms/state/userAuth.State";
import axios from "axios";

export const useUserInventoryApi = () => {
  const user = useRecoilState(userState);
  const register = async (id: number) => {
    const data = {
      userId: user[0],
      itemId: id,
    };
    try {
      
      const response = await axios.post(
        "http://localhost:8000/api/user/inventory/register",
        {
          data,
        }
      );
      console.log(response.data.message);

      return response.data.message;
    } catch (err) {
      return { success: false, data: [] };
    }
  };

  const unregister  = async (id: number) => {
    const data = {
      userId: user[0],
      itemId: id,
    };
    try {
      
      const response = await axios.post(
        "http://localhost:8000/api/user/inventory/unregister ",
        {
          data,
        }
      );
      console.log(response.data.message);

      return response.data.message;
    } catch (err) {
      return { success: false, data: [] };
    }
  };
  return { register, unregister };}
;