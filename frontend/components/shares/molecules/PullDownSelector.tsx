// PullDownSelector.tsx
import React from 'react';
import { useRecoilState, RecoilState } from 'recoil';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface PullDownSelectorProps {
  options: string[];
  label: string;
  stateAtom: RecoilState<string>;
}

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
export const PullDownSelector: React.FC<PullDownSelectorProps> = ({
  options,
  label,
  stateAtom,
}) => {
  const [value, setValue] = useRecoilState(stateAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      id={label}
      select
      label={label}
      value={value}
      onChange={handleChange}
      fullWidth={true}
      style={{ minWidth: '100px' }} // ここで最小幅を設定
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};
