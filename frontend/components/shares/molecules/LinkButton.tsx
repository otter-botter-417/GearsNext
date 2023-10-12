import React, { FC } from 'react';
import { Box } from '@mui/system';
import NextLink from 'next/link';
import { Button } from '@mui/material';

type LinkButtonProps = {
  link: string;
  text: string;
  pt?: number;
};

/**
 * リンクを含んだボタンを提供します。
 * @param link ボタンのリンク
 * @param text ボタンのテキスト
 * @param pt　paddingTop
 * @returns
 */
export const LinkButton: FC<LinkButtonProps> = ({ link, text, pt = 0 }) => {
  return (
    <Box pt={pt}>
      <NextLink href={link} passHref>
        <Button variant="outlined">{text}</Button>
      </NextLink>
    </Box>
  );
};
