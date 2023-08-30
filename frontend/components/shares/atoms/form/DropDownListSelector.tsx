import { BrandNameList } from "@/components/atoms/itemAppend/SelectNames/BrandNameList";
import { CategoryNameList } from "@/components/atoms/itemAppend/SelectNames/CategoryNameList";

export const DropDownListSelector = ({
  idName,
}: {
  idName: string;
}): string[] => {
  let name: string[];

  if (idName === "brandName") {
    name = BrandNameList;
  } else if (idName === "itemCategoryName") {
    name = CategoryNameList;
  } else {
    name = [];
  }

  return name;
};
