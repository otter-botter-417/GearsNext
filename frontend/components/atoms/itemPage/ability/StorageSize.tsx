import { FC } from "react";
import { sizeType } from "../../../../typs/sizeType";
import { ItemDataText } from "../text/ItemDataText";
import { ItemDetailText } from "../text/ItemDetailText";

interface storageSizesProps {
  storage_width: number;
  storage_depth: number;
  storage_height: number;
}
export const StorageSize: FC<storageSizesProps> = (props) => {
  const { storage_width, storage_depth, storage_height } = props;
  return (
    <div>
      <ItemDataText text={"収納サイズ (幅×奥行き×高さ)"} />
      <ItemDetailText
        text={`${storage_width} × ${storage_depth} × ${storage_height} cm`}
      />
    </div>
  );
};
