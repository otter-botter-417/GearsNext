import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Slider } from "@mui/material";

interface CustomSliderProps {
  priceSliderNum: number[];
  sliderValue: number[];
  setSliderValue: Dispatch<SetStateAction<number[]>>;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  priceSliderNum,
  sliderValue,
  setSliderValue,
}) => {
  const [value, setValue] = useState<number[]>(sliderValue);

  useEffect(() => {
    let newValue: number[] = value;

    if (value[0] < priceSliderNum[0]) {
      newValue = [priceSliderNum[0], newValue[1]];
    } else if (value[0] > priceSliderNum[1]) {
      newValue = [priceSliderNum[1], newValue[1]];
    }

    if (value[1] > priceSliderNum[1]) {
      newValue = [newValue[0], priceSliderNum[1]];
    } else if (value[1] < priceSliderNum[0]) {
      newValue = [newValue[0], priceSliderNum[0]];
    }

    setValue(newValue);
  }, [priceSliderNum, value]);

  const handleChange = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    setSliderValue(newValue as number[]);
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (
    <Slider
      getAriaLabel={() => "Temperature range"}
      value={value}
      onChange={handleChange}
      onChangeCommitted={handleChangeCommitted}
      min={priceSliderNum[0]}
      max={priceSliderNum[1]}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
    />
  );
};

export default CustomSlider;
