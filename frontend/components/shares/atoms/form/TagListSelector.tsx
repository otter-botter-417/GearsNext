import React from "react";
import { ItemTagList } from "@/components/atoms/itemAppend/SelectNames/ItemTagList";
import { ColorTagList } from "@/components/atoms/itemAppend/SelectNames/ColorTagList";

export const TagListSelector = ({ idName }: { idName: string }): string[] => {
  let tagList: string[];

  if (idName === "itemTags") {
    tagList = ItemTagList;
  } else if (idName === "colorTags") {
    tagList = ColorTagList;
  } else {
    tagList = [];
  }

  return tagList;
};
