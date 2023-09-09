import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TagSelectors } from '../molecules/TagSelectors';
import { ItemSizeInputFields } from '../atoms/form/ItemSizeInputFields';
import { Grid } from '@mui/material';
import { NewItemInputFormFieldsList } from '../atoms/valueNameList/NewItemInputFormFieldsList';
import { NewItemInputFormSizeFieldsList } from '../atoms/valueNameList/NewItemInputFormSizeFieldsList';
import { DropdownSelectors } from '../molecules/DropdownSelectors';

interface ItemInformationFieldsProps {
  formMethods: UseFormReturn<any>;
}
const BaseItemDataForm: React.FC<ItemInformationFieldsProps> = ({
  formMethods,
}) => {
  return (
    <>
      {/* 手入力の各種商品情報入力コンポーネント */}
      {/* コンポーネントが行方不明 */}
      <ItemInformationInputFields
        formMethods={formMethods}
        inputFormFieldsList={NewItemInputFormFieldsList()}
      />
      <Grid container>
        <ItemSizeInputFields
          formMethods={formMethods}
          inputFormFieldsList={NewItemInputFormSizeFieldsList()}
        />
      </Grid>

      <DropdownSelectors formMethods={formMethods} />
      <TagSelectors formMethods={formMethods} />
    </>
  );
};

export default BaseItemDataForm;
