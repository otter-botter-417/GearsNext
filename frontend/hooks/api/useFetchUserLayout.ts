import { useEffect } from "react";
import { useRouter } from 'next/router';
import { useSetRecoilState } from "recoil";

import { useApiRequest } from "./useApiRequest";

import { STATUS_OK, STATUS_UNAUTHORIZED } from "@/components/constants";
import { userLayoutListState } from "@/components/shares/atoms/state/userLayoutListState";
import { useAuthGuard } from "../UserAuth/useAuthGuard";

/**
 * ユーザーの投稿したレイアウトを取得するカスタムフック
 */
export const useFetchUserLayout = () => {
    // useAuthGuard();
    const router = useRouter();
    const isLoggedin = useAuthGuard(true,);
    const { sendRequest } = useApiRequest();
    const setUserLayoutList = useSetRecoilState(userLayoutListState)
    const generateErrorMessage = () => {
        return 'レイアウトの取得に失敗しました。'
    };
    const fetchUserLayout = async () => {
        try {
            const url = 'user/layout';
            const response = await sendRequest('get', url);
            if (response?.status === STATUS_OK) {
                setUserLayoutList(response.data.data);
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
            fetchUserLayout();
        }
    }, [isLoggedin]);
    return { fetchUserLayout }
};