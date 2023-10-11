import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useAuthGuard = (isRedirect: boolean, redirectPath: string = '/UserLoginPage') => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            isRedirect && router.push(redirectPath);
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, [router, isRedirect, redirectPath]);

    return isLogin;
};