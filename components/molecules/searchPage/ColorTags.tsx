import { colorTagList } from "@/components/atoms/itemAppend/SelectNames/ColorTagList";
import { itemTagList } from "@/components/atoms/itemAppend/SelectNames/ItemTagList";
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
      <Tags
        text={"カラー"}
        tagName={colorTags}
        setTagName={setColorTags}
        items={colorTagList}
      />
    </Box>
  );
};

export default ColorTags;
