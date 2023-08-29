import { itemDatas } from "../../../typs/itemDatas";
import { FC } from "react";
import { TentAbilitys } from "../../molecules/itemPage/abilitys/TentAbilitys";

//　カテゴリー名を受け取って対応するカテゴリーの情報コンポーネントを返す
export const CategorySelecter: FC<itemDatas> = (props) => {
  const { itemDatas } = props;
  const categoryName = itemDatas.category.category_name;
  if (categoryName === "テント") {
    return <TentAbilitys itemDatas={itemDatas} />;
  } else {
    return <h1>qqaaa</h1>;
  }
};
