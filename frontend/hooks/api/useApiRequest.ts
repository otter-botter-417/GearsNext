import axios, { isAxiosError } from "axios";

import { useCallback } from "react";

/**
 * バックエンドへAPIリクエストを送信し、レスポンスを受け取る
 * @returns {sendRequest} APIリクエストを送信する関数
 * @example
 * const { sendRequest } = useApiRequest();
 * const response = await sendRequest('GET', 'items', null);
 */
export const useApiRequest = () => {
  /**
   * APIリクエストを送信する関数
   * @param {string} method リクエストメソッド (GET, POST, PUT, DELETE)
   * @param {string} url リクエストURL api/以下のパス
   * @param {any} requestData リクエストデータ
   * @returns {Promise} APIレスポンス
   * @example
   * const { sendRequest } = useApiRequest();
   * const response = await sendRequest('GET', 'items', null);
   */
  const sendRequest = useCallback(async (method: string, url: string, requestData: any) => {
    const token = localStorage.getItem('jwt_token');
    const headers: { [key: string]: string } = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await axios.request({
        method,
        url: `http://localhost:8000/api/${url}`,
        data: requestData,
        headers
      });
      return response;
    } catch (err) {
      if (isAxiosError(err)) {
        throw err.response;
      }
      //未知のエラーの場合はnullを返す
      console.error(err);
      return null;
    }
  }, []);

  return { sendRequest };
};
