import { TextField, MenuItem } from "@mui/material";
import React, { ChangeEvent } from "react";
import { UseFormReturn, FieldError } from "react-hook-form";

// プルダウン　選択式のフォーム

// optionsListには選択肢のリストが入る

interface DropdownSelectorProps {
  name: string;
  label: string;
  formMethods: UseFormReturn<any>;
  defaultValue?: string;
  optionsList: string[];
}

export const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  name,
  label,
  formMethods,
  defaultValue,
  optionsList,
}) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  const errorMessage = errors[name] ? (errors[name] as FieldError).message : ""; //undefined または string または FieldError の可能性があるため、エラーが発生　沼ポイント

  return (
    <TextField
      {...register(name)}
      error={!!errors[name]}
      helperText={errorMessage}
      id={name}
      select
      label={label}
      defaultValue={defaultValue}
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
