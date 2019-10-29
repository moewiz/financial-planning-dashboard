import React from 'react';
import { SliderValue } from 'antd/lib/slider';
import numeral from 'numeral';

import MySlider from './MySlider';

function currencyFormatter(value: SliderValue) {
  return numeral(value).format('$0,0.[00]');
}

const SlidersBlock = () => {
  return (
    <>
      <MySlider title={'Retirement'} min={57} max={100} defaultValue={65} step={1} />
      <MySlider title={'Income'} min={0} max={500000} defaultValue={100000} formatter={currencyFormatter} step={1000} />
      <MySlider
        title={'Expenses'}
        min={0}
        max={500000}
        defaultValue={50000}
        formatter={currencyFormatter}
        step={1000}
      />
      <MySlider title={'Risk Profile'} />
    </>
  );
};

export default SlidersBlock;
