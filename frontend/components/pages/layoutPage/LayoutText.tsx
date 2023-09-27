import { Box } from '@mui/system';
import React, { FC } from 'react';
import Typography from '@mui/material/Typography';

type LayoutTextProps = {
  text: string;
};

/**
 * このコンポーネントは、レイアウトのテキスト内容を表示します。
 *
 * @param text - レイアウトのテキスト内容
 * @returns {JSX.Element} レイアウトのテキスト内容を表示するReact要素
 */
export const LayoutText: FC<LayoutTextProps> = ({ text }) => {
  return (
    <Box>
      <Typography variant="subtitle1" color="initial">
        {text}
      </Typography>
    </Box>
  );
};
