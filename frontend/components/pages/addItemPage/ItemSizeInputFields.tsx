import { FC } from 'react';
import { Grid } from '@mui/material';

import { TextFieldWithValidation } from '@/components/shares/atoms/form/TextFieldWithValidation';
import { NewItemInputFormSizeFieldsList } from '../../shares/atoms/valueNameList/NewItemInputFormSizeFieldsList';
import { useFormMethods } from '@/hooks/useFormMethods';

/**
 * このコンポーネントは、商品の基本情報を入力するフォームのコンポーネントです。
 * - 設営サイズ 収納サイズ 重量を入力するフォーム
 * - NewItemInputFormSizeFieldsList()で取得したフィールド名をもとに、
 */
export const ItemSizeInputFields: FC = () => {
  const formMethods = useFormMethods();
  return (
    <Grid item xs={10}>
      {NewItemInputFormSizeFieldsList.map((field) => (
        <TextFieldWithValidation
          key={field.name}
          name={field.name}
          label={field.label}
          formMethods={formMethods}
        />
      ))}
    </Grid>
  );
};
