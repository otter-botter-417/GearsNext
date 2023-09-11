import { ChairDetailValidatedSchema } from "@/components/shares/atoms/schema/ChairDetailValidatedSchema";
import { LanternDetailValidatedSchema } from "@/components/shares/atoms/schema/LanternDetailValidatedSchema";
import { TableDetailValidatedSchema } from "@/components/shares/atoms/schema/TableDetailValidatedSchema";
import { TarpDetailValidatedSchema } from "@/components/shares/atoms/schema/TarpDetailValidatedSchema";
import { TentDetailValidatedSchema } from "@/components/shares/atoms/schema/TentDetailValidatedSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

// interface ItemInformationFieldsProps {
//   formMethods: UseFormReturn<any>;
// }

export const useDetailFormMethods = (formMethods: any) => {
  const categoryName = formMethods.watch("itemCategoryName");
  let schema: any = [];
  if (categoryName == "テント") {
    schema = TentDetailValidatedSchema();
  } else if (categoryName == "タープ") {
    schema = TarpDetailValidatedSchema();
  } else if (categoryName == "チェア") {
    schema = ChairDetailValidatedSchema();
  } else if (categoryName == "テーブル") {
    schema = TableDetailValidatedSchema();
  } else if (categoryName == "ランタン") {
    schema = LanternDetailValidatedSchema();
  }

  const detailFormMethods = useForm({
    resolver: yupResolver(schema),
  });

  return detailFormMethods;
};
