import { useState } from 'react';
import { useTimedToggle } from '@/hooks/useTimedToggle';
import { STATUS_CREATED, STATUS_NO_CONTENT, LOGIN_ALERT_TIMEOUT } from '@/components/constants';
import useToggleState from './useToggleState';

/**
 * カスタムフック useInteractiveIcon のプロパティの型定義
 */
interface UseInteractiveIconProps {
  initialState: boolean;  // 初期状態のアイコンの有効/無効状態
  sendRequest: (method: 'post' | 'delete', itemId: number, status: number) => Promise<void>;  // リクエスト送信関数
  itemId: number;  // アイテムのID
  isLoggedIn: boolean;  // ユーザーがログインしているかどうか
}

/**
 * カスタムフック useInteractiveIcon の戻り値の型定義
 */
interface UseInteractiveIconReturns {
  isIconActive: boolean;  // アイコンの有効/無効状態
  showLoginAlert: boolean;  // ログインアラートを表示するかどうか
  onClickIcon: () => void;  // アイコンクリック時のハンドラ関数
}

/**
 * インタラクティブなアイコン（例：いいねボタン）の状態とクリック処理を管理します。
 *
 * @param {UseInteractiveIconProps} param0 - 初期状態、リクエスト関数、アイテムID、ログイン状態を含むオブジェクト
 * @returns {UseInteractiveIconReturns} - アイコンの状態、ログインアラートの表示状態、クリックハンドラ関数を含むオブジェクト
 * @example
 * const { isIconActive, showLoginAlert, onClickIcon } = useInteractiveIcon({
 *  initialState: false,
 * sendRequest: sendFavoriteItemRequest,
 * itemId: item.id,
 * isLoggedIn: isLoggedIn
 * });
 */
export const useInteractiveIcon = ({
  initialState,
  sendRequest,
  itemId,
  isLoggedIn
}: UseInteractiveIconProps): UseInteractiveIconReturns => {
  const [isIconActive, toggleIconSwitch] = useToggleState(initialState);
  const [showLoginAlert, setShowLoginAlert] = useTimedToggle(LOGIN_ALERT_TIMEOUT);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * アイコンをクリックした時の処理
   * 未ログインの場合はログインアラートを表示する
   * ログイン済みの場合は登録・解除を行う
   * レスポンスを待たずにstateの切り替えを行う
   * レスポンスがエラーの場合はstateを元に戻す
   */
  const onClickIcon = async () => {
    if (!isLoggedIn) {
      setShowLoginAlert();
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    toggleIconSwitch();
    try {
      if (isIconActive) {
        await sendRequest('delete', itemId, STATUS_NO_CONTENT);
      } else {
        await sendRequest('post', itemId, STATUS_CREATED);
      }
    } catch (error) {
      alert(error);
      toggleIconSwitch();
    } finally {
      setIsLoading(false);
    }
  };

  return { isIconActive, showLoginAlert, onClickIcon };
};
