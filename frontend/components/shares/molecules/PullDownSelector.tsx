import React, { FC } from 'react';
import { useRecoilState, RecoilState } from 'recoil';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

type PullDownSelectorProps = {
  options: string[];
  label: string;
  stateAtom: RecoilState<string>;
  value?: string;
};

/**
 * プルダウンセレクター
 * @param options プルダウンの選択肢のリストを渡す
 * @param label プルダウンのラベルを渡す id としても使用される
 * @param stateAtom プルダウンの状態を管理するatomを渡す
 * @returns
 *
 * @example
 * <PullDownSelector
 * options={CategoryNameList}
 * label="Category"
 * stateAtom={categoryValueState}
 * />
 */
export const PullDownSelector: FC<PullDownSelectorProps> = ({
  options,
  label,
  stateAtom,
  value,
}) => {
  const [selectedValue, setSelectedValue] = useRecoilState(stateAtom);
  const finalValue = value && options.includes(value) ? value : selectedValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <TextField
      id={label}
      select
      label={label}
      value={finalValue}
      onChange={handleChange}
      fullWidth={true}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};
