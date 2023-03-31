import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect } from "react";
import themeOptions from "@/styles/themes/themeOptions";
import { TextFieldStyles } from "@/styles/ItemAppendPage/TextFieldStyles";
import { ThemeProvider } from "@mui/material/styles";
import { useRecoilState, useSetRecoilState } from "recoil";

import { CategoryNameList } from "@/components/atoms/itemAppend/SelectNames/CategoryNameList";
import { SubCategoryNameList } from "@/components/atoms/itemAppend/SelectNames/SubCategoryNameList";
import { ItemDataTypes } from "@/components/types/ItemDataTypes";

import { SortPattern } from "@/components/atoms/searchPage/SortPattern";
import PriceSlider from "@/components/atoms/searchPage/PriceSlider";
import { ItemDataText } from "@/components/atoms/itemPage/text/ItemDataText";

import { categoryValueState } from "@/components/atoms/state/searchPage/categoryValueState";
import { subCategoryValueState } from "@/components/atoms/state/searchPage/subCategoryValueState";
import { itemTagsState } from "@/components/atoms/state/searchPage/itemTagsState";
import { colorTagsState } from "@/components/atoms/state/searchPage/colorTagsState";
import { filterSwitchState } from "@/components/atoms/state/searchPage/filterSwitchState";
import { itemDataMapState } from "@/components/atoms/state/searchPage/itemDataMapState";
import { priceDataState } from "@/components/atoms/state/searchPage/priceDataState";
import { sliderValueState } from "@/components/atoms/state/searchPage/sliderValueState";
import { priceRangeState } from "@/components/atoms/state/searchPage/priceRangeState";
import { filteredProductsState } from "@/components/atoms/state/searchPage/filteredProductsState";
import { itemNumState } from "@/components/atoms/state/searchPage/itemNumState";
import { sortPatternValueState } from "@/components/atoms/state/searchPage/sortPatternValueState";
import ItemTags from "@/components/molecules/searchPage/ItemTags";
import ColorTags from "@/components/molecules/searchPage/ColorTags";
import ItemThumbnailGrid from "@/components/organisms/searchPage/ItemThumbnailGrid";

