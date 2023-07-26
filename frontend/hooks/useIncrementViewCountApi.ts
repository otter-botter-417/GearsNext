// idを渡して特定の商品の情報を取得するAPI

export const useIncrementViewCountApi = (id: any) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/items/increment-view-count/" + id,
        {
          method: "PUT",
        }
      );
      console.log("333");

      console.log(id);
      console.log("333");

      return response.json();
    } catch (err) {
      return { success: false };
    }
  };
  return fetchData();
};
