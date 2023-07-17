import { TextField } from "@mui/material";
import React from "react";
import { UseFormReturn, FieldError } from "react-hook-form";

interface ValidatedTextFieldsProps {
  name: string;
  label: string;
  formMethods: UseFormReturn<any>;
}

export const ValidatedTextField: React.FC<ValidatedTextFieldsProps> = ({
  name,
  label,
  formMethods,
}) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  //   errors[name]　が真の場合　messageを表示　そうでない(falsty)場合string型の空白を返す
  const errorMessage = errors[name] ? (errors[name] as FieldError).message : ""; //undefined または string または FieldError の可能性があるため、エラーが発生　沼ポイント

  return (
    <TextField
      {...register(name)}
      error={!!errors[name]}
      helperText={errorMessage}
      id={name}
      label={label}
    />
  );
};
