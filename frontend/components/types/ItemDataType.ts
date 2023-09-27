export type ItemDataType = {
  itemId: number;
  itemName: string;
  price: number;
  imageName: string;
  asin: string;
  openSize: {
    openDepth: number,
    openHeight: number,
    openWidth: number,
  }
  storageSize: {
    storageDepth: number,
    storageHeight: number,
    storageWidth: number,
  }
  weight: number;
  favoriteCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  brandName: string;
  categoryName: string;
  subCategoryName: string;
  itemTags: Array<{ itemTagName: string }>;
  colorTags: Array<{ colorTagName: string }>;
  itemAttributes: {
    capacity: number,
    inner_tent: string,
    grand_sheet: string,
    fabrics: string,
  }
  layouts: Array<{
    layoutId: number,
    favoriteCount: number,
    viewCount: number,
  }>
  user: {
    isLoggedIn: boolean,
    isFavorited: boolean,
    isInInventory: boolean,
  }
};
