import { TextField, MenuItem } from "@mui/material";
import React, { ChangeEvent } from "react";

// プルダウン　選択式のフォーム

// optionsListには選択肢のリストが入る

interface SelectValuesProps {
  id: string;
  label: string;
  value: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  optionsList: string[];
}

export const SelectValues: React.FC<SelectValuesProps> = ({
  id,
  label,
  value,
  defaultValue,
  onChange,
  optionsList,
}) => {
  // 選択されたらonChange関数でstateが更新される
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      id={id}
      select
      label={label}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
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
