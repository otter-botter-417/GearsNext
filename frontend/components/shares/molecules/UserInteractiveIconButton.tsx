import { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';

type IconButtonWithTooltipProps = {
  title: string;
  loginAlertTitle?: string;
  isIconActive: boolean;
  inactiveIcon: React.ReactNode;
  activeIcon: React.ReactNode;
  onClick: () => void;
  isLoggedIn: boolean;
  showLoginAlert: boolean;
};

/**
 * アイコンボタンにツールチップを付与する
 * ログインしていない場合はログインアラートを表示する
 * ログインしている場合はアイコンのアクティブ状態を表示する
 *
 * @param title           ツールチップのタイトル
 * @param loginAlertTitle 未ログイン時のツールチップのタイトル
 * @param isIconActive    アイコンが有効かどうか
 * @param inactiveIcon    非アクティブな時のアイコン
 * @param activeIcon      アクティブな時のアイコン
 * @param onClick         アイコンボタンをクリックした時の処理
 * @param isLoggedIn      ログインしているかどうか
 * @param showLoginAlert  ログインアラートを表示するかどうか
 *
 * @example
 * <IconButtonWithTooltip
 * title="いいね"
 * loginAlertTitle="ログインが必要です"
 * isIconActive={isIconActive}
 * inactiveIcon={<FavoriteBorderIcon sx={ICON_STYLE_INACTIVE} />}
 * activeIcon={<FavoriteIcon sx={ICON_STYLE_ACTIVE} />}
 * onClick={onCrickIcon}
 * isLoggedIn={isLoggedIn}
 * showLoginAlert={showLoginAlert}
 * />
 */
export const UserInteractiveIconButton: FC<IconButtonWithTooltipProps> = ({
  title,
  loginAlertTitle = 'ログインが必要です',
  isIconActive,
  inactiveIcon,
  activeIcon,
  onClick,
  isLoggedIn,
  showLoginAlert,
}) => {
  const displayIcon = isLoggedIn && isIconActive ? activeIcon : inactiveIcon;

  return (
    <Tooltip
      title={showLoginAlert ? loginAlertTitle : title}
      placement="left-start"
    >
      <IconButton onClick={onClick}>{displayIcon}</IconButton>
    </Tooltip>
  );
};
