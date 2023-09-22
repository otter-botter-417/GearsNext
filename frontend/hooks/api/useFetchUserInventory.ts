import { STATUS_OK } from "@/components/constants";
import { useApiRequest } from "./useApiRequest";
import { useSetRecoilState } from "recoil";
import { userInventoryItemListState } from "@/components/shares/atoms/state/userInventoryItemListState";
import { useEffect } from "react";
import { useRouter } from 'next/router';


/**
 * 商品のお気に入り登録・解除APIを送信する
 * 
 * @param method post or delete
 * @param itemId
 * @param successStatus 成功時のステータスコード
 * @example
 *  try {
 *   await sendFavoriteItemRequest('post', itemId, 201);
 *   // 成功時の処理
 * } catch (error) {
 *   console.error(error);
 *   // エラー時の処理
 * }
 */

export const useFetchUserInventory = () => {
    const { sendRequest } = useApiRequest();
    const setUserInventoryItemList = useSetRecoilState(userInventoryItemListState)
    const router = useRouter();

    const generateErrorMessage = () => {
        return '持っている商品の取得に失敗しました。'
    };

    const fetchUserInventory = async () => {

        try {

            const url = 'user/inventory';
            const response = await sendRequest('get', url, []);


            if (response) {
                setUserInventoryItemList(response.data.data);
            }
        } catch (err: any) {
            console.error(err.status);
            if (err.status === 401) {
                router.push('/UserLoginPage');
                // throw new Error('ログインしてください。');
            }
            const errorMessage = err.response?.data?.message || generateErrorMessage();
            // throw new Error(errorMessage);
        }
    };


    useEffect(() => {
        fetchUserInventory();

    }, []);
    return { fetchUserInventory }
};