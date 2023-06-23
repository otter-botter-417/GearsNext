import { FC } from "react";
import { ItemDataText } from "../text/ItemDataText";
import { ItemDetailListText } from "../text/ItemDetailListText";

type fabricsType = {
  fabrics?: Array<string>;
};

export const Fabrics: FC<fabricsType> = (props) => {
  const { fabrics } = props;
  if (fabrics) {
    const fabricsArray = fabrics[0].split(",");
    // console.log(fabricsArray);
    return (
      <div>
        <ItemDataText text={"素材"} />
        {fabricsArray.map((str, index) => (
          <ItemDetailListText key={index} text={str} />
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
};
