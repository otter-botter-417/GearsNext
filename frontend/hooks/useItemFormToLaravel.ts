import axios from "axios";

export const useItemForm = () => {
  const handleFormSubmit = async (baseFormData: any, detailFormData: any) => {
    //フォームの入力情報をまとめる formDataから読み取るのはバリデーションが必要な要素
    const details: { [key: string]: number } = {};
    const itemDatas = {
      itemName: baseFormData.itemName,
      asin: baseFormData.asin,
      imageName: baseFormData.imageName,
      price: parseInt(baseFormData.price),

      openWidth: baseFormData.openWidth,
      openDepth: baseFormData.openDepth,
      openHeight: baseFormData.openHeight,
      storageWidth: baseFormData.storageWidth,
      storageDepth: baseFormData.storageDepth,
      storageHeight: baseFormData.storageHeight,
      weight: baseFormData.weight,
      brandName: baseFormData.brandName,
      itemCategoryName: baseFormData.itemCategoryName,
      subCategoryName: "ドームテント",
      itemTags: baseFormData.itemTags,
      colorTags: baseFormData.colorTags,

      details: detailFormData,
    };

    try {
      //ローディング状態に変更してmongoDBにデータ送信
      // setValue("loading", true);
      console.log(itemDatas);
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
      // console.log(itemDatas);
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
