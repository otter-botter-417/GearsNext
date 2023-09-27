import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { userState } from '@/components/shares/atoms/state/userState';

type AddNewCommentProps = {
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  onClick: () => void;
};

/**
 * このコンポーネントは、新しいコメントを追加するための入力フィールドとボタンを提供します。
 * - ユーザーがログインしていない場合、何も表示しません。
 * - コメントテキストが存在する場合のみ、「投稿」ボタンを表示します。
 *
 * @param commentText - コメントのテキスト
 * @param setCommentText - コメントテキストを設定する関数
 * @param onClick - 「投稿」ボタンがクリックされたときに実行される関数
 */
export const AddNewComment: FC<AddNewCommentProps> = ({
  commentText,
  setCommentText,
  onClick,
}) => {
  const updateCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };
  const user = useRecoilValue(userState);
  // ユーザーがログインしていない場合は何も表示しない
  if (!user) return null;

  return (
    <Box component="form" justifyContent="flex-end">
      <TextField
        fullWidth
        multiline
        variant="standard"
        id="outlined-multiline-static"
        label="コメントを追加"
        value={commentText}
        onChange={updateCommentText}
      />
      {commentText && (
        <Button variant="text" onClick={onClick}>
          投稿
        </Button>
      )}
    </Box>
  );
};
