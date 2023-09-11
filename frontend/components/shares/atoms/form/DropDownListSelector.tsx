import { BrandNameList } from "@/components/shares/atoms/SelectNames/BrandNameList";
import { CategoryNameList } from "@/components/shares/atoms/SelectNames/CategoryNameList";

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
