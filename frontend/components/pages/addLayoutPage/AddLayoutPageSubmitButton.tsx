import React from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { imageFileState } from '@/components/shares/atoms/state/imageFileState';
import { useRecoilValue } from 'recoil';
import { loadingButtonState } from '@/components/shares/atoms/state/loadingButtonState';

/**
 * このコンポーネントは、レイアウト投稿ページの投稿ボタンを提供します。
 * - 投稿ボタンは、画像が選択されている場合のみ有効になります。
 */
export const AddLayoutPageSubmitButton = () => {
  const imageFile = useRecoilValue(imageFileState);
  const loading = useRecoilValue(loadingButtonState);
  return (
    <Button
      type="submit"
      size="large"
      disabled={loading || !imageFile}
      variant="contained"
      endIcon={<SendIcon />}
    >
      {loading ? '投稿中...' : '投稿'}
    </Button>
  );
};
