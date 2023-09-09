import { errorMessageState } from '@/components/shares/atoms/state/errorMessageState';
import { useRecoilState } from 'recoil';

/**
 * エラーメッセージとエラーを処理する関数を取得するカスタムフック
 * @returns {errorMessage, handleError, clearError} エラーメッセージとエラーを処理する関数
 * 
 * @example
 * const { errorMessage, handleError, clearError} = useErrorHandler();
 */
export const useErrorHandler = () => {
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);

    const clearError = () => setErrorMessage(null);

    const handleError = (error: unknown, customMessage: string | null = null) => {
        if (customMessage) {
            setErrorMessage(customMessage);
        } else if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('何らかのエラーが発生しました。');
        }
    };
    return {
        errorMessage,
        handleError,
        clearError,
    };
};