import { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';

type IconButtonWithTooltipProps = {
  title: string;
  isIconActive: boolean;
  inactiveIcon: React.ReactNode;
  activeIcon: React.ReactNode;
  onClick: () => void;
};

/**
 * アイコンボタンにツールチップを付与する
 * ログインしていない場合はログインアラートを表示する
 * ログインしている場合はアイコンのアクティブ状態を表示する
 *
 * @param title           ツールチップのタイトル
 * @param isIconActive    アイコンが有効かどうか
 * @param inactiveIcon    非アクティブな時のアイコン
 * @param activeIcon      アクティブな時のアイコン
 * @param onClick         アイコンボタンをクリックした時の処理
 *
 * @example
 * <IconButtonWithTooltip
 * title="いいね"
 * isIconActive={isIconActive}
 * inactiveIcon={<FavoriteBorderIcon sx={ICON_STYLE_INACTIVE} />}
 * activeIcon={<FavoriteIcon sx={ICON_STYLE_ACTIVE} />}
 * onClick={onCrickIcon}
 * />
 */
export const UserInteractiveIconButton: FC<IconButtonWithTooltipProps> = ({
  title,
  isIconActive,
  inactiveIcon,
  activeIcon,
  onClick,
}) => {
  const displayIcon =  isIconActive ? activeIcon : inactiveIcon;

  return (
    <Tooltip
      title={title}
      placement="left-start"
    >
      <IconButton onClick={onClick}>{displayIcon}</IconButton>
    </Tooltip>
  );
};
