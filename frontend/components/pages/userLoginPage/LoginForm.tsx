import React from 'react';

import { ValidationInputFields } from '@/components/shares/atoms/form/ValidationInputFields';
import { UseFormReturn } from 'react-hook-form';
import { LoginInputFormFieldsList } from './LoginInputFormFieldsList';

interface ItemInformationFieldsProps {
  formMethods: UseFormReturn<any>;
}

const LoginForm: React.FC<ItemInformationFieldsProps> = ({ formMethods }) => {
  return (
    <>
      <ValidationInputFields inputFormFieldsList={LoginInputFormFieldsList()} />
    </>
  );
};

export default LoginForm;
