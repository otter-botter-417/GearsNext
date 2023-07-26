// idを渡して特定の商品の情報を取得するAPI

export const useGetItemDataApi = (id: any) => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/items/get/" + id);
      return response.json();
    } catch (err) {
      return { success: false, data: [] };
    }
  };
  return fetchData();
};
