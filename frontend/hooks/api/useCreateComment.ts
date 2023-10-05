
import { layoutDetailState } from '@/components/shares/atoms/state/layoutDetailState';
import { useApiRequest } from '@/hooks/api/useApiRequest';
import { useErrorHandler } from '@/hooks/api/useErrorHandler';
import { useSetRecoilState } from 'recoil';

/**
 * レイアウトの新規コメント投稿を管理するカスタムフック。
 */
export const useCreateComment = () => {
    const { sendRequest } = useApiRequest();
    const { handleError, clearError } = useErrorHandler();
    const setLayoutDetail = useSetRecoilState(layoutDetailState);

    /**
     * 新規コメントを投稿する。
     * - 成功した場合は、更新後のコメント一覧を受け取るので、レイアウト詳細のコメント一覧を更新する。
     * @param commentText - コメントのテキスト
     * @param commentParentId - 親コメントのID（なければnull）
     * @param layoutId - レイアウトのID
     * @returns boolean - 成功した場合はtrue、失敗した場合はfalse
     */
    const createComment = async (commentText: string, commentParentId: number | null, layoutId: number) => {
        try {
            const formData = new FormData();
            formData.append('content', commentText);

            if (commentParentId !== null) {
                formData.append('parent_id', commentParentId.toString());
            }

            const response = await sendRequest('post', 'user/layout/comment/' + layoutId, formData);
            if (!response) {
                handleError(null, 'レスポンスが無効です。');
                return false;
            }

            // レイアウト詳細のコメント一覧を更新する
            const updatedComments = response.data.data;
            setLayoutDetail((prevLayoutDetail) => {
                if (!prevLayoutDetail) {
                    return null;
                }
                return {
                    ...prevLayoutDetail,
                    comments: updatedComments
                };
            });

            clearError();
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    };
    return { createComment };
};
