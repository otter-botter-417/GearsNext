import React from "react";
import { ItemInformationInputFields } from "../atoms/form/ItemInformationInputFields";
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
      <ItemInformationInputFields
        formMethods={formMethods}
        inputFormFieldsList={RegisterInputFormFieldsList()}
      />
    </>
  );
};

export default RegisterForm;
