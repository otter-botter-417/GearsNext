import { FC } from "react";
import { ItemDataText } from "../text/ItemDataText";
import { ItemDetailText } from "../text/ItemDetailText";

type WeightType = {
  weight: number;
};

export const Weight: FC<WeightType> = (props) => {
  const { weight } = props;
  return (
    <div>
      <ItemDataText text={"重量"} />
      <ItemDetailText text={`${weight}kg`} />
    </div>
  );
};
