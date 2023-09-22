import React from 'react';
import { useRecoilValue } from 'recoil';

import { imagePreviewUrlState } from '@/components/shares/atoms/state/imagePreviewUrlState';

import { ImageWithMapEditor } from './ImageWithMapEditor';
import { ImagePlaceholderWithSelector } from './ImagePlaceholderWithSelector';

/**
 * このコンポーネントは、選択された画像のプレビューURLを元にコンポーネントを切り替えます。
 * - 画像が選択されていない時は画像選択コンポーネントを表示します。
 * - 画像が選択されている時はイメージマップの座標を設定するコンポーネントを表示します。
 */
export const ImageUploaderAndMapEditor = () => {
  //  選択された画像のプレビューURL
  const imagePreviewUrl = useRecoilValue(imagePreviewUrlState);

  return (
    <>
      {imagePreviewUrl ? (
        <ImageWithMapEditor />
      ) : (
        <ImagePlaceholderWithSelector />
      )}
    </>
  );
};
