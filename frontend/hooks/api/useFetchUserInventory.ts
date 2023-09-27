import { useEffect } from "react";
import { useRouter } from 'next/router';
import { useSetRecoilState } from "recoil";

import { useApiRequest } from "./useApiRequest";

import { STATUS_OK, STATUS_UNAUTHORIZED } from "@/components/constants";
import { userInventoryItemListState } from "@/components/shares/atoms/state/userInventoryItemListState";



/**
 * ユーザーの持っている商品を取得するカスタムフック
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
            const response = await sendRequest('get', url);

            if (response?.status === STATUS_OK) {
                setUserInventoryItemList(response.data.data);
            }
        } catch (err: any) {
            console.error(err.status);
            if (err.status === STATUS_UNAUTHORIZED) {
                router.push('/UserLoginPage');
            }
            const errorMessage = err.response?.data?.message || generateErrorMessage();
            console.error(errorMessage);  // ここで適切なエラーハンドリングを行う
        }
    };

    useEffect(() => {
        fetchUserInventory();
    }, []);
    return { fetchUserInventory }
};