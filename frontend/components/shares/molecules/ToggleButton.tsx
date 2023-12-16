import React from 'react';
import { Box, Button } from '@mui/material';

type ToggleButtonProps = {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
};

/**
 * ToggleButton コンポーネントは、与えられたオプション間で選択を切り替えるためのUIを提供します。
 * 現在選択されているオプションに基づいて、ボタンのスタイルが変化します。
 *
 * @param options - 切り替えるオプションの配列
 * @param selectedOption - 現在選択されているオプション
 * @param onSelect - オプションが選択された時のコールバック関数
 *
 * @returns 与えられたオプション間で選択を切り替えるためのUI
 */
const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <Box display="flex">
      {options.map((option, index) => (
        <Button
          key={option}
          variant={selectedOption === option ? 'contained' : 'outlined'}
          onClick={() => onSelect(option)}
          sx={{
            marginLeft: index === 0 ? 0 : 1,
            marginRight: index === options.length - 1 ? 0 : 1,
            bgcolor:
              selectedOption === option ? 'primary.main' : 'secondary.main',
            '&:hover': {
              bgcolor:
                selectedOption === option ? 'primary.light' : 'secondary.light',
            },
          }}
        >
          {option}
        </Button>
      ))}
    </Box>
  );
};

export default ToggleButton;
