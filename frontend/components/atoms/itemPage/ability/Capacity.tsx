import { FC } from "react";
import { ItemDataText } from "../text/ItemDataText";
import { ItemDetailText } from "../text/ItemDetailText";

type capacityType = {
  capacity: number;
};

export const Capacity: FC<capacityType> = (props) => {
  const { capacity } = props;
  return (
    <div>
      <ItemDataText text={"収容人数"} />
      <ItemDetailText text={`${capacity}人`} />
    </div>
  );
};
