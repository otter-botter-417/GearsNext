import { ColorTagList } from "@/components/atoms/itemAppend/SelectNames/ColorTagList";
import { ItemTagList } from "@/components/atoms/itemAppend/SelectNames/ItemTagList";
import { Tags } from "@/components/atoms/itemAppend/Tags";
import { colorTagsState } from "@/components/atoms/state/searchPage/colorTagsState";
import { itemTagsState } from "@/components/atoms/state/searchPage/itemTagsState";
import { Box } from "@mui/system";
import React from "react";
import { useRecoilState } from "recoil";

const ColorTags = () => {
  const [colorTags, setColorTags] = useRecoilState(colorTagsState);
  return (
    <Box flexGrow={1}>
      {/* <Tags
        text={"カラー"}
        name={colorTags}
        setTagName={setColorTags}
        items={ColorTagList}
      /> */}
    </Box>
  );
};

export default ColorTags;
