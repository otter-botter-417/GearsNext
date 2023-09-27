import { useApiRequest } from "./useApiRequest";

/**
 * 商品のお気に入り登録・解除APIを送信する
 * 
 * @example
 * const { sendFavoriteItemRequest } = useFavoriteItemApi();
 */
export const useFavoriteItemApi = () => {
  const { sendRequest } = useApiRequest();

  /**
   * 商品のお気に入り登録・解除APIを送信する
   * 
   * @param method post or delete
   * @param itemId
   * @example
   * sendFavoriteItemRequest('post', itemId);
   */
  const sendFavoriteItemRequest =
    async (method: 'post' | 'delete', itemId: number) => {
      const successStatus = method === 'post' ? 201 : 204;
      try {
        const url = `user/favorite/items/${itemId}`;
        const response = await sendRequest(method, url, []);

        if (response && response.status !== successStatus) {
          throw new Error(generateErrorMessage(method));
        }
      } catch (err: any) {
        // TODO 以下の記述を勉強
        // 条件付き代入　　わかりにくいが同等のコードをコメントで書いておく 
        // let errorMessage;
        // if (!err.response?.data?.message) {
        //   errorMessage = generateErrorMessage(method);
        // } else {
        //   errorMessage = err.response?.data?.message;
        // }
        const errorMessage = err.response?.data?.message || generateErrorMessage(method);
        throw new Error(errorMessage);
      }
    };

  const generateErrorMessage = (method: 'post' | 'delete') => {
    return method === 'post'
      ? 'お気に入りの追加に失敗しました。'
      : 'お気に入りの削除に失敗しました。';
  };

  return { sendFavoriteItemRequest };

}