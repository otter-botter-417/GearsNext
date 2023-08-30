export type ItemDataTypes = {
  item_id: number;
  item_name: string;
  price: number;
  asin: string;
  open_size: {
    open_depth: number,
    open_height: number,
    open_width: number,
  }
  storage_size: {
    storage_depth: number,
    storage_height: number,
    storage_width: number,
  }
  weight: number;
  favorite_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  brand_name: string;
  category_name: string;
  sub_category_name: string;
  item_tags: Array<{ item_tag_name: string }>;
  color_tags: Array<{ color_tag_name: string }>;
};