export const SearchPage = () => {
  //APIで最初に取得する全データ
  const [itemDataMap, setItemDataMap] = useRecoilState(itemDataMapState);
  //絞り込み

  const [categoryValue, setCategoryValue] = useRecoilState(categoryValueState);
  const [subCategoryValue, setSubCategoryValue] = useRecoilState(
    subCategoryValueState
  );
  const [itemTags, setItemTags] = useRecoilState(itemTagsState);
  const [colorTags, setColorTags] = useRecoilState(colorTagsState);
  const [filterSwitch, setFilterSwitch] = useRecoilState(filterSwitchState);
  //価格スライダー関連
  const setPriceData = useSetRecoilState(priceDataState);
  const [sliderValue, setSliderValue] = useRecoilState(sliderValueState);
  const setPriceRange = useSetRecoilState(priceRangeState);
  //絞り込み後の表示アイテム
  const [filteredProducts, setFilteredProducts] = useRecoilState(
    filteredProductsState
  );
  const [itemNum, setItemNum] = useRecoilState(itemNumState);
  //ソート条件
  const [sortPatternValue, setSortPatternValue] = useRecoilState(
    sortPatternValueState
  );

  //トグルボタンクリック時に絞り込み条件をORかANDか切り替え
  const handleChangeToggleButton = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setFilterSwitch(newAlignment);
    }
  };

  //条件をクリアボタンをクリックで初期化
  const onClickResetButton = () => {
    // setPriceRange({ min: 0, max: 100000 });
    setSliderValue([0, 1000000]);
    setCategoryValue("");
    setSubCategoryValue("");
    setItemTags([]);
    setColorTags([]);
    setFilteredProducts([]);
  };

  //カテゴリーが変更された時にAPIを呼び出しデータを受け取る
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window === "undefined") return;

      if (categoryValue) {
        const response = await fetch(
          `http://localhost:3000/api/itemSearchApi?category=${categoryValue}`
        )
          .then((response) => response.json())
          .then((data) => {
            let filtered = data.data;
            //並び替え条件に従って並び替える
            if (sortPatternValue === "高い順") {
              filtered = filtered
                .slice()
                .sort((a: any, b: any) => b.price - a.price);
            } else if (sortPatternValue === "安い順") {
              filtered = filtered
                .slice()
                .sort((a: any, b: any) => a.price - b.price);
            }

            //取得データをそれぞれ設定しておく
            setItemDataMap(filtered);
            setFilteredProducts(filtered);
            //価格スライダー用
            const prices = filtered.map((item: ItemDataTypes) => item.price);
            setPriceData(prices);
            setPriceRange({
              min: Math.min(...prices),
              max: Math.max(...prices),
            });
          });
      } else {
        const response = await fetch("http://localhost:3000/api/itemAll")
          .then((response) => response.json())
          .then((data) => {
            let filtered = data.data;
            //並び替え条件に従って並び替える
            if (sortPatternValue === "高い順") {
              filtered = filtered
                .slice()
                .sort((a: any, b: any) => b.price - a.price);
            } else if (sortPatternValue === "安い順") {
              filtered = filtered
                .slice()
                .sort((a: any, b: any) => a.price - b.price);
            }

            //取得データをそれぞれ設定しておく
            setItemDataMap(filtered);
            setFilteredProducts(filtered);
            //価格スライダー用
            const prices = filtered.map((item: ItemDataTypes) => item.price);
            setPriceData(prices);
            setPriceRange({
              min: Math.min(...prices),
              max: Math.max(...prices),
            });
          });
      }
    };

    fetchData();
  }, [categoryValue]);

  //絞り込みを操作したときにitemDataMapの絞り込みをする
  useEffect(() => {
    let filtered = itemDataMap;

    //カテゴリーでの絞り込み
    if (categoryValue) {
      filtered = filtered.filter(
        (product) => product.category === categoryValue
      );
    }

    //サブカテゴリーでの絞り込み
    if (subCategoryValue) {
      filtered = filtered.filter(
        (product) => product.itemAbility.subCategorys === subCategoryValue
      );
    }

    // 価格の絞り込み
    const min = sliderValue[0];
    const max = sliderValue[1];
    if (min && max) {
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // タグの絞り込み
    if (itemTags.length > 0) {
      if (filterSwitch === "or") {
        filtered = filtered.filter((product) =>
          itemTags.some((tag) => product.tags.includes(tag))
        );
      } else {
        filtered = filtered.filter((product) =>
          itemTags.every((tag) => product.tags.includes(tag))
        );
      }
    }

    // カラータグの絞り込み
    if (colorTags.length > 0) {
      if (filterSwitch === "or") {
        filtered = filtered.filter((product) =>
          colorTags.some((tag) => product.colors.includes(tag))
        );
      } else {
        console.log(11);
        filtered = filtered.filter((product) =>
          colorTags.every((tag) => product.colors.includes(tag))
        );
      }
    }

    //並び替え
    if (sortPatternValue === "高い順") {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    } else if (sortPatternValue === "安い順") {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    }

    //対象件数
    setItemNum(filtered.length);

    setFilteredProducts(filtered);
  }, [
    itemDataMap,
    sliderValue,
    itemTags,
    colorTags,
    filterSwitch,
    sortPatternValue,
    subCategoryValue,
    categoryValue,
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        component="form"
        display={"flex"}
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
        width={"80%"}
      >
        <ThemeProvider theme={themeOptions}>
          {/* キーワード　カテゴリー　サブカテゴリー */}
          <Box display={"flex"} alignItems="center" width={"80%"} margin={2}>
            <TextField
              id="keyword"
              label="キーワードから探す"
              defaultValue=""
              sx={TextFieldStyles.input}
            />
            <TextField
              id="Category"
              select
              label="カテゴリー"
              value={categoryValue}
              defaultValue=""
              onChange={(event) => {
                setCategoryValue(event.target.value), setSubCategoryValue("");
              }}
              sx={TextFieldStyles.input}
            >
              {CategoryNameList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="SubCategory"
              select
              label="サブカテゴリー"
              value={subCategoryValue}
              defaultValue=""
              onChange={(event) => setSubCategoryValue(event.target.value)}
              sx={TextFieldStyles.input}
            >
              {SubCategoryNameList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {/* トグル　タグ　カラータグ　価格スライダー　条件クリア */}
          <Box display={"flex"} alignItems="center" width={"80%"}>
            {/* トグルスイッチ */}
            <ToggleButtonGroup
              value={filterSwitch}
              exclusive
              onChange={handleChangeToggleButton}
            >
              <ToggleButton value="or">OR</ToggleButton>
              <ToggleButton value="and">AND</ToggleButton>
            </ToggleButtonGroup>
            {/* タグ */}
            <ItemTags />
            {/* カラータグ */}
            <ColorTags />
            {/* 価格スライダー */}
            <Box flexGrow={1} padding={4} width={"30%"}>
              <PriceSlider />
            </Box>
            {/* 条件クリア */}
            <Button variant="outlined" onClick={onClickResetButton}>
              条件をクリア
            </Button>
          </Box>
          {/* 並び替え */}

          <Box display={"flex"} justifyContent="flex-end" width={"100%"}>
            <Box padding={2}>
              <ItemDataText text={`${itemNum}件`} />
            </Box>
            <Box justifyContent="flex-end" width={"20%"}>
              <TextField
                select
                value={sortPatternValue}
                defaultValue="閲覧数"
                onChange={(event) => setSortPatternValue(event.target.value)}
                // sx={TextFieldStyles.input}
              >
                {SortPattern.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          {/* 絞り込み後の商品表示 */}
          <ItemThumbnailGrid />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default SearchPage;
