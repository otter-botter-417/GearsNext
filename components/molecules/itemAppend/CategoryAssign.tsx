import { TentDatas } from "@/components/atoms/itemAppend/itemDatas/TentDatas";
import { Dispatch, SetStateAction } from "react";

interface Props {
  categoryValue: string;
  abilitys: any;
  setAbilitys: Dispatch<SetStateAction<any>>;
}

const CategoryAssign = ({ categoryValue, abilitys, setAbilitys }: Props) => {
  if (categoryValue === "テント") {
    return <TentDatas abilitys={abilitys} setAbilitys={setAbilitys} />;
  } else {
    return null;
  }
};

export default CategoryAssign;
