import React, { FC } from 'react';
import { Box } from '@mui/material';

import { useFormMethods } from '@/hooks/useFormMethods ';
import { SubmitButton } from '@/components/shares/atoms/button/SubmitButton';
import { AuthValidationInputFields } from '@/components/shares/molecules/AuthValidationInputFields';

type Field = {
  name: string;
  label: string;
};

/**
 * TODO onSubmitの引数の型がわからないのでanyにしている
 */
type AuthFormProps = {
  inputFormFieldsList: Field[];
  onSubmit: (data: any) => void;
  buttonText: string;
  loading: boolean;
};

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
 * @param loading - ローディング中かどうか
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
  loading,
}) => {
  const formMethods = useFormMethods(); // ここで formMethods を取得

  return (
    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <AuthValidationInputFields
        inputFormFieldsList={inputFormFieldsList}
        formMethods={formMethods}
      />
      <Box sx={{ pb: '15%', display: 'flex', justifyContent: 'center' }}>
        <SubmitButton loading={loading} text={buttonText} />
      </Box>
    </form>
  );
};
