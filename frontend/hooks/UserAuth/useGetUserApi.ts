import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { useApiRequest } from '@/hooks/api/useApiRequest';

import { userState } from '@/components/shares/atoms/state/userState';

/**
 * ユーザーが認証済みかどうかをチェックするカスタムフック
 * - ブラウザ環境かどうかを確認。サーバーサイドでは動作しない。
 * - アクセストークンが存在する場合、APIを呼び出してユーザー情報を取得。
 * - ユーザー情報が取得できた場合はRecoilのuserStateを更新。
 */
export const useGetUserApi = () => {
  const { sendRequest } = useApiRequest();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('access_token');
    if (token) {
      getUserInfo();
    }
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await sendRequest('GET', 'user/me',);
      if (response && response.status === 200) {
        const data = response.data;
        setUser(data);
      } else if (response) {
        setUser(null);
      }
    } catch (err: any) {
      console.log('get', err);
    }
  };
};
