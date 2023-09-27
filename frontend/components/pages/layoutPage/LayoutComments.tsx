import React, { FC, useState } from 'react';
import { Box } from '@mui/material';

import { ParentComment } from './ParentComment';
import { ReplyComment } from './ReplyComment';
import { CommentType } from '@/components/types/CommentType';
import SwitchReplyDisplayButton from './SwitchReplyDisplayButton';

type LayoutCommentsProps = {
  comments: CommentType[];
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  setCommentParentId: React.Dispatch<React.SetStateAction<number | null>>;
};

/**
 * このコンポーネントは、コメントとその返信を表示します。
 * - 返信がある場合は、返信の表示/非表示を切り替えるボタンを提供します。
 * - 返信コメントの表示/非表示は、SwitchReplyDisplayButtonコンポーネントで切り替えます。
 * - 返信ボタンが押された場合は、返信する対象のコメントIDとテキストを設定します。
 *
 * @param comments - 表示するコメントの配列
 * @param setCommentText - コメントテキストの更新関数
 * @param setCommentParentId - 親コメントIDの更新関数
 *
 * @returns {JSX.Element} コメントと返信を表示するReact要素
 */
export const LayoutComments: FC<LayoutCommentsProps> = ({
  comments,
  setCommentText,
  setCommentParentId,
}) => {
  const [openedCommentId, setOpenedCommentId] = useState<number | null>(null);

  /**
   * 返信の表示/非表示を切り替える関数です。
   *
   * @param commentId - コメントID
   */
  const switchReplyDisplay = (commentId: number) => {
    setOpenedCommentId(openedCommentId === commentId ? null : commentId);
  };

  /**
   * 返信する対象のコメントIDとテキストを設定します。
   *
   * @param commentId - コメントID
   * @param userName - ユーザー名
   */
  const setReplyTarget = (commentId: number, userName: string) => {
    setCommentParentId(commentId);
    setCommentText(`@${userName} `);
  };

  return (
    <Box>
      {/* コメントの表示処理 */}
      {comments.map((comment) => {
        // parentIdがnullの場合は親コメントとみなす
        if (comment.parentId === null) {
          const replies = comments.filter(
            (reply) => reply.parentId === comment.commentId,
          );

          return (
            <Box key={comment.commentId}>
              {/* 親コメントを表示します */}
              <ParentComment comment={comment} replyHandle={setReplyTarget} />

              {/* 返信があれば返信コメントの表示を切り替えるボタン */}
              {replies.length > 0 && (
                <SwitchReplyDisplayButton
                  onClick={() => switchReplyDisplay(comment.commentId)}
                  openedCommentId={openedCommentId}
                  commentId={comment.commentId}
                />
              )}

              {/* 親コメントへの返信コメントを表示します　openedCommentIdに対応する */}
              {openedCommentId === comment.commentId && (
                <Box sx={{ ml: 5 }}>
                  {replies.map((reply) => (
                    <ReplyComment key={reply.commentId} replyComment={reply} />
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
