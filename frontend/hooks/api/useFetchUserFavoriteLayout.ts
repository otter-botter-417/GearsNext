import { useEffect } from "react";
import { useRouter } from 'next/router';
import { useSetRecoilState } from "recoil";

import { useApiRequest } from "./useApiRequest";

import { STATUS_OK, STATUS_UNAUTHORIZED } from "@/components/constants";
import { userFavoriteLayoutListState } from "@/components/shares/atoms/state/userFavoriteLayoutListState";
import { useAuthGuard } from "../UserAuth/useAuthGuard";

/**
 * ユーザーのお気に入りした商品を取得するカスタムフック
 */
export const useFetchUserFavoriteLayout = () => {
    // useAuthGuard();
    const router = useRouter();
    const isLoggedin = useAuthGuard(true,);
    const { sendRequest } = useApiRequest();
    const setUserFavoriteLayoutList = useSetRecoilState(userFavoriteLayoutListState)
    const generateErrorMessage = () => {
        return 'お気に入りレイアウトの取得に失敗しました。'
    };
    const fetchUserFavoriteLayout = async () => {
        try {
            const url = 'user/favorite/layouts';
            const response = await sendRequest('get', url);
            if (response?.status === STATUS_OK) {
                setUserFavoriteLayoutList(response.data.data);
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
            fetchUserFavoriteLayout();
        }
    }, [isLoggedin]);
    return { fetchUserFavoriteLayout }
};