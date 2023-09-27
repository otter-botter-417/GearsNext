import React, { FC, useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useFavoriteItemApi } from '@/hooks/api/useFavoriteItemApi';

import { UserInteractiveIconButton } from '../../shares/molecules/UserInteractiveIconButton';
import {
  ICON_SIZE,
  LOGIN_ALERT_TIMEOUT,
} from '@/components/constants';
import { useTimedToggle } from '@/hooks/useTimedToggle';

type FavoriteIconButtonProps = {
  itemId: number;
  isLoggedIn: boolean;
  isFavorited: boolean;
};

/**
 * いいねアイコンボタン
 * 未ログインの場合はログインアラートを表示する
 * ログイン済みの場合はいいねの登録・解除を行う
 *
 * @param itemId
 * @param isLoggedIn　ログイン状態
 * @param isFavorited　いいね状態
 */
export const FavoriteIconButton: FC<FavoriteIconButtonProps> = ({
  itemId,
  isLoggedIn,
  isFavorited,
}) => {
  const { sendFavoriteItemRequest } = useFavoriteItemApi();
  const [isIconActive, setIsIconActive] = useState(isFavorited);
  const [showLoginAlert, setShowLoginAlert] =
    useTimedToggle(LOGIN_ALERT_TIMEOUT);
  const [isLoading, setIsLoading] = useState(false);
  const ICON_STYLE_ACTIVE = { color: '#FF1744', fontSize: ICON_SIZE };
  const ICON_STYLE_INACTIVE = { fontSize: ICON_SIZE };

  /**
   * いいねアイコンをクリックした時の処理
   * 未ログインの場合はログインアラートを表示する
   * ログイン済みの場合はいいねの登録・解除を行う
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
      const method = isIconActive ? 'delete' : 'post';
      await sendFavoriteItemRequest(method, itemId);
    } catch (error) {
      // エラーが発生した場合はstateを元に戻す
      alert(error);
      setIsIconActive((isIconActive) => !isIconActive);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsIconActive(isFavorited);
  }, [isFavorited]);

  return (
    <UserInteractiveIconButton
      title="お気に入り"
      loginAlertTitle="ログインが必要です"
      isIconActive={isIconActive}
      inactiveIcon={<FavoriteBorderIcon sx={ICON_STYLE_INACTIVE} />}
      activeIcon={<FavoriteIcon sx={ICON_STYLE_ACTIVE} />}
      onClick={onClickIcon}
      isLoggedIn={isLoggedIn}
      showLoginAlert={showLoginAlert}
    />
  );
};
