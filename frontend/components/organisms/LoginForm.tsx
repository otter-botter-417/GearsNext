import React from "react";
import { ItemInformationFields } from "../atoms/form/ItemInformationFields";
import { UseFormReturn } from "react-hook-form";
import { LoginInputFormFieldsList } from "../atoms/valueNameList/LoginInputFormFieldsList";

interface ItemInformationFieldsProps {
  formMethods: UseFormReturn<any>;
}

const LoginForm: React.FC<ItemInformationFieldsProps> = ({ formMethods }) => {
  return (
    <>
      <ItemInformationFields
        formMethods={formMethods}
        inputFormFieldsList={LoginInputFormFieldsList()}
      />
    </>
  );
};

export default LoginForm;
