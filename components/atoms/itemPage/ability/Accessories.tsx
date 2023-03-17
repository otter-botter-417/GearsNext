import { FC } from "react";
import { ItemDataText } from "../text/ItemDataText";
import { ItemDetailListText } from "../text/ItemDetailListText";

type accessoriesType = {
  accessories?: Array<string>;
};

export const Accessories: FC<accessoriesType> = (props) => {
  const { accessories } = props;
  if (!accessories) {
    return <div></div>;
  } else {
    return (
      <div>
        <ItemDataText text={"その他付属品"} />
        {accessories.map((accessoriesArray) => (
          <ItemDetailListText
            key={accessoriesArray}
            text={`${accessoriesArray}`}
          />
        ))}
      </div>
    );
  }
};
