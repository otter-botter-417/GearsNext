import { Box } from "@mui/material";
import React from "react";
import { ItemInformationFields } from "../atoms/form/ItemInformationFields";
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
