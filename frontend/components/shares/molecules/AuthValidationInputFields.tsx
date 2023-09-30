import { FC } from 'react';
import { Box } from '@mui/system';
import { useFormMethods } from '@/hooks/useFormMethods ';

import { TextFieldWithValidation } from '@/components/shares/atoms/form/TextFieldWithValidation';

interface AuthValidationInputFieldsProps {
  inputFormFieldsList: {
    name: string;
    label: string;
  }[];
  formMethods: ReturnType<typeof useFormMethods>;
}

/**
 * ユーザー認証用のバリデーション付きテキストフィールドコンポーネント
 *
 * @remarks
 * このコンポーネントは、複数の入力フィールドにバリデーションロジックを適用します。
 * 各フィールドは`TextFieldWithValidation`を使用しています。
 *
 * @param inputFormFieldsList - フォームフィールドの名前とラベルの配列
 *
 * @example
 * ```tsx
 * <AuthValidationInputFields
 *   inputFormFieldsList={inputFields}
 * />
 * ```
 *
 * @returns バリデーション付きテキストフィールドのリスト
 */
export const AuthValidationInputFields: FC<AuthValidationInputFieldsProps> = ({
  inputFormFieldsList,
  formMethods,
}) => {
  return (
    <>
      {inputFormFieldsList.map((field) => (
        <Box key={field.name} paddingBottom={2} width={'300px'}>
          <TextFieldWithValidation
            name={field.name}
            label={field.label}
            formMethods={formMethods}
          />
        </Box>
      ))}
    </>
  );
};
