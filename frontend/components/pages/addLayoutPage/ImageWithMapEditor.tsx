import React, { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Box, Typography } from '@mui/material';

import { imagePreviewUrlState } from '@/components/shares/atoms/state/imagePreviewUrlState';
import { itemSearchQueryState } from '@/components/shares/atoms/state/itemSearchQueryState';
import { imageMapPositionState } from '@/components/shares/atoms/state/imageMapPositionState';

import { ImageMapLabel } from './ImageMapLabel';
import { ImageMapTagEditor } from './ImageMapTagEditor';
import Image from 'next/image';

const IMAGE_SIZE = 500;

type OnLoadingCompleteResult = { naturalHeight: number; naturalWidth: number };

/**
 * このコンポーネントは、選択された画像を表示し、
 * その上にイメージマップ（クリック可能な領域）を設定するためのUIを提供します。
 *
 * - 画像表示: 選択された画像はRecoil State（imagePreviewUrlState）から取得され、表示されます。
 *  - 画像がクリックされるまでは、画像上に「クリックしてタグを設定する」というテキストが表示されます。
 * - イメージマップの設定:
 *   - ユーザーが画像上をクリックすると、その座標がRecoil State（imageMapPositionState）に保存されます。
 *   - その座標を基に、ImageMapTagEditor コンポーネントで配置するラベルを選択できます。
 */
export const ImageWithMapEditor = () => {
  const [open, setOpen] = useState(false);
  const [firstClickDone, setFirstClickDone] = useState(false); // この状態を追加
  const imagePreviewUrl = useRecoilValue(imagePreviewUrlState);
  const setTextFieldPosition = useSetRecoilState(imageMapPositionState);
  const setItemSearchQuery = useSetRecoilState(itemSearchQueryState);
  const [imageSize, setImageSize] = useState({
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  });

  /**
   * 画像がクリックされた際に呼び出されるハンドラー。
   *
   * - 画像が初めてクリックされた時は、firstClickDone ステートを `true` に設定する。
   * - 画像上でのクリック座標を取得し、imageMapPositionState ステートを更新する。
   * - ImageMapTagEditor コンポーネントの表示を制御する `open` ステートを `true` に設定して開く。
   * - 検索クエリを保持する itemSearchQueryState ステートを初期化（空文字列に設定）。
   *
   * @param e クリックイベント。ReactのMouseEventオブジェクト。
   */
  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      if (!firstClickDone) {
        setFirstClickDone(true);
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const actualWidth = e.currentTarget.offsetWidth;
      const actualHeight = e.currentTarget.offsetHeight;

      const x = ((e.clientX - rect.left) / actualWidth) * 100;
      const y = ((e.clientY - rect.top) / actualHeight) * 100;

      setTextFieldPosition({ x, y });
      setOpen(true);
      setItemSearchQuery('');
    },
    [setTextFieldPosition, setOpen, setItemSearchQuery, firstClickDone],
  );

  // 画像の読み込みが完了した時に実行される関数 (画像のwidth heightを取得する)
  // 画像のwidth heightを取得して、画像のサイズを調整する
  const onImageLoadingComplete = (e: OnLoadingCompleteResult) => {
    let width = e.naturalWidth;
    let height = e.naturalHeight;

    // アスペクト比率を計算
    const aspectRatio = width / height;

    if (width > IMAGE_SIZE || height > IMAGE_SIZE) {
      if (width > height) {
        width = IMAGE_SIZE;
        height = IMAGE_SIZE / aspectRatio;
      } else {
        height = IMAGE_SIZE;
        width = IMAGE_SIZE * aspectRatio;
      }
    }
    setImageSize({ width, height });
  };

  if (!imagePreviewUrl) return null; // 画像が取得できるまでnullを返す

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={`${imageSize.width}px`}
      height={`${imageSize.height}px`}
      sx={{
        position: 'relative',
        margin: '0 auto',
      }}
    >
      <Image
        src={imagePreviewUrl}
        alt="Image Preview"
        width={imageSize.width}
        height={imageSize.height}
        priority
        onClick={handleImageClick}
        onLoadingComplete={(e) => onImageLoadingComplete(e)}
      />
      {!firstClickDone && (
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '5px',
            borderRadius: '5px',
          }}
        >
          <Typography variant="body2" color="white">
            画像上をクリックして、商品タグを設定できます
          </Typography>
        </div>
      )}
      <ImageMapTagEditor open={open} setOpen={setOpen} />
      <ImageMapLabel />
    </Box>
  );
};
