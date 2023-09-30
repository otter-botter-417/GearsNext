import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';

import { CommentType } from '@/components/types/CommentType';

import { userState } from '@/components/shares/atoms/state/userState';

import { TimeDifferenceFormatter } from '@/components/shares/atoms/TimeDifferenceFormatter';

type ParentCommentProps = {
  comment: CommentType;
  replyHandle: (commentId: number, userName: string) => void;
};

/**
 * このコンポーネントは、親コメントとそのメタデータ（時間、返信ボタンなど）を表示します。
 * - ログインしている場合のみ、返信ボタンを表示します。
 * - 返信ボタンが押された場合は、返信する対象のコメントIDとテキストを設定します。
 *
 * @param comment - 表示する親コメントの情報
 * @param replyHandle - 返信ボタンがクリックされたときに呼ばれる関数
 *
 * @returns {JSX.Element} 親コメントとそのメタデータを表示するReact要素
 */
export const ParentComment: FC<ParentCommentProps> = ({
  comment,
  replyHandle,
}) => {
  const user = useRecoilValue(userState);
  return (
    <>
      <Typography variant="body2" color="initial">
        {`${comment.userName} ${comment.content}`}
      </Typography>
      <Box display={'flex'} alignItems={'center'}>
        {/* 時間情報を表示 */}
        <TimeDifferenceFormatter time={comment.createdAt} variant={'overline'} />

        {/* ログインしている場合、返信ボタンを表示 */}
        {user && (
          <Button
            size='small'
            onClick={() => replyHandle(comment.commentId, comment.userName)}
          >
            返信する
          </Button>
        )}
      </Box>
    </>
  );
};
