import React, { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Box } from '@mui/system';
import { TextField, Typography } from '@mui/material';

import { textState } from '@/components/shares/atoms/state/textState';

/**
 * このコンポーネントは、レイアウトの説明文（コメント）をユーザーに入力させるUIを提供します。
 * - テキストフィールドでの多行入力が可能。
 * - 文字数が200文字以内である必要があり、この制限を超えるとエラーメッセージが表示されます。
 * - 入力フィールドの下部には、現在の文字数/最大文字数が表示されます。
 *
 * @returns {JSX.Element} レイアウトの説明文を入力するためのテキストフィールドと、それに関連するUI要素（文字数カウンター、エラーメッセージなど）。
 */
export const LayoutTextFields: FC = () => {
  const [text, setText] = useRecoilState(textState);
  const [helperState, setHelperState] = useState({
    error: false,
    helperText: '',
  });
  const maxLength = 200;

  /**
   * 入力された文字数をカウントし、最大文字数を超えた場合はエラーを表示します。
   * @param e
   */
  useEffect(() => {
    if (text.length > maxLength) {
      setHelperState({
        error: true,
        helperText: `最大文字数は${maxLength}文字です`,
      });
    } else {
      setHelperState({ error: false, helperText: '' });
    }
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <TextField
        fullWidth
        size="small"
        label="Comment"
        multiline
        rows={15}
        value={text}
        onChange={handleChange}
        error={helperState.error}
        helperText={helperState.helperText}
      />
      <Box display={'flex'} justifyContent="flex-end">
        <Typography variant="body2">
          {text.length}/{maxLength}
        </Typography>
      </Box>
    </div>
  );
};
