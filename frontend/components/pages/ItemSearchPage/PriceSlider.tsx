import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import { BarChart, Bar, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Box } from '@mui/system';
import { ItemDataText } from '../../atoms/itemPage/text/ItemDataText';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { itemPriceRangeForSliderState } from '../../shares/atoms/state/itemPriceRangeForSliderState';
import { itemPriceListForSliderState } from '../../shares/atoms/state/itemPriceListForSliderState';
import { sliderValueState } from '../../shares/atoms/state/sliderValueState';

export const PriceSlider = () => {
  const [value, setValue] = useState<number[]>([0, 1000000]);
  const priceRange = useRecoilValue(itemPriceRangeForSliderState);
  const itemPriceListForSlider = useRecoilValue(itemPriceListForSliderState);
  const setSliderValue = useSetRecoilState(sliderValueState);
  const priceDataPoints = itemPriceListForSlider.map((price) => ({ price }));

  const handleChange = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[],
  ) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[],
  ) => {
    setSliderValue(newValue as number[]);
  };
  //------------------------------------------------------------------------------------
  const priceBins: { [key: string]: number } = {};

  const marks: { value: number }[] = [];
  const binWidth = (priceRange.max - priceRange.min) / 10;

  for (let i = 0; i < 11; i++) {
    const binMin = priceRange.min + i * binWidth;
    const binMax = priceRange.min + (i + 1) * binWidth;
    priceBins[binMin] = 0;
    marks.push({ value: binMin });
    for (const priceDataPoint of priceDataPoints) {
      if (priceDataPoint.price >= binMin && priceDataPoint.price < binMax) {
        priceBins[binMin]++;
      }
    }
  }

  const barChartData = Object.entries(priceBins).map(
    ([priceRangeLabel, count]) => {
      return {
        priceRangeLabel,
        count,
      };
    },
  );
  //------------------------------------------------------------------------------------

  return (
    <Box>
      <ItemDataText text={'price'} />
      <ResponsiveContainer width="100%" height={100}>
        <BarChart
          data={barChartData}
          barSize={10}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          {/* <XAxis dataKey="priceRangeLabel" axisLine={false} /> */}
          {/* <YAxis hide={true} /> */}
          <Tooltip content={() => null} cursor={false} />
          <Bar dataKey="count" fill="#8884d8">
            {barChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  parseInt(entry.priceRangeLabel, 10) >= value[0] &&
                  parseInt(entry.priceRangeLabel, 10) <= value[1]
                    ? '#607d8b'
                    : '#E0E0E0'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Box
        width={'91%'}
        alignItems="center"
        justifyContent={'center'}
        margin="0 auto"
      >
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay="auto"
          min={priceRange.min}
          max={priceRange.max}
          marks={marks}
          // step={null}
        />
      </Box>
    </Box>
  );
};

export default PriceSlider;
