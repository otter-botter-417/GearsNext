import React, { FC, useState } from 'react';
import { TextField, MenuItem, Chip } from '@mui/material';

import { useFormMethods } from '@/hooks/useFormMethods';

import { GetTagOptions } from './GetTagOptions';
import { GetFieldErrorMessage } from './GetFieldErrorMessage';

type TagSelectorProps = {
  idName: string;
  label: string;
};

/**
 * 複数選択可能なタグセレクターを提供します。
 * - このコンポーネントは、任意のフォームフィールド名（idName）とラベル（label）を受け取ります。
 *
 * @param idName - フォームフィールドの名前
 * @param label - フォームフィールドのラベル
 */
export const TagSelector: FC<TagSelectorProps> = ({ idName, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormMethods();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tagOptions = GetTagOptions(idName);

  /**
   * タグ選択が変更されたときのハンドラ
   *
   * @param {React.ChangeEvent<{ value: unknown }>} event - イベントオブジェクト
   */
  const handleTagSelectionChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setSelectedTags(event.target.value as string[]);
  };

  return (
    <TextField
      {...register(idName)}
      id={idName}
      select
      label={label}
      value={selectedTags}
      onChange={handleTagSelectionChange}
      error={!!errors[idName]}
      helperText={GetFieldErrorMessage(errors, idName)}
      fullWidth
      SelectProps={{
        multiple: true,
        renderValue: (selected) => (
          <div>
            {(selected as string[]).map((value) => (
              <Chip key={value} label={value} />
            ))}
          </div>
        ),
      }}
    >
      {tagOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};
