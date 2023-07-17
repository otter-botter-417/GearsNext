import axios from "axios";

export const useItemForm = () => {
  const handleFormSubmit = async (formData: any) => {
    //フォームの入力情報をまとめる formDataから読み取るのはバリデーションが必要な要素
    const sizes: { [key: string]: number } = {
      open_width: 120,
      open_depth: 110,
      open_height: 100,
      close_width: 20,
      close_depth: 10,
      close_height: 1,
    };
    const itemDatas = {
      itemName: formData.itemName,
      brandName: formData.brandValue,
      price: parseInt(formData.price),
      asin: formData.asin,
      imagePath: formData.imagePath,
      sizes: sizes,
      itemTags: formData.itemTags,
      colorTags: formData.colorTags,
      categoryName: formData.categoryValue,
      subCategoryName: "ドームテント",
      itemAbility: formData.details,
    };

    try {
      //ローディング状態に変更してmongoDBにデータ送信
      // setValue("loading", true);
      const response = await axios
        .post("http://localhost:8000/api/items", {
          itemDatas,
        })
        .then((response) => {
          //レスポンスをログに出力
          console.log(response);
        })
        .catch((error) => {
          console.error("Error occurred while calling API: ", error);
        });
      console.log(itemDatas);
      // setValue("loading", false);
    } catch (error) {
      //エラーがあればアラート
      alert(error);
    } finally {
      //送信が終わればローディング解除
      // setValue("loading", false);
    }
  };

  return {
    handleFormSubmit,
  };
};
