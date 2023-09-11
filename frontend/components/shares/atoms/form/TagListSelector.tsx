import React from "react";
import { ItemTagList } from "@/components/shares/atoms/SelectNames/ItemTagList";
import { ColorTagList } from "@/components/shares/atoms/SelectNames/ColorTagList";

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
