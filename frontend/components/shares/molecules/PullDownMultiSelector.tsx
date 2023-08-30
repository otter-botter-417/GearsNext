import React from 'react';
import { useRecoilState, RecoilState } from 'recoil';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface PullDownMultiSelectorProps {
  options: string[];
  label: string;
  stateAtom: RecoilState<string[]>;
}

/**
 * プルダウンで複数選択ができるセレクター
 * @param options プルダウンの選択肢のリストを渡す
 * @param label プルダウンのラベルを渡す id としても使用される
 * @param stateAtom プルダウンの状態を管理するatomを渡す
 * @returns
 *
 * @example
 * <PullDownMultiSelector
 * options={CategoryNameList}
 * label="Category"
 * stateAtom={categoryValueState}
 * />
 */
export const PullDownMultiSelector: React.FC<PullDownMultiSelectorProps> = ({
  options,
  label,
  stateAtom,
}) => {
  const [value, setValue] = useRecoilState(stateAtom);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setValue(event.target.value as string[]);
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={label}
        multiple
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
