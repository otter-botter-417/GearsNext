import React, { FC } from 'react';
import { LoadingButton } from '@mui/lab';

type SubmitButtonProps = {
  loading: boolean;
  text: string;
  type?: 'submit' | 'button'; // Add this line
};

/**
 * LoadingButtonをラッピングして、ローディング状態やボタンテキストなどを
 * カスタマイズできるようにしたコンポーネントです。
 *
 * @param loading ローディング状態
 * @param text ボタンテキスト
 * @param type ボタンの種類 (デフォルトは'submit')
 * @returns ローディング状態やボタンテキストなどをカスタマイズできるボタン
 * @example
 * <SubmitButton loading={loading} text="送信" />
 */
export const SubmitButton: FC<SubmitButtonProps> = ({
  loading,
  text,
  type = 'submit',
}) => {
  return (
    <LoadingButton
      type={type}
      variant="outlined"
      loading={loading}
      sx={{ mt: 4 }}
    >
      {text}
    </LoadingButton>
  );
};
