import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import { CategoryName } from '@/components/types/CategoryName';
import { UseFormMethodsForAddNewItem } from "@/components/types/FormMethodsForAddNewItemType";

import * as Schemas from "@/components/shares/atoms/schema/AllDetailValidatedSchemas";  // すべてのスキーマをインポート
import { useEffect } from "react";
import { AddNewItemValidatedSchema } from "@/components/shares/atoms/schema/AddNewItemValidatedSchema";

/**
 * カテゴリ名に基づいて適切なバリデーションスキーマを使用するための useForm メソッドを提供します。
 * - formMethods からカテゴリ名を取得し、そのカテゴリ名に基づいてスキーマを取得します。
 * 
 * @param formMethods - react-hook-form から取得した formMethods
 * @returns - カスタマイズされた useForm メソッド
 * 
 * @example
 * const detailFormMethods = useDetailFormMethods(formMethods);
 */
export const useDetailFormMethods = (formMethods: UseFormMethodsForAddNewItem) => {
  const categoryName: CategoryName = formMethods.watch("itemCategoryName") as CategoryName;

  /**
   * CategoryName に基づいて、スキーマの型を定義します。
   */
  type SchemaType = {
    [key in CategoryName]: yup.AnyObjectSchema | undefined;
  };

  // スキーマをマッピング
  const schemaMapping: SchemaType = {
    "テント": Schemas.TentDetailValidatedSchema,
    "タープ": Schemas.TarpDetailValidatedSchema,
    "チェア": Schemas.ChairDetailValidatedSchema,
    "テーブル": Schemas.TableDetailValidatedSchema,
    "ランタン": Schemas.LanternDetailValidatedSchema,
    '寝袋': Schemas.SleepingBagDetailValidatedSchema,
    'マット': Schemas.FloorMatDetailValidatedSchema,
    'コット': Schemas.CampBedDetailValidatedSchema,
    'ストーブ': Schemas.StoveDetailValidatedSchema,
  };

  // カテゴリ名に基づいて選択されたスキーマを取得
  const selectedSchema = (schemaMapping[categoryName] || yup.object()) as yup.AnyObjectSchema;

  // 基本的なスキーマと詳細なスキーマを合成
  // const combinedSchema = AddNewItemValidatedSchema.concat(selectedSchema);

  // useFormのインスタンスを生成
  const detailFormMethods = useForm({
    resolver: yupResolver(selectedSchema),
  });

  return detailFormMethods;
};