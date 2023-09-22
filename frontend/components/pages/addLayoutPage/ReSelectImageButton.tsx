import React from 'react';
import { Button } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { imageFileState } from '@/components/shares/atoms/state/imageFileState';
import { FC, useRef } from 'react';
import { useImageSelector } from '@/hooks/useImageSelector';
/**
 * このコンポーネントは、画像を選択し直すボタンを提供します。
 * - 画像が選択されていない時は何も表示しません。
 */
export const ReSelectImageButton: FC = () => {
  const imageFile = useRecoilValue(imageFileState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { handleFileChange } = useImageSelector({ imageRef });

  if (!imageFile) return null;
  return (
    <div>
      <input
        accept="image/*"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="contained"
        style={{
          padding: '10px 20px',
        }}
      >
        画像を変更
      </Button>
    </div>
  );
};
