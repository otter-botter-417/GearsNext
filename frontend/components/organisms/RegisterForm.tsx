import React from "react";
import { ItemInformationFields } from "../atoms/form/ItemInformationInputFields";
import { UseFormReturn } from "react-hook-form";
import { RegisterInputFormFieldsList } from "../atoms/valueNameList/RegisterInputFormFieldsList";

interface ItemInformationFieldsProps {
  formMethods: UseFormReturn<any>;
}

const RegisterForm: React.FC<ItemInformationFieldsProps> = ({
  formMethods,
}) => {
  return (
    <>
      <ItemInformationFields
        formMethods={formMethods}
        inputFormFieldsList={RegisterInputFormFieldsList()}
      />
    </>
  );
};

export default RegisterForm;
