/**
 * ユーザーがログインしているかどうかを判定するカスタムフック
 * @returns boolean ログイン状態
 */
export const useUserLoginStatus = () => {
  let isUserLoggedIn: boolean;
  if (localStorage.getItem('jwt_token')) {
    isUserLoggedIn = true;
  } else {
    isUserLoggedIn = false;

  };
  return isUserLoggedIn;
};