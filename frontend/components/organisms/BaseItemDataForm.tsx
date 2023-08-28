import React from 'react';
import { ItemInformationInputFields } from '@/components/atoms/form/ValidationInputFields';
import { UseFormReturn } from 'react-hook-form';
import { DropdownSelectors } from '../molecules/DropdownSelectors';
import { TagSelectors } from '../molecules/TagSelectors';
import { NewItemInputFormFieldsList } from '@/components/atoms/valueNameList/NewItemInputFormFieldsList';
import { NewItemInputFormSizeFieldsList } from '@/components/atoms/valueNameList/NewItemInputFormSizeFieldsList';
import { ItemSizeInputFields } from '../atoms/form/ItemSizeInputFields';
import { Grid } from '@mui/material';

interface ItemInformationFieldsProps {
  formMethods: UseFormReturn<any>;
}
const BaseItemDataForm: React.FC<ItemInformationFieldsProps> = ({
  formMethods,
}) => {
  return (
    <>
      {/* 手入力の各種商品情報入力コンポーネント */}
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
