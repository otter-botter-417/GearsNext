import { TextField, MenuItem } from "@mui/material";
import React from "react";
import { UseFormReturn, FieldError } from "react-hook-form";
import { TagListSelector } from "./TagListSelector";
import { Tags } from "@/components/atoms/itemAppend/Tags";

// プルダウン　選択式のフォーム

// optionsListには選択肢のリストが入る

interface TagSelectorProps {
  name: string;
  label: string;
  formMethods: UseFormReturn<any>;
  defaultValue?: string;
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  name,
  label,
  formMethods,
  defaultValue,
}) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  // const errorMessage = errors[name] ? (errors[name] as FieldError).message : ""; //undefined または string または FieldError の可能性があるため、エラーが発生　沼ポイント

  const optionsList = name ? TagListSelector({ idName: name }) : [];

  return (
    <Tags
      name={name}
      text={label}
      formMethods={formMethods}
      items={optionsList}
    />
  );
};
