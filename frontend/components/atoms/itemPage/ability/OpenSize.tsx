import { FC } from "react";
import { ItemDataText } from "../text/ItemDataText";
import { ItemDetailText } from "../text/ItemDetailText";
interface openSizesProps {
  open_width: number;
  open_depth: number;
  open_height: number;
}

export const OpenSize: FC<openSizesProps> = (props) => {
  const { open_width, open_depth, open_height } = props;
  return (
    <div>
      <ItemDataText text={"サイズ (幅×奥行き×高さ)"} />
      <ItemDetailText
        text={`${open_width} × ${open_depth} × ${open_height} cm`}
      />
    </div>
  );
};
