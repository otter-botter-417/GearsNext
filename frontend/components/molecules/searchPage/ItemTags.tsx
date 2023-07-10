import { ItemTagList } from "@/components/atoms/itemAppend/SelectNames/ItemTagList";
import { Tags } from "@/components/atoms/itemAppend/Tags";
import { itemTagsState } from "@/components/atoms/state/searchPage/itemTagsState";
import { Box } from "@mui/system";
import React from "react";
import { useRecoilState } from "recoil";

const ItemTags = () => {
  const [itemTags, setItemTags] = useRecoilState(itemTagsState);
  return (
    <Box flexGrow={1}>
      {/* <Tags
        text={"タグ"}
        tagName={itemTags}
        setTagName={setItemTags}
        items={ItemTagList}
      /> */}
    </Box>
  );
};

export default ItemTags;
