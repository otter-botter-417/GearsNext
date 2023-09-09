import React, { FC } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useFavoriteItemApi } from '@/hooks/api/useFavoriteItemApi';

import { UserInteractiveIconButton } from '../../shares/molecules/UserInteractiveIconButton';
import { useInteractiveIcon } from '@/hooks/useInteractiveIcon';
import { ICON_SIZE } from '@/components/constants';

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
 * @param isLoggedIn
 * @param isFavorited
 */

const ICON_STYLE_ACTIVE = { color: '#FF1744', fontSize: ICON_SIZE };
const ICON_STYLE_INACTIVE = { fontSize: ICON_SIZE };

export const FavoriteIconButton: FC<FavoriteIconButtonProps> = ({
  itemId,
  isLoggedIn,
  isFavorited,
}) => {
  const { sendFavoriteItemRequest } = useFavoriteItemApi();

  const { isIconActive, showLoginAlert, onClickIcon } = useInteractiveIcon({
    initialState: isFavorited,
    sendRequest: sendFavoriteItemRequest,
    itemId,
    isLoggedIn,
  });

  /**
   * いいねアイコンをクリックした時の処理
   * 未ログインの場合はログインアラートを表示する
   * ログイン済みの場合はいいねの登録・解除を行う
   * レスポンスを待たずにstateの切り替えを行う
   * レスポンスがエラーの場合はstateを元に戻す
   */

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
