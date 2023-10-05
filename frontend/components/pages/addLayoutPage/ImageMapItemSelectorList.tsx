import React, { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  List,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItemButton,
} from '@mui/material';

import { filteredItemsState } from '@/components/shares/atoms/state/filteredItemsState';
import { imageMapDataListState } from '@/components/shares/atoms/state/imageMapDataListState';
import { FittedImage } from '@/components/shares/atoms/FittedImage';

type ImageMapItemSelectorListType = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  textFieldPosition: { x: number; y: number };
};

/**
 * このコンポーネントは、リストのアイテムをクリックした時に、imageMapDataListStateにアイテムを追加します。
 * - リストは条件に応じてフィルタリングされています。
 * - リストは画像とアイテム名で構成されています。
 * @param  {React.Dispatch<React.SetStateAction<boolean>>} setOpen
 * @param  {{ x: number; y: number }} textFieldPosition
 * @example
 * <ItemSelectorList setOpen={setOpen} textFieldPosition={textFieldPosition} />
 */
export const ImageMapItemSelectorList: FC<ImageMapItemSelectorListType> = ({
  setOpen,
  textFieldPosition,
}) => {
  const itemList = useRecoilValue(filteredItemsState);
  const setImageMapDataList = useSetRecoilState(imageMapDataListState);

  // リストのアイテムをクリックした時の処理
  const onClickListButton = (itemId: number, itemName: string) => {
    setImageMapDataList((prevList) => {
      // すでに登録されているかどうかをチェック
      const existingItemIndex = prevList.findIndex(
        (item) => item.itemId === itemId,
      );

      if (existingItemIndex !== -1) {
        // 既存のアイテムが見つかった場合、それを新しいデータで更新
        // 1つのアイテムに対して複数のタグを設定できない為、
        return prevList.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                xPosition: textFieldPosition.x,
                yPosition: textFieldPosition.y,
                itemName,
              }
            : item,
        );
      } else {
        // 既存のアイテムが見つからなかった場合、新しいアイテムをリストに追加
        return [
          ...prevList,
          {
            xPosition: textFieldPosition.x,
            yPosition: textFieldPosition.y,
            itemId,
            itemName,
          },
        ];
      }
    });
    setOpen(false);
  };

  //  リストで表示する為に、アイテムの情報を加工
  const filteredItemList = itemList.map((item) => ({
    itemName: item.itemName,
    itemId: item.itemId,
    image: item.imageName,
  }));
  return (
    <List sx={{ maxWidth: '100%', maxHeight: '100%', overflow: 'auto' }}>
      {filteredItemList.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
          <ListItemButton
            onClick={() => onClickListButton(item.itemId, item.itemName)}
          >
            <ListItemAvatar>
              <FittedImage
                src={item.image}
                alt={item.itemName}
                containerWidth={70}
                containerHeight={30}
              />
            </ListItemAvatar>
            <ListItemText primary={item.itemName} />
            <Divider variant="inset" component="li" />
          </ListItemButton>
        </div>
      ))}
    </List>
  );
};
