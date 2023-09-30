import React, { FC } from 'react';

import { AuthValidationInputFields } from '@/components/shares/atoms/form/AuthValidationInputFields';
import { RegisterInputFormFieldsList } from '@/components/pages/userRegisterPage/RegisterInputFormFieldsList';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';

import { SubmitButton } from '@/components/shares/atoms/SubmitButton';
import { Box } from '@mui/material';
import { useFormMethods } from '@/hooks/useFormMethods ';

interface Field {
  name: string;
  label: string;
}

/**
 * TODO onSubmitの引数の型がわからないのでanyにしている
 */
interface AuthFormProps {
  inputFormFieldsList: Field[];
  onSubmit: (data: any) => void;
  buttonText: string;
}

/**
 * 汎用的なユーザー認証フォームコンポーネント
 *
 * @remarks
 * このコンポーネントは認証（ログイン、新規登録など）に関するフォームを生成します。
 * 内部で`AuthValidationInputFields`と`SubmitButton`コンポーネントを使用しており、
 * 入力検証と送信機能が内包されています。
 *
 * @param inputFormFieldsList - フォームフィールドの名前とラベルの配列
 * @param onSubmit - フォーム送信時に実行されるコールバック関数
 * @param buttonText - 送信ボタンに表示されるテキスト
 *
 * @example
 * ```tsx
 * <AuthForm
 *   inputFormFieldsList={inputFields}
 *   onSubmit={handleOnSubmit}
 *   buttonText="送信"
 * />
 * ```
 *
 * @returns 認証フォーム
 */
export const AuthForm: FC<AuthFormProps> = ({
  inputFormFieldsList,
  onSubmit,
  buttonText,
}) => {
  const formMethods = useFormMethods(); // ここで formMethods を取得

  return (
    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <AuthValidationInputFields
        inputFormFieldsList={inputFormFieldsList}
        formMethods={formMethods}
      />
      <Box sx={{ pb: '15%', display: 'flex', justifyContent: 'center' }}>
        <SubmitButton
          loading={formMethods.watch('loading') || false}
          text={buttonText}
        />
      </Box>
    </form>
  );
};
