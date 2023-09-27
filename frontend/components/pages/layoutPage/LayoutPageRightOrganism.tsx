import React, { FC, useState } from 'react';
import { Box } from '@mui/material';

import { useCreateComment } from '@/hooks/api/useCreateComment';

import { LayoutDataType } from '@/components/types/LayoutDataType';

import { LayoutInfo } from './LayoutInfo';
import { AddNewComment } from './AddNewComment';
import { LayoutComments } from './LayoutComments';
import { LayoutPageButtons } from './LayoutPageButtons';

type LayoutPageRightOrganismProps = {
  layoutDetail: LayoutDataType;
};

/**
 * このコンポーネントは、レイアウトページの右側に配置される主要なUIを提供します。
 * - レイアウトの詳細情報とコメントの表示
 * - 新規コメントの追加
 *
 * @returns {JSX.Element} レイアウトの詳細情報、コメント、および新規コメント入力フィールドを含むReact要素
 */
export const LayoutPageRightOrganism: FC<LayoutPageRightOrganismProps> = ({
  layoutDetail,
}) => {
  const [commentText, setCommentText] = useState('');
  const [commentParentId, setCommentParentId] = useState<number | null>(null);
  const { createComment } = useCreateComment();

  /**
   * コメント送信ボタンが押されたときに実行される関数。
   * 成功した場合は、コメントとParentIdをリセットします。
   */
  const handleCommentSubmit = async () => {
    const success = await createComment(
      commentText,
      commentParentId,
      layoutDetail.layoutId,
    );
    if (success) {
      setCommentText('');
      setCommentParentId(null);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: '55vh',
          overflowY: 'auto',
        }}
      >
        <LayoutInfo layoutDetail={layoutDetail} />

        <LayoutComments
          comments={layoutDetail.comments}
          setCommentText={setCommentText}
          setCommentParentId={setCommentParentId}
        />
      </Box>
      <LayoutPageButtons layoutId={layoutDetail.layoutId} />

      <AddNewComment
        commentText={commentText}
        setCommentText={setCommentText}
        onClick={handleCommentSubmit}
      />
    </>
  );
};
