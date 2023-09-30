import React, { FC, useEffect, useState } from 'react';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';

import { useUserInventoryApi } from '@/hooks/api/useUserInventoryApi';

import { UserInteractiveIconButton } from '../../shares/molecules/UserInteractiveIconButton';
import {
  ICON_SIZE,
  LOGIN_ALERT_TIMEOUT,
  STATUS_CREATED,
  STATUS_NO_CONTENT,
} from '@/components/constants';
import { useTimedToggle } from '@/hooks/useTimedToggle';

//持っているものに登録用アイコンボタン
type InventoryIconButtonProps = {
  itemId: number;
  isLoggedIn: boolean;
  isInInventory: boolean;
};

/**
 * 持っている物アイコンボタン
 * 未ログインの場合はログインアラートを表示する
 * ログイン済みの場合は持っている物の登録・解除を行う
 *
 * @param itemId
 * @param isLoggedIn
 * @param isInInventory
 */

export const InventoryIconButton: FC<InventoryIconButtonProps> = ({
  itemId,
  isLoggedIn,
  isInInventory,
}) => {
  const { sendUserInventoryRequest } = useUserInventoryApi();
  const [isIconActive, setIsIconActive] = useState(isInInventory);
  const [showLoginAlert, setShowLoginAlert] =
    useTimedToggle(LOGIN_ALERT_TIMEOUT);
  const [isLoading, setIsLoading] = useState(false);

  const ICON_STYLE_ACTIVE = { color: '#008b8b', fontSize: ICON_SIZE };
  const ICON_STYLE_INACTIVE = { fontSize: ICON_SIZE };

  /**
   * 持っている物アイコンをクリックした時の処理
   * 未ログインの場合はログインアラートを表示する
   * ログイン済みの場合は持っている物の登録・解除を行う
   * レスポンスを待たずにstateの切り替えを行う
   * レスポンスがエラーの場合はstateを元に戻す
   */
  const onClickIcon = async () => {
    // 未ログインの場合はログインアラートを表示する

    if (!isLoggedIn) {
      setShowLoginAlert();
      return;
    }
    // ボタンが押された時に連続でリクエストが送られないようにする

    if (isLoading) return;

    setIsLoading(true);
    setIsIconActive((isIconActive) => !isIconActive);
    try {
      if (isIconActive) {
        await sendUserInventoryRequest('delete', itemId, STATUS_NO_CONTENT);
      } else {
        await sendUserInventoryRequest('post', itemId, STATUS_CREATED);
      }
    } catch (error) {
      // エラーが発生した場合はstateを元に戻す

      alert(error);
      setIsIconActive((isIconActive) => !isIconActive);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsIconActive(isInInventory);
  }, [isInInventory]);

  return (
    <UserInteractiveIconButton
      title="持っている物"
      isIconActive={isIconActive}
      inactiveIcon={<LibraryAddRoundedIcon sx={ICON_STYLE_INACTIVE} />}
      activeIcon={<LibraryAddRoundedIcon sx={ICON_STYLE_ACTIVE} />}
      onClick={onClickIcon}
    />
  );
};
