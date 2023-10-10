import { useRouter } from "next/router";

/**
 * ユーザー認証を行うカスタムフック
 * トークンが存在しない場合、ログインページにリダイレクトする
 */
export const useAuthGuard = (isRedirect: boolean, redirectPath: string = '/') => {
    const router = useRouter();

    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem('access_token');
    if (!token) {
        isRedirect && router.push(redirectPath);
        return false;
    }
    return true;
}
