import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { useApiRequest } from '@/hooks/api/useApiRequest';

import { userState } from '@/components/shares/atoms/state/userState';

/**
 * ユーザー認証状態を取得および更新するカスタムフック
 * 
 * - SSR環境では動作しないため、ブラウザ環境でのみ動作。
 * - ローカルストレージに保存されているアクセストークンを使用して、
 *   ユーザー情報をAPIから取得。
 * - APIからのレスポンスに基づいて、RecoilのuserStateを更新。
 */
export const useGetUserApi = () => {
  const { sendRequest } = useApiRequest();
  const setUser = useSetRecoilState(userState);


  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('access_token');

    // アクセストークンが存在する場合、一時的にユーザー情報をロード中として設定
    if (token) {
      setUser({ userId: -1, userName: 'LOADING' });
      getUserInfo();
    }
  }, []);

  /**
   * APIを呼び出してユーザー情報を取得
   * - 成功時：RecoilのuserStateを更新
   * - 失敗時：ローカルストレージからトークンを削除し、userStateをnullに設定
   */
  const getUserInfo = async () => {
    try {
      const response = await sendRequest('GET', 'user/me',);
      if (response && response.status === 200) {
        const data = response.data;
        setUser(data);
      } else if (response) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
      }
    } catch (err: any) {
      console.log('get', err);
    }
  };
};
