import { FC } from "react";
import { ItemDataText } from "../text/ItemDataText";
import { ItemDetailText } from "../text/ItemDetailText";

type grandSheetType = {
  grandSheet: string;
};

export const GrandSheet: FC<grandSheetType> = (props) => {
  const { grandSheet } = props;
  return (
    <div>
      <ItemDataText text={"グランドシート"} />
      <ItemDetailText text={`${grandSheet}`} />
    </div>
  );
};
