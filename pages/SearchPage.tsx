import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import themeOptions from "@/styles/themes/themeOptions";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

import { TextFieldStyles } from "@/styles/ItemAppendPage/TextFieldStyles";
import { ThemeProvider } from "@mui/material/styles";

import { CategoryNameList } from "@/components/atoms/itemAppend/SelectNames/CategoryNameList";
import { colorTagList } from "../components/atoms/itemAppend/SelectNames/ColorTagList";
import { itemTagList } from "../components/atoms/itemAppend/SelectNames/ItemTagList";
import { SubCategoryNameList } from "@/components/atoms/itemAppend/SelectNames/SubCategoryNameList";
import { ItemDataTypes } from "@/components/types/ItemDataTypes";

import { useItemApi } from "../components/api/useItemApi";
import { ItemThumbnail } from "@/components/molecules/searchPage/ItemThumbnail";
import { Tags } from "@/components/atoms/itemAppend/Tags";
import { Buttons } from "@/components/molecules/itemPage/Buttons";
import { SortPattern } from "@/components/atoms/searchPage/SortPattern";

export const SearchPage = () => {
  const [categoryValue, setCategoryValue] = useState(""); // valueをstateで管理
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [filterSwitch, setFilterSwitch] = useState("or");
  const [itemDataMap, setItemDataMap] = useState<ItemDataTypes[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ItemDataTypes[]>([]);
  const [itemTags, setItemTags] = useState<string[]>([]);
  const [colorTags, setColorTags] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 1000000]);
  const [value, setValue] = useState<number[]>([0, 1000000]);
  const [priceSliderNum, setPriceSliderNum] = useState<number[]>([0, 1000000]);
  const [sortPatternValue, setSortPatternValue] = useState("閲覧数");

  const { getItemData } = useItemApi();

  const handleChange = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    setValue(newValue as number[]);
  };

  const handleChangeToggleButton = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setFilterSwitch(newAlignment);
    }
  };

  const handleChangeCommitted = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    setSliderValue(newValue as number[]);
  };
  //条件をクリアボタンをクリックで初期化
  const onClickResetButton = () => {
    setPriceSliderNum([0, 1000000]);
    setValue([0, 1000000]);
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

      const response = await fetch("http://localhost:3000/api/itemAll")
        .then((response) => response.json())
        .then((data) => {
          let filtered = data.data;
          if (sortPatternValue === "高い順") {
            filtered = filtered
              .slice()
              .sort((a: any, b: any) => b.price - a.price);
          } else if (sortPatternValue === "安い順") {
            filtered = filtered
              .slice()
              .sort((a: any, b: any) => a.price - b.price);
          }
          console.log(data);

          setItemDataMap(filtered);
          setFilteredProducts(filtered);
          const prices = filtered.map((item: ItemDataTypes) => item.price);
          const priceValue = [Math.min(...prices), Math.max(...prices)];
          setPriceSliderNum(priceValue);
        });
    };

    fetchData();
  }, []);

  //絞り込みを操作したときにitemDataMapの絞り込みをする
  useEffect(() => {
    let filtered = itemDataMap;

    if (categoryValue) {
      filtered = filtered.filter(
        (product) => product.category === categoryValue
      );
    }

    if (subCategoryValue) {
      filtered = filtered.filter(
        (product) => product.itemAbility.subCategorys === subCategoryValue
      );
    }

    const prices = filtered.map((item: ItemDataTypes) => item.price);
    const priceValue = [Math.min(...prices), Math.max(...prices)];
    setPriceSliderNum(priceValue);

    // 価格の絞り込み
    const min = value[0];
    const max = value[1];
    if (min && max) {
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // タグの絞り込み
    if (itemTags.length > 0) {
      if (filterSwitch) {
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
        filtered = filtered.filter((product) =>
          colorTags.every((tag) => product.colors.includes(tag))
        );
      }
    }

    if (sortPatternValue === "高い順") {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    } else if (sortPatternValue === "安い順") {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    }

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
          <Box display={"flex"} alignItems="center" width={"80%"}>
            <ToggleButtonGroup
              value={filterSwitch}
              exclusive
              onChange={handleChangeToggleButton}
            >
              <ToggleButton value="or">OR</ToggleButton>
              <ToggleButton value="and">AND</ToggleButton>
            </ToggleButtonGroup>
            <Box flexGrow={1}>
              <Tags
                text={"タグ"}
                tagName={itemTags}
                setTagName={setItemTags}
                items={itemTagList}
              />
            </Box>
            <Box flexGrow={1}>
              <Tags
                text={"カラー"}
                tagName={colorTags}
                setTagName={setColorTags}
                items={colorTagList}
              />
            </Box>
            <Box flexGrow={1} padding={4}>
              <Typography variant="caption">price</Typography>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommitted}
                valueLabelDisplay="auto"
                min={priceSliderNum[0]}
                max={priceSliderNum[1]}
              />
            </Box>
            <Button variant="outlined" onClick={onClickResetButton}>
              条件をクリア
            </Button>
          </Box>
          <Box display={"flex"} justifyContent="flex-end" width={"100%"}>
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

          <Grid
            container
            spacing={{ xs: 2, md: 5 }}
            columns={{ xs: 12, sm: 8, md: 10 }}
            sx={{ position: "center" }}
          >
            {filteredProducts ? (
              filteredProducts.map((data: ItemDataTypes, index: number) => (
                <Grid item xs={2} sm={2} md={2} key={index}>
                  <ItemThumbnail ItemData={data} key={`item-${index}`} />
                </Grid>
              ))
            ) : (
              <p>No items found</p>
            )}
          </Grid>
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default SearchPage;
