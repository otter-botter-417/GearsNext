import { FC } from 'react';

import { TextFieldWithValidation } from '@/components/shares/atoms/form/TextFieldWithValidation';
import { NewItemInputFormFieldsList } from '../../shares/atoms/valueNameList/NewItemInputFormFieldsList';
import { useFormMethods } from '@/hooks/useFormMethods';

/**
 * 商品の基本情報を入力するフォームのコンポーネントです。
 * -  商品名 ASIN 定価を入力するフォーム
 * - NewItemInputFormFieldsListで取得したフィールド名をもとに、
 */
export const ItemDetailInputFields: FC = () => {
  const formMethods = useFormMethods();
  return (
    <>
      {NewItemInputFormFieldsList.map((field) => (
        <TextFieldWithValidation
          key={field.name}
          name={field.name}
          label={field.label}
          formMethods={formMethods}
        />
      ))}
    </>
  );
};
