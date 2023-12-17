import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import CustomSwitch from '@/components/shares/atoms/CustomSwitch';

type SortToggleProps = {
  switchState: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  leftLabel: string;
  rightLabel: string;
};

/**
 * このコンポーネントは、任意の2つのラベル（左側と右側）とともにカスタムスイッチを表示します。
 * 通常、ソート順（例: 新しい順/古い順）の切り替えに使用されますが、他の二項目の切り替えにも対応可能です。
 * CustomSwitch コンポーネントを使用してスイッチの機能を提供し、左右のラベルを表示します。
 *
 * @param switchState: ソート順の現在の状態 boolean
 * @param handleChange: ソート順を切り替えるためのハンドラー関数
 * @param leftLabel: 左側のラベル
 * @param rightLabel: 右側のラベル
 */

const SortToggle: FC<SortToggleProps> = ({
  switchState,
  handleChange,
  leftLabel,
  rightLabel,
}) => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Typography variant="body1">{leftLabel}</Typography>
      <CustomSwitch switchState={switchState} handleChange={handleChange} />
      <Typography variant="body1">{rightLabel}</Typography>
    </Box>
  );
};

export default SortToggle;
