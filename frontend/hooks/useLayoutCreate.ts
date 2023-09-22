import { useRecoilValue } from 'recoil';

import { useApiRequest } from '@/hooks/api/useApiRequest';
import { useErrorHandler } from '@/hooks/api/useErrorHandler ';

import { textState } from '@/components/shares/atoms/state/textState';
import { imageFileState } from '@/components/shares/atoms/state/imageFileState';
import { imageMapDataListState } from '@/components/shares/atoms/state/imageMapDataListState';
import { imageOriginalSizeState } from '@/components/shares/atoms/state/imageOriginalSizeState';
import { selectedItemsListState } from '@/components/shares/atoms/state/selectedItemsListState';
/**
 * 商品一覧と価格情報を管理するカスタムフック。
 * カテゴリーが変更された場合、APIから商品一覧を取得する。
 * 
 * @example
 * useGetItems();
 */
export const useLayoutCreate = () => {
    const { sendRequest } = useApiRequest();
    const { handleError, clearError } = useErrorHandler();
    const imageFile = useRecoilValue(imageFileState);
    const text = useRecoilValue(textState);
    const imageMapDataList = useRecoilValue(imageMapDataListState);
    const selectedItemsList = useRecoilValue(selectedItemsListState);

    /**
     * 商品一覧を非同期に取得する。
     * カテゴリーに応じてURLを変更し、APIリクエストを行う。
     */
    const layoutPost = async () => {
        try {
            const formData = new FormData();

            if (imageFile) {
                formData.append('layout_image', imageFile);
            }

            formData.append('text', text === '' ? ' ' : text || '');

            selectedItemsList.forEach((item, index) => {
                formData.append(`items[${index}][item_id]`, item.itemId.toString());
            });

            // imageMapDataListを適切な形式に変換
            imageMapDataList.forEach((item, index) => {
                formData.append(`image_map_positions[${index}][item_id]`, item.itemId.toString());
                formData.append(`image_map_positions[${index}][item_name]`, item.itemName.toString());
                formData.append(`image_map_positions[${index}][x_position]`, item.x.toString());
                formData.append(`image_map_positions[${index}][y_position]`, item.y.toString());
            });

            const response = await sendRequest('post', 'user/layout', formData);
            if (!response) {
                handleError(null, 'レスポンスが無効です。');
                return;
            }
            // エラーが発生していた場合、エラーをクリアする
            clearError();
        } catch (error) {
            // エラーが発生した場合、エラーを処理する
            handleError(error);
        }
    };
    return { layoutPost };
};
