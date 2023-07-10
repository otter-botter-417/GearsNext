import { FC } from "react";
import { ItemDataText } from "../text/ItemDataText";
import { ItemDetailText } from "../text/ItemDetailText";

type innerTentType = {
  innerTent: string;
};

export const InnerTent: FC<innerTentType> = (props) => {
  const { innerTent } = props;
  return (
    <div>
      <ItemDataText text={"インナーテント"} />
      <ItemDetailText text={`${innerTent}`} />
    </div>
  );
};
