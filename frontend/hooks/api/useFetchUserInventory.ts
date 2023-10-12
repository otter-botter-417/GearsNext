import { useEffect } from "react";
import { useRouter } from 'next/router';
import { useSetRecoilState } from "recoil";

import { useApiRequest } from "./useApiRequest";

import { STATUS_OK, STATUS_UNAUTHORIZED } from "@/components/constants";
import { userInventoryItemListState } from "@/components/shares/atoms/state/userInventoryItemListState";
import { useAuthGuard } from "../UserAuth/useAuthGuard";

/**
 * ユーザーの持っている商品を取得するカスタムフック
 */
export const useFetchUserInventory = () => {
    // useAuthGuard();
    const router = useRouter();
    const isLoggedin = useAuthGuard(true,);
    const { sendRequest } = useApiRequest();
    const setUserInventoryItemList = useSetRecoilState(userInventoryItemListState)
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
            if (err.status === STATUS_UNAUTHORIZED) {
                router.push('/UserLoginPage');
            }
            const errorMessage = err.response?.data?.message || generateErrorMessage();
            console.error(errorMessage);  // ここで適切なエラーハンドリングを行う
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (isLoggedin) {
            fetchUserInventory();
        }
    }, [isLoggedin]);
    return { fetchUserInventory }
};