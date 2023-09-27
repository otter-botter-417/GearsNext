import React, { FC, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { ICON_SIZE } from '@/components/constants';
import { userState } from '@/components/shares/atoms/state/userState';
import { isFavoriteState } from '@/components/shares/atoms/state/isFavoriteState';

import { useFavoriteLayoutApi } from '@/hooks/api/useFavoriteLayoutApi';

import { UserInteractiveIconButton } from '../../shares/molecules/UserInteractiveIconButton';

type LayoutFavoriteButtonProps = {
  layoutId: number;
};

/**
 * レイアウトのお気に入りボタンコンポーネント
 * - ユーザーがログインしている場合のみ表示される
 *
 * @param {number} layoutId - 対象のレイアウトのID
 * @returns {JSX.Element|null} お気に入りボタンまたはnull（ユーザーがログインしていない場合）
 */
export const LayoutFavoriteButton: FC<LayoutFavoriteButtonProps> = ({
  layoutId,
}) => {
  const { sendFavoriteLayoutRequest } = useFavoriteLayoutApi();
  const user = useRecoilValue(userState);
  const [isFavorite, setIsFavorite] = useRecoilState(isFavoriteState);
  const [isLoading, setIsLoading] = useState(false);

  const ICON_STYLE_ACTIVE = { color: '#FF1744', fontSize: ICON_SIZE };
  const ICON_STYLE_INACTIVE = { fontSize: ICON_SIZE };
  useEffect(() => {
    setIsFavorite(isFavorite);
  }, [isFavorite]);

  if (!user) return null;
  /**
   * いいねアイコンをクリックした時の処理
   * ログイン済みの場合はいいねの登録・解除を行う
   * レスポンスを待たずにstateの切り替えを行う
   * レスポンスがエラーの場合はstateを元に戻す
   */
  const onClickIcon = async () => {
    // ボタンが押された時に連続でリクエストが送られないようにする
    if (isLoading) return;
    setIsLoading(true);
    setIsFavorite((isFavorite) => !isFavorite);
    try {
      const method = isFavorite ? 'delete' : 'post';
      await sendFavoriteLayoutRequest(method, layoutId);
    } catch (error) {
      // エラーが発生した場合はstateを元に戻す
      alert(error);
      setIsFavorite((isFavorite) => !isFavorite);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserInteractiveIconButton
      title="お気に入り"
      isIconActive={isFavorite}
      inactiveIcon={<FavoriteBorderIcon sx={ICON_STYLE_INACTIVE} />}
      activeIcon={<FavoriteIcon sx={ICON_STYLE_ACTIVE} />}
      onClick={onClickIcon}
    />
  );
};
