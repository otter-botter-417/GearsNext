import { UseFormReturn } from "react-hook-form";
import { Maybe } from "yup";

/**
 * 新規商品追加フォームの基本情報フィールドの型を定義します。
 */
export interface AddNewItemFormFields {
    itemName: string;
    asin: string;
    price: number;
    brandName: string;
    itemCategoryName: string;
    itemSubCategoryName: string;
    openWidth: number;
    openDepth: number;
    openHeight: number;
    storageWidth: number;
    storageDepth: number;
    storageHeight: number;
    weight: number;
    itemTags: Maybe<(string | undefined)[] | undefined>;
    colorTags: Maybe<(string | undefined)[] | undefined>;
}

export type UseFormMethodsForAddNewItem = UseFormReturn<AddNewItemFormFields>;
