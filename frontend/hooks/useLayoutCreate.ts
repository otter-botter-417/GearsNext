import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import imageCompression from 'browser-image-compression';

import { useApiRequest } from '@/hooks/api/useApiRequest';
import { useErrorHandler } from '@/hooks/api/useErrorHandler';

import { textState } from '@/components/shares/atoms/state/textState';
import { imageFileState } from '@/components/shares/atoms/state/imageFileState';
import { imageMapDataListState } from '@/components/shares/atoms/state/imageMapDataListState';
import { selectedItemsListState } from '@/components/shares/atoms/state/selectedItemsListState';
import { loadingButtonState } from '@/components/shares/atoms/state/loadingButtonState';
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
    const setLoading = useSetRecoilState(loadingButtonState);

    const router = useRouter();
    /**
     * 商品一覧を非同期に取得する。
     * カテゴリーに応じてURLを変更し、APIリクエストを行う。
     */
    const layoutPost = async () => {
        try {
            setLoading(true);

            const formData = new FormData();

            // 画像ファイルが存在する場合、圧縮してフォームデータに追加する
            if (imageFile) {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true
                };
                const compressedFile = await imageCompression(imageFile, options);
                formData.append('layout_image', compressedFile);
            }

            formData.append('text', text === '' ? ' ' : text || '');

            selectedItemsList.forEach((item, index) => {
                formData.append(`items[${index}][item_id]`, item.itemId.toString());
            });

            imageMapDataList.forEach((item, index) => {
                formData.append(`image_map_positions[${index}][item_id]`, item.itemId.toString());
                formData.append(`image_map_positions[${index}][item_name]`, item.itemName.toString());
                formData.append(`image_map_positions[${index}][x_position]`, item.xPosition.toString());
                formData.append(`image_map_positions[${index}][y_position]`, item.yPosition.toString());
            });

            const response = await sendRequest('post', 'user/layout', formData);
            setLoading(false);

            if (!response) {
                handleError(null, 'レスポンスが無効です。');
                return;
            }

            // レスポンスが正常だった場合、トップページに遷移する
            if (response?.status === 201) {
                router.push('/');
            }

            // エラーが発生していた場合、エラーをクリアする
            clearError();
        } catch (error) {
            setLoading(false);

            // エラーが発生した場合、エラーを処理する
            handleError(error);
        }
    };
    return { layoutPost };
};
