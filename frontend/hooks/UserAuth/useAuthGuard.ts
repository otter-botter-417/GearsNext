import { useRouter } from "next/router";

/**
 * ユーザー認証を行うカスタムフック
 * トークンが存在しない場合、ログインページにリダイレクトする
 */
export const useAuthGuard = () => {
    const router = useRouter();

    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem('access_token');
    if (!token) {
        router.push('/UserLoginPage');
        return false;
    }
    return true;
}
