export type LayoutDataType = {
  layoutId: number;
  text: string;
  userId: number;
  userName: string;
  favoriteCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  comments: Array<{
    commentId: number,
    layoutId: number,
    content: string,
    userName: string,
    parentId:  number | null,
    createdAt: string
  }>;
  items: Array<{ itemId: number, itemName: string, imageName: string }>;
  tagPositions: Array<{
    xPosition: number,
    yPosition: number,
    itemId: number,
    itemName: string,
  }>;
};

