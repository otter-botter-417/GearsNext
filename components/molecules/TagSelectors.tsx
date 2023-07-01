import React from "react";
import { UseFormReturn } from "react-hook-form";
import { TagFormNamesList } from "@/components/atoms/valueNameList/TagFormNamesList";
import { TagSelector } from "../atoms/form/TagSelector";

interface TagSelectorsProps {
  formMethods: UseFormReturn<any>;
}

export const TagSelectors: React.FC<TagSelectorsProps> = ({ formMethods }) => {
  // 入力フォームのリスト　要素の編集はFormNamesListを編集する
  const formFields = TagFormNamesList();

  return (
    <>
      {formFields.map((field) => (
        <TagSelector
          name={field.name}
          label={field.label}
          formMethods={formMethods}
        />
      ))}
    </>
  );
};
