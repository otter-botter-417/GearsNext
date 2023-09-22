import React from 'react';
import { Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useRecoilState } from 'recoil';
import { imageFileState } from '@/components/shares/atoms/state/imageFileState';

/**
 * このコンポーネントは、画像を選択し直すボタンを提供します。
 * - 画像が選択されていない時は何も表示しません。
 */
export const ReSelectImageButton = () => {
  const [imageFile, setImageFile] = useRecoilState(imageFileState);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  if (!imageFile) return null;
  return (
    <div>
      {/* 隠れたinput要素 */}
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="icon-button-file"
        type="file"
        onChange={handleImageChange}
      />
      {/* カスタムボタン */}
      <label htmlFor="icon-button-file">
        <Button
          component="span"
          variant="contained"
          startIcon={<PhotoCamera />}
        >
          画像を選び直す
        </Button>
      </label>
    </div>
  );
};
