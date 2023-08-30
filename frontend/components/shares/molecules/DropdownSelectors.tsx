import React from "react";
import { ValidatedTextField } from "@/components/atoms/form/ValidatedTextField";
import { UseFormReturn } from "react-hook-form";
import { DropDownFormNamesList } from "@/components/atoms/valueNameList/DropDownFormNamesList";
import { DropdownSelector } from "../../atoms/form/DropdownSelector";

interface ItemInformationFieldsProps {
  formMethods: UseFormReturn<any>;
}

export const DropdownSelectors: React.FC<ItemInformationFieldsProps> = ({
  formMethods,
}) => {
  // 入力フォームのリスト　要素の編集はFormNamesListを編集する
  const formFields = DropDownFormNamesList();

  return (
    <>
      {formFields.map((field, index) => (
        <DropdownSelector
          key={index}
          name={field.name}
          label={field.label}
          formMethods={formMethods}
        />
      ))}
    </>
  );
};
