import React, { FC } from 'react';
import NextLink from 'next/link';
import { Typography, Button } from '@mui/material';

type HeaderButtonProps = {
  href: string;
  color?: string;
  endIcon: React.ReactNode;
  children: React.ReactNode;
};

/**
 * アイコン付きのリンクボタンを表示します
 * @param href リンク先
 * @param color ボタンの色
 * @param endIcon ボタンの右側に表示するアイコン
 * @param children ボタンのテキスト
 */
export const LinkButtonWithIcon: FC<HeaderButtonProps> = ({
  href,
  endIcon,
  color,
  children,
  ...otherProps
}) => {
  return (
    <NextLink href={href} passHref>
      <Button
        component="button"
        endIcon={endIcon}
        style={{ whiteSpace: 'nowrap' }}
      >
        <Typography variant="body1" color={color} {...otherProps}>
          {children}
        </Typography>
      </Button>
    </NextLink>
  );
};
