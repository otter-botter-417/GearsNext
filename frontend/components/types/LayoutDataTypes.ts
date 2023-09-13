export type LayoutDataTypes = {
  layoutId: number;
  text: string;
  userId: number;
  userName: string;
  favoriteCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  comments: any;
  items: Array<{ itemId: number, itemName: string, imagename: string }>;
  tagPositions: Array<{
    xPosition: number,
    yPosition: string,
    itemId: string,
    itemName: string,
  }>;
};

