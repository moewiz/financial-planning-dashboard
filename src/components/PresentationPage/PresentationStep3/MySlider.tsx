import React, { useState } from 'react';
import { Slider } from 'antd';
import { SliderProps, SliderValue } from 'antd/lib/slider';

import { SliderTitle, SliderWrapper, ValueStyled, ValueWrapper } from './styled';

interface MySliderProps {
  title: string;
  formatter?: (value: SliderValue) => React.ReactNode;
  onChangeValue?: (value: SliderValue) => void;
  defaultValue?: number;
}

const MySlider = (props: SliderProps & MySliderProps) => {
  const { title, defaultValue, formatter, marks, onChangeValue } = props;
  const [value, setValue] = useState<SliderValue>(defaultValue || 0);
  const onChange = (val: SliderValue) => {
    setValue(val);
    if (onChangeValue) {
      onChangeValue(val);
    }
  };
  const options: { [key: string]: any } = {};
  if (formatter) {
    options.tipFormatter = formatter;
  }

  return (
    <SliderWrapper>
      <SliderTitle>{title}</SliderTitle>
      <ValueWrapper marks={!!marks}>
        <Slider {...props} {...options} onChange={onChange} style={{ flex: 1 }} />
        <ValueStyled>{formatter ? formatter(value) : value}</ValueStyled>
      </ValueWrapper>
    </SliderWrapper>
  );
};

export default MySlider;
