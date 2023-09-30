import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from '@/components/shares/atoms/state/userState';

/**
 * ユーザーが既にログインしている場合、指定されたパスにリダイレクトします。
 *
 * @param redirectPath - リダイレクト先のパス（デフォルトは '/'）
 */
export const useRedirectIfAuthenticated = (redirectPath: string = '/') => {
    const user = useRecoilValue(userState);
    const router = useRouter();

    useEffect(() => {
        // user.userId が -1 ではない、かつ例外ページにいない場合にのみリダイレクト
        if (user && user.userId !== -1) {
            router.push(redirectPath);
        }
    }, [user, router, redirectPath]);
};
