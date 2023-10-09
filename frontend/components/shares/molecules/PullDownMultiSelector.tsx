import React, { FC } from 'react';
import { useRecoilState, RecoilState } from 'recoil';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';

type PullDownMultiSelectorProps = {
  options: string[];
  label: string;
  stateAtom: RecoilState<string[]>;
};

/**
 * Autocompleteを使用して、複数選択ができるセレクター
 * @param options 選択肢のリストを渡す
 * @param label ラベルを渡す
 * @param stateAtom 状態を管理するRecoilのatomを渡す
 * @returns
 *
 * @example
 * <PullDownMultiSelector
 * options={CategoryNameList}
 * label="Category"
 * stateAtom={categoryValueState}
 * />
 */
export const PullDownMultiSelector: FC<PullDownMultiSelectorProps> = ({
  options,
  label,
  stateAtom,
}) => {
  const [value, setValue] = useRecoilState(stateAtom);

  return (
    <Autocomplete
    fullWidth
      multiple
      id={label}
      options={options}
      size="small"
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} />
      )}
    />
  );
};
