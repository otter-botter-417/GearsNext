import { useApiRequest } from "./useApiRequest";


/**
 * 商品のお気に入り登録・解除APIを送信する
 * 
 * @example
 * const { sendFavoriteLayoutRequest } = useFavoriteLayoutApi();
 */
export const useFavoriteLayoutApi = () => {
  const { sendRequest } = useApiRequest();

  const generateErrorMessage = (method: 'post' | 'delete') => {
    return method === 'post'
      ? 'お気に入りの追加に失敗しました。'
      : 'お気に入りの削除に失敗しました。';
  };

  /**
   * レイアウトのお気に入り登録・解除APIを送信する
   * 
   * @param method post or delete
   * @param layoutId レイアウトID
   * 
   * @example
   * sendFavoriteLayoutRequest('post', layoutId);
   */
  const sendFavoriteLayoutRequest =
    async (method: 'post' | 'delete', layoutId: number) => {
      const successStatus = method === 'post' ? 201 : 204;
      try {
        const url = `user/favorite/layouts/${layoutId}`;
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
  return { sendFavoriteLayoutRequest };
}
