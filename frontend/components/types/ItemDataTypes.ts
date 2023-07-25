export type ItemDataTypes = {
  asin: string;
  brand: {
    brand_id: number;
    brand_name: string;
  };
  category: {
    category_id: number;
    category_name: string;
  };
  created_at: string;
  favorite_count: number;
  image_name: string;
  item_id: number;
  item_name: string;
  open_depth: number;
  open_height: number;
  open_width: number;
  price: number;
  storage_depth: number;
  storage_height: number;
  storage_width: number;
  sub_category: {
    sub_category_id: number;
    sub_category_name: string;
  };
  updated_at: string;
  view_count: number;
  weight: number;
  colors: Array<string>;
  tags: Array<string>;

    capacity: number;
    innerTent: string;
    grandSheet: string;
    fabrics: Array<string>;
  };
};
