import { TextField, MenuItem } from "@mui/material";
import React from "react";
import { UseFormReturn, FieldError } from "react-hook-form";
import { DropDownListSelector } from "./DropDownListSelector";

// プルダウン　選択式のフォーム

// optionsListには選択肢のリストが入る

interface DropdownSelectorProps {
  name: string;
  label: string;
  formMethods: UseFormReturn<any>;
  defaultValue?: string;
}

export const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  name,
  label,
  formMethods,
  defaultValue,
}) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  const errorMessage = errors[name] ? (errors[name] as FieldError).message : ""; //undefined または string または FieldError の可能性があるため、エラーが発生　沼ポイント

  const optionsList = name ? DropDownListSelector({ idName: name }) : [];

  return (
    <TextField
      {...register(name)}
      error={!!errors[name]}
      helperText={errorMessage}
      id={name}
      select
      label={label}
      defaultValue={optionsList[0]}
      fullWidth
    >
      {/* map関数でリスト内の選択肢の処理 */}
      {optionsList.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};
