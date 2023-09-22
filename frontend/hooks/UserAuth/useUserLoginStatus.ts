import { useEffect, useState } from "react";

/**
 * ユーザーがログインしているかどうかを判定するカスタムフック
 * 
 * @returns boolean ログイン状態
 */
export const useUserLoginStatus = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('jwt_token')) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    }
  }, []);

  return isUserLoggedIn;
};