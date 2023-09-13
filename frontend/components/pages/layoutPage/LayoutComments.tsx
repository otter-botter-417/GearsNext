import React, { FC, useState } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Link as MuiLink } from '@mui/material';

import { TimeDifferenceFormatter } from '../../shares/atoms/TimeDifferenceFormatter';

type CommentType = {
  content: string;
  created_at: string;
  user_id: number;
  comment_id: number;
  parent_id: number | null;
};

type LayoutCommentsProps = {
  comments: CommentType[];
};

export const LayoutComments: FC<LayoutCommentsProps> = ({ comments }) => {
  const [open, setOpen] = useState<number | null>(null);

  // 返信を見るボタンを押したときに開く open に comment_id を渡す
  // その comment_id と parent_id が一致するものを表示する
  // 既に開いている場合は閉じる
  const handleClick = (id: number) => {
    setOpen(open === id ? null : id);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
      }}
    >
      {comments.map((comment, index) => {
        if (comment.parent_id === null) {
          const replies = comments.filter(
            (reply) => reply.parent_id === comment.comment_id,
          );

          return (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" component="div">
                <Link href={`/users/${comment.user_id}`} passHref>
                  {comment.user_id}
                </Link>
                <br />
                {comment.content}
              </Typography>

              <TimeDifferenceFormatter time={comment.created_at} />

              {replies.length > 0 && (
                <Button
                  onClick={() => handleClick(comment.comment_id)}
                  variant="text"
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    border: 'none',
                    p: 0,
                  }}
                >
                  {' '}
                  {open === comment.comment_id ? '返信を閉じる' : '返信を見る'}
                </Button>
              )}

              {/* 返信コメント　openに対応する */}
              {open === comment.comment_id && (
                <Box sx={{ ml: 5 }}>
                  {replies.map((reply) => (
                    <Typography
                      key={reply.comment_id}
                      variant="body2"
                      component="div"
                    >
                      <Link href={`/users/${reply.user_id}`}>
                        {reply.user_id}
                      </Link>
                      <br />
                      {reply.content}
                      <TimeDifferenceFormatter time={reply.created_at} />
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          );
        }
        return null;
      })}
    </Box>
  );
};
