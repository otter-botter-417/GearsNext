import { useApiRequest } from "./useApiRequest";

/**
 * 商品の持っている物登録・解除APIを送信する
 * @example
 * const { sendUserInventoryRequest } = useFavoriteItemApi();
 */
export const useUserInventoryApi = () => {
  const { sendRequest } = useApiRequest();

  /**
    * 商品の持っている物登録・解除APIを送信する
    * 
    * @param method post or delete
    * @param itemId
    * @param successStatus 成功時のステータスコード
    * @example
    *  try {
    *   await sendUserInventoryRequest('post', itemId, 201);
    *   // 成功時の処理
    * } catch (error) {
    *   console.error(error);
    *   // エラー時の処理
    * }
    */
  const sendUserInventoryRequest =
    async (method: 'post' | 'delete', itemId: number, successStatus: number) => {
      try {
        const url = `user/inventory/${itemId}`;
        const response = await sendRequest(method, url, []);

        if (response && response.status !== successStatus) {
          throw new Error(generateErrorMessage(method));
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || generateErrorMessage(method);
        throw new Error(errorMessage);
      }
    };

  const generateErrorMessage = (method: 'post' | 'delete') => {
    return method === 'post'
      ? '持っている物の追加に失敗しました。'
      : '持っている物の削除に失敗しました。';
  };

  return { sendUserInventoryRequest };

}