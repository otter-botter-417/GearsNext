export type ItemDataTypes = {
  _id: string;
  category: string;
  itemName: string;
  brandName: string;
  price: number;
  asin: string;
  imagePath: string;
  amazonUrl: string;
  colors: Array<string>;
  tags: Array<string>;
  itemAbility: {
    subCategorys: string;
    openSize: {
      wide: number;
      depth: number;
      high: number;
    };
    storageSize: {
      wide: number;
      depth: number;
      high: number;
    };
    weight: number;
    capacity: number;
    innerTent: string;
    grandSheet: string;
    accessories: Array<string>;
  };
};
