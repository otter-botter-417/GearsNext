import { useState, FormEvent as ReactFormEvent } from "react";
import { useItemApi } from "../components/api/useItemApi";

// フォームの入力情報をmongoDBに送信するカスタムフック

// itemDatasとhandleFormSubmit関数が扱うイベントの型定義
interface ItemData {
  category: string;
  itemName: string;
  brandName: string;
  price: number;
  asin: string;
  imagePath: string;
  amazonUrl: string;
  colors: string[];
  tags: string[];
  itemAbility: any[];
}

export const useItemForm = () => {
  const [categoryValue, setCategoryValue] = useState<string>(""); // カテゴリー名
  const [brandValue, setBrandValue] = useState<string>(""); // ブランド名
  const [itemTags, setItemTags] = useState<string[]>([]); // 特徴のタグ
  const [colorTags, setColorTags] = useState<string[]>([]); // カラータグ
  const [abilitys, setAbilitys] = useState<any[]>([]); // カテゴリー毎の詳細な情報
  const [loading, setLoading] = useState<boolean>(false); // 送信中のグルグル

  const { postItemData } = useItemApi(); //mongoDBにデータを送信するAPI

  const handleFormSubmit = async (e: ReactFormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //フォームの入力情報をまとめる
    const itemDatas = {
      category: categoryValue,
      itemName: e.currentTarget.itemName.value,
      brandName: brandValue,
      price: parseInt(e.currentTarget.price.value),
      asin: e.currentTarget.asin.value,
      imagePath: e.currentTarget.imagePath.value,
      amazonUrl: e.currentTarget.amazonUrl.value,
      colors: colorTags,
      tags: itemTags,
      itemAbility: abilitys,
    };

    try {
      //ローディング状態に変更してmongoDBにデータ送信
      setLoading(true);
      await postItemData(itemDatas);
      setLoading(false);
    } catch (error) {
      //エラーがあればアラート
      alert(error);
    } finally {
      //送信が終わればローディング解除
      setLoading(false);
    }
  };

  return {
    itemFormState: {
      categoryValue,
      brandValue,
      itemTags,
      colorTags,
      abilitys,
      loading,
      setCategoryValue,
      setBrandValue,
      setItemTags,
      setColorTags,
      setAbilitys,
    },
    handleFormSubmit,
  };
};
