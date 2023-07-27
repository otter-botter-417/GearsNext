// idを渡して特定の商品の情報を取得するAPI

import { useRecoilState } from "recoil";
import { userState } from "@/components/atoms/state/userAuth.State";
import axios from "axios";

export const useUserInventoryApi = (id: number) => {
  const user = useRecoilState(userState);
  const data = {
    userId: user[0],
    itemId: id,
  };

  const register = async () => {
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:8000/api/user/inventory/register",
        {
          data,
        }
      );

      return response.data;
    } catch (err) {
      return { success: false, data: [] };
    }
  };
  return register;
};
