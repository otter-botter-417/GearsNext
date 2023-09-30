import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { useApiRequest } from '@/hooks/api/useApiRequest';
import { useErrorHandler } from '@/hooks/api/useErrorHandler';
import { homeDataState } from '@/components/shares/atoms/state/homeDataState';


/**
 * ホームで利用する商品とレイアウトを取得するカスタムフック。
 * 
 * @example
 * useGetItems();
 */
export const useFetchHomeDataApi = () => {
    const { sendRequest } = useApiRequest();
    const { handleError, clearError } = useErrorHandler();
    const setHomeItemData = useSetRecoilState(homeDataState);
    const fetchHomeData = async () => {
        try {
            const response = await sendRequest('get', 'home');
            if (!response) {
                handleError(null, 'レスポンスが無効です。');
                return;
            }

            const homeData = response.data.data;
            setHomeItemData(homeData);

            // エラーが発生していた場合、エラーをクリアする
            clearError();
        } catch (error) {
            // エラーが発生した場合、エラーを処理する
            handleError(error);
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;
        fetchHomeData();
    }, []);
};
