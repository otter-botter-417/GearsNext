export type CommentType = {
  commentId: number,
  layoutId: number,
  content: string,
  userName: string,
  parentId: number | null,
  createdAt: string
};

