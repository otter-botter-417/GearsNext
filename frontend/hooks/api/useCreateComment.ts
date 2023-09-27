
import { useApiRequest } from '@/hooks/api/useApiRequest';
import { useErrorHandler } from '@/hooks/api/useErrorHandler';

/**
 * レイアウトの新規コメント投稿を管理するカスタムフック。
 */
export const useCreateComment = () => {
    const { sendRequest } = useApiRequest();
    const { handleError, clearError } = useErrorHandler();

    /**
     * 新規コメントを投稿する。
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
            clearError();
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    };
    return { createComment };
};
