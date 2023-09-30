import { ItemTagList } from '@/components/shares/atoms/SelectNames/ItemTagList';
import { ColorTagList } from '@/components/shares/atoms/SelectNames/ColorTagList';

/**
 * 指定されたID名に対応するタグのリストを返します。
 *
 * @param idName - タグの種類を識別するためのID名（例：'itemTags', 'colorTags'）
 * @returns 対応するタグの文字列配列。該当するものがない場合は空の配列を返します。
 *
 * @example
 * const tags = getTagOptions('itemTags');  // ItemTagList の内容が返される
 */
export const GetTagOptions = (idName: string) => {
  let tagList: string[];

  if (idName === 'itemTags') {
    tagList = ItemTagList;
  } else if (idName === 'colorTags') {
    tagList = ColorTagList;
  } else {
    tagList = [];
  }

  return tagList;
};
