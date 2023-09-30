import React, { FC } from 'react';
import { TextField } from '@mui/material';

import { getFieldErrorMessage } from './getFieldErrorMessage';
import { UseFormReturn } from 'react-hook-form';

type TextFieldWithValidationProps = {
  name: string;
  label: string;
  formMethods: UseFormReturn;
};

/**
 * バリデーション付きのテキストフィールドコンポーネント
 *
 * @remarks
 * このコンポーネントは、react-hook-form のバリデーション機能と統合された
 * テキストフィールドを提供します。エラーメッセージも動的に表示されます。
 *
 * @param name - フォームフィールドの名前（識別子として使用）
 * @param label - フォームフィールドに表示するラベル
 * @param formMethods - react-hook-form から提供されるメソッド群
 *
 * @example
 * ```tsx
 * <TextFieldWithValidation name="username" label="Username" formMethods={formMethods} />
 * ```
 *
 * @returns バリデーション付きのテキストフィールド
 */
export const TextFieldWithValidation: FC<TextFieldWithValidationProps> = ({
  name,
  label,
  formMethods,
}) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <TextField
      {...register(name)}
      error={Boolean(errors[name])}
      helperText={getFieldErrorMessage(errors, name)}
      id={name}
      label={label}
      fullWidth
    />
  );
};
