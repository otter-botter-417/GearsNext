import React from 'react';
import { ItemInformationInputFields } from '../atoms/form/ValidationInputFields';
import { UseFormReturn } from 'react-hook-form';
import { LoginInputFormFieldsList } from '../atoms/valueNameList/LoginInputFormFieldsList';

interface ItemInformationFieldsProps {
  formMethods: UseFormReturn<any>;
}

const LoginForm: React.FC<ItemInformationFieldsProps> = ({ formMethods }) => {
  return (
    <>
      <ItemInformationInputFields
        formMethods={formMethods}
        inputFormFieldsList={LoginInputFormFieldsList()}
      />
    </>
  );
};

export default LoginForm;
