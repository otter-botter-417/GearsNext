import React, { FC, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Slider from '@mui/material/Slider';
import { Box, Input } from '@mui/material';
import { BarChart, Bar, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import { ItemDataText } from '@/components/shares/atoms/text/ItemDataText';
import { priceAfterLimitValueState } from '@/components/shares/atoms/state/priceAfterLimitValueState';
import { itemPriceListForSliderState } from '@/components/shares/atoms/state/itemPriceListForSliderState';
import { itemPriceRangeForSliderState } from '@/components/shares/atoms/state/itemPriceRangeForSliderState';

// 非常に難しいコード。理解するのに時間がかかる。


// 価格のデータポイントと範囲を定義
interface PriceDataPoint {
  price: number;
}

interface PriceRange {
  min: number;
  max: number;
}

interface BarChartData {
  priceRangeLabel: string;
  count: number;
}

/**
 * 価格のビン（範囲内の価格の数）を計算する関数
 * @param {PriceDataPoint[]} priceDataPoints - 価格のデータポイントの配列
 * @param {PriceRange} priceRange - 価格の最小値と最大値
 * @param {number} numberOfBins - ビンの数
 * @returns {BarChartData[]} - バーチャートのデータ
 */
const calculatePriceBins = (
  priceDataPoints: PriceDataPoint[],
  priceRange: PriceRange,
  numberOfBins: number,
): BarChartData[] => {
  const priceBins: { [key: string]: number } = {};
  const binWidth = (priceRange.max - priceRange.min) / numberOfBins;

  for (let i = 0; i <= numberOfBins; i++) {
    const binMin = priceRange.min + i * binWidth;
    const binMax = priceRange.min + (i + 1) * binWidth;
    priceBins[binMin] = 0;

    for (const priceDataPoint of priceDataPoints) {
      if (priceDataPoint.price >= binMin && priceDataPoint.price < binMax) {
        priceBins[binMin]++;
      }
    }
  }

  return Object.entries(priceBins).map(([priceRangeLabel, count]) => ({
    priceRangeLabel,
    count,
  }));
};

/**
 * 価格スライダーコンポーネント
 *
 * - 価格のビンを計算し、それを基にバーチャートを表示
 * - スライダーと入力フィールドで価格の最小値と最大値を設定
 *
 * @returns JSX.Element
 */
export const PriceSlider: FC = () => {
  const [value, setValue] = useState<PriceRange>({ min: 0, max: 1000000 });
  // Recoilステートから価格範囲と価格リストを取得
  const priceRange = useRecoilValue(itemPriceRangeForSliderState);
  const itemPriceListForSlider = useRecoilValue(itemPriceListForSliderState);
  const setPriceAfterLimitValue = useSetRecoilState(priceAfterLimitValueState);

  // 価格データポイントを作成
  const priceDataPoints = itemPriceListForSlider.map((price) => ({ price }));
  // バーチャートデータを計算
  const barChartData = calculatePriceBins(priceDataPoints, priceRange, 50);

  /**
   * スライダーの値が変更されたときの処理
   * @param newValue - 新しいスライダーの値
   * @param setStateFunc - ステートを設定する関数
   */
  const handleSliderChange = (
    newValue: number | number[],
    setStateFunc: React.Dispatch<React.SetStateAction<PriceRange>>,
  ) => {
    if (Array.isArray(newValue)) {
      setStateFunc({ min: newValue[0], max: newValue[1] });
    } else {
      setStateFunc({ min: newValue, max: newValue });
    }
  };

  /**
   * 入力フィールドの値が変更されたときの処理
   * @param field - 変更されたフィールド（'min'または'max'）
   * @param event - イベントオブジェクト
   */
  const handleInputChange = (
    field: 'min' | 'max',
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target as HTMLInputElement; // 型のキャスト
    const newValue = target.value === '' ? 0 : Number(target.value);
    setValue((prev) => ({ ...prev, [field]: newValue }));
    setPriceAfterLimitValue({ ...value, [field]: newValue });
  };

  return (
    <Box>
      <ItemDataText text="price" />
      <ResponsiveContainer width="100%" height={100}>
        <BarChart
          data={barChartData}
          barSize={10}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <Tooltip content={() => null} cursor={false} />
          <Bar dataKey="count" fill="#8884d8">
            {barChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  parseInt(entry.priceRangeLabel, 10) >= value.min &&
                  parseInt(entry.priceRangeLabel, 10) <= value.max
                    ? '#607d8b'
                    : '#E0E0E0'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={[value.min, value.max]}
        onChange={(_, newValue) =>
          handleSliderChange(newValue as number | number[], setValue)
        }
        onChangeCommitted={(_, newValue) =>
          handleSliderChange(
            newValue as number | number[],
            setPriceAfterLimitValue,
          )
        }
        valueLabelDisplay="auto"
        min={priceRange.min}
        max={priceRange.max}
      />
      <Box display="flex" justifyContent="space-between">
        <Input
          value={value.min}
          onChange={(e) => handleInputChange('min', e)}
          inputProps={{
            type: 'number',
            min: priceRange.min,
            max: priceRange.max,
          }}
        />
        <Input
          value={value.max}
          onChange={(e) => handleInputChange('max', e)}
          inputProps={{
            type: 'number',
            min: priceRange.min,
            max: priceRange.max,
          }}
        />
      </Box>
    </Box>
  );
};
