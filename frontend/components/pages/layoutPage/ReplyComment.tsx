import { FC } from 'react';
import { Typography } from '@mui/material';

import { CommentType } from '@/components/types/CommentType';

import { TimeDifferenceFormatter } from '@/components/shares/atoms/TimeDifferenceFormatter';

type ReplyCommentProps = {
  replyComment: CommentType;
};

/**
 * このコンポーネントは、返信コメントを表示します。
 * - 返信コメントのメタデータ（時間など）を表示します。
 *
 * @param replyComment - 表示する返信コメントのデータ
 *
 * @returns {JSX.Element} 返信コメントを表示するReact要素
 */
export const ReplyComment: FC<ReplyCommentProps> = ({ replyComment }) => {
  return (
    <Typography variant="body2" component="div">
      {replyComment.userName} {replyComment.content}
      <TimeDifferenceFormatter time={replyComment.createdAt} />
    </Typography>
  );
};
