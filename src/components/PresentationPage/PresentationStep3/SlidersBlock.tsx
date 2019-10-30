import React from 'react';
import { SliderValue } from 'antd/lib/slider';
import { isArray } from 'lodash';
import numeral from 'numeral';

import MySlider from './MySlider';
import { SlidersBlockWrapper } from './styled';

function currencyFormatter(value: SliderValue) {
  return numeral(value).format('$ 0,0.[00]');
}

function retirementFormatter(value: SliderValue) {
  return value + ' years';
}

const riskProfiles = ['Preservation', 'Defensive', 'Moderate', 'Balanced', 'Growth', 'High growth'];

const convertArrayStringToMarks = (
  arrayString: string[],
): {
  [key: number]:
    | React.ReactNode
    | {
        style: React.CSSProperties;
        label: React.ReactNode;
      };
} => {
  return arrayString.reduce((acc, value, index) => {
    return { ...acc, [index]: '' }; // Do not have any labels under the slider
  }, {});
};

const formatterFromArrayString = (array: string[]) => (value: SliderValue) => {
  if (!isArray(value)) {
    return array[value];
  }
};

const SlidersBlock = () => {
  return (
    <SlidersBlockWrapper>
      <MySlider title={'Retirement'} min={57} max={100} defaultValue={65} step={1} formatter={retirementFormatter} />
      <MySlider title={'Income'} min={0} max={500000} defaultValue={100000} formatter={currencyFormatter} step={1000} />
      <MySlider
        title={'Expenses'}
        min={0}
        max={500000}
        defaultValue={50000}
        formatter={currencyFormatter}
        step={1000}
      />
      <MySlider
        min={0}
        max={riskProfiles.length - 1}
        marks={convertArrayStringToMarks(riskProfiles)}
        title={'Risk Profile'}
        step={null}
        formatter={formatterFromArrayString(riskProfiles)}
        defaultValue={2}
      />
    </SlidersBlockWrapper>
  );
};

export default SlidersBlock;
