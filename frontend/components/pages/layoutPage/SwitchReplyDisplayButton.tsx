import React, { FC } from 'react';
import { Button } from '@mui/material';

type SwitchReplyDisplayButtonProps = {
  onClick: (id: number) => void;
  openedCommentId: number | null;
  commentId: number;
};

/**
 * このコンポーネントは、返信コメントの表示・非表示を切り替えるボタンを提供します。
 *
 * @param onClick - ボタンがクリックされた際に呼び出される関数
 * @param openedCommentId - 現在開かれているコメントのID
 * @param commentId - このボタンが関連づけられているコメントのID
 *
 * @returns 返信コメントの表示・非表示を切り替えるボタン
 */
const SwitchReplyDisplayButton: FC<SwitchReplyDisplayButtonProps> = ({
  onClick,
  openedCommentId,
  commentId,
}) => {
  return (
    <Button onClick={() => onClick(commentId)} size={'small'}>
      {openedCommentId === commentId
        ? '――― 返信を閉じる'
        : '――― 返信を表示する'}
    </Button>
  );
};

export default SwitchReplyDisplayButton;
