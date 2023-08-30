import { useFormMethods } from '@/hooks/useFormMethods ';
import { TextField } from '@mui/material';
import React from 'react';
import { FieldError } from 'react-hook-form';

interface ValidatedTextFieldsProps {
  name: string;
  label: string;
}

/**
 * 受け取ったnameとlabelをもとにバリデーションを行うテキストフィールドを表示する
 *
 * @param props.key - フォームのkey
 * @param props.name - フォームのname
 * @param props.label - フォームのlabel
 *
 * @example
 * <ValidatedTextField
 * key={field.name}
 * name={field.name}
 * label={field.label}
 * />
 */
export const ValidatedTextField: React.FC<ValidatedTextFieldsProps> = ({
  name,
  label,
}) => {
  const formMethods = useFormMethods();

  const {
    register,
    formState: { errors },
  } = formMethods;

  //   errors[name]　が真の場合　messageを表示　そうでない(falsty)場合string型の空白を返す
  const errorMessage = errors[name] ? (errors[name] as FieldError).message : ''; //undefined または string または FieldError の可能性があるため、エラーが発生　沼ポイント

  return (
    <TextField
      {...register(name)}
      error={!!errors[name]}
      helperText={errorMessage}
      id={name}
      label={label}
      fullWidth
    />
  );
};
