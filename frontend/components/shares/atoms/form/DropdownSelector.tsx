import React, { FC } from 'react';
import { TextField, MenuItem } from '@mui/material';

import { useFormMethods } from '@/hooks/useFormMethods';

import { getOptionList } from '@/components/pages/addItemPage/DropDownListSelector';
import { GetFieldErrorMessage } from './GetFieldErrorMessage';

type DropdownSelectorProps = {
  name: string;
  label: string;
  options?: string[];
};

/**
 * 単一選択のプルダウンメニューを提供します。
 * - このコンポーネントは、任意のフォームフィールド名（name）、ラベル（label）を受け取ります。
 * ― また、任意のプルダウンメニューの選択肢（options）を受け取ることができます。
 *
 * @param name - フォームフィールドの名前
 * @param label - フォームフィールドのラベル
 * @param options - プルダウンメニューの選択肢
 */
export const DropdownSelector: FC<DropdownSelectorProps> = ({
  name,
  label,
  options,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormMethods();
  const optionsList = options || getOptionList(name);
  let selectedValue = watch(name);

  // 選択されている値がオプションに存在するか確認
  // 存在しない場合は空文字にする　主にカテゴリーの選択肢が変更された場合に発生
  if (!optionsList.includes(selectedValue)) {
    selectedValue = '';
  }

  // 選択肢が存在しない、または空の場合は null を返す
  if (!optionsList || optionsList.length === 0) {
    return null;
  }
  return (
    <TextField
      {...register(name)}
      error={!!errors[name]}
      helperText={GetFieldErrorMessage(errors, name)}
      id={name}
      select
      label={label}
      value={selectedValue} // valueを動的に更新
      defaultValue={optionsList[0]}
      fullWidth
    >
      {optionsList.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};
