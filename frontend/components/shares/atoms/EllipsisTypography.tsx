import React, { FC } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

type EllipsisTypographyProps = TypographyProps & {
  text: string | number;
};

/**
 * 受け取ったテキストが長い場合に、省略して表示します
 *
 * @param text 表示するテキスト
 * @param otherProps TypographyProps
 * @returns Typography
 * @example
 * <EllipsisTypography text="長いテキスト" />
 */
export const EllipsisTypography: FC<EllipsisTypographyProps> = ({
  text,
  ...otherProps
}) => {
  return (
    <Typography
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        width: '100%',
        textAlign: 'center',
      }}
      {...otherProps}
    >
      {text}
    </Typography>
  );
};
