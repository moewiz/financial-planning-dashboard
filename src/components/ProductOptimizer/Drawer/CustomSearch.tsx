import React, { useEffect, useState } from 'react';
import { isFunction } from 'lodash';
import { Select, Icon } from 'antd';
const { OptGroup } = Select;

import { TopSearch } from '../../../layouts/Header/styled';
import { Filter } from '../../Icons';
import { Option } from './DrawerProduct';

export enum CustomSearchType {
  Product = 'product',
  Fund = 'fund',
}

export interface CustomSearchProp {
  placeholder: string;
  type?: CustomSearchType;
  onSelect?: (value: Option) => void;
  selectedOption?: Option;
  productId?: number;
}

interface OptionData extends Option {
  children?: OptionData[];
}

const dummyProductForSearching: OptionData[] = [
  {
    name: 'Search Result',
    children: [
      {
        id: 1,
        name: 'CFS FirstChoice Wholesale Personal Super',
      },
      {
        id: 2,
        name: 'CFS FirstChoice Wholesale Pension',
      },
      {
        id: 3,
        name: 'OnePath OneAnswer Frontier Personal Super',
      },
      {
        id: 4,
        name: 'OnePath OneAnswer Frontier Pension',
      },
      {
        id: 5,
        name: 'BT Panorama Super Compact',
      },
      {
        id: 6,
        name: 'BT Panorama Super Full',
      },
      {
        id: 7,
        name: 'BT Panorama Super Compact (Pension)',
      },
      {
        id: 8,
        name: 'BT Panorama Super Full (Pension)',
      },
      {
        id: 9,
        name: 'AMP MyNorth Super',
      },
      {
        id: 10,
        name: 'AMP MyNorth Pension',
      },
    ],
  },
];

const dummyFundForSearching: OptionData[] = [
  {
    name: 'Model Portfolios',
    children: [
      { id: 9, name: 'CFS FirstChoice Low Cost Model Portfolio', value: 10000 },
      { id: 10, name: 'CFS FirstChoice Accumulation Model Portfolio', value: 5000 },
      { id: 11, name: 'CFS FirstChoice Retirement Model Portfolio', value: 15000 },
    ],
  },
  {
    name: 'Managed Funds',
    children: [
      { id: 1, name: 'Magellan Global Fund', value: 10000, code: 'FSF1788AU' },
      { id: 2, name: 'Kapstream Absolute Return Income', value: 5000, code: 'FSF1636AU' },
      { id: 3, name: 'Schroder Australian Equity', value: 15000, code: 'FSF1637AU' },
      { id: 6, name: 'Platinum International Fund', value: 15000, code: 'FSF0648AU' },
      { id: 7, name: 'MFS Global Equity', value: 15000, code: 'FSF0625AU' },
      { id: 8, name: 'Perpetual Balanced Growth', value: 15000, code: 'FSF0631AU' },
    ],
  },
];

const onePathOptions: OptionData[] = [
  {
    name: 'Model Portfolios',
    children: [
      { id: 99, name: 'OneAnswer Frontier Low Cost Model Portfolio', value: 10000 },
      { id: 10, name: 'OneAnswer Frontier Accumulation Model Portfolio', value: 5000 },
      { id: 11, name: 'OneAnswer Frontier Retirement Model Portfolio', value: 15000 },
    ],
  },
  {
    name: 'Managed Funds',
    children: [
      { id: 1, name: 'Magellan Global Fund', value: 10000, code: 'MMF1802AU' },
      { id: 2, name: 'Kapstream Absolute Return Income', value: 5000, code: 'MMF1713AU' },
      { id: 3, name: 'Schroder Australian Equity', value: 15000, code: 'MMF1805AU' },
      { id: 6, name: 'Platinum International Fund', value: 15000, code: 'MMF1803AU' },
      { id: 7, name: 'MFS Global Equity', value: 15000, code: 'MMF1776AU' },
      { id: 8, name: 'Perpetual Balanced Growth', value: 15000, code: 'MMF1800AU' },
    ],
  },
];

const renderOptions = (data: OptionData[]) =>
  data &&
  data.map((opt: OptionData) => {
    if (opt.children && opt.children.length > 0) {
      return (
        <OptGroup label={opt.name} key={opt.name}>
          {renderOptions(opt.children)}
        </OptGroup>
      );
    }

    return (
      <Select.Option key={opt.id} value={opt.id} title={`${opt.name} ${opt.code || ''}`}>
        <span className="text">{opt.name}</span>
        <span className="code">{opt.code}</span>
      </Select.Option>
    );
  });

const findOptionObj = (data: OptionData[], value: number | string) =>
  data
    .map((opt: OptionData) => {
      if (opt.children && opt.children.length > 0) {
        return opt.children.find((i: OptionData) => i.id === value);
      }
      if (opt.id === value) {
        return opt;
      }
    })
    .filter((i: OptionData | undefined) => {
      return !!(i && i.id);
    });

const CustomSearch = (props: CustomSearchProp) => {
  const { type, placeholder, selectedOption, productId } = props;
  const [options, setOptions] = useState<OptionData[]>([]);

  const onSelect = (value: number | string) => {
    const { onSelect: onSelectProp } = props;
    if (isFunction(onSelectProp)) {
      const selectedOptions = findOptionObj(options, value);
      if (selectedOptions && selectedOptions.length > 0) {
        onSelectProp(selectedOptions[0]);
      }
    }
  };

  // Load options base on productId
  useEffect(() => {
    let newOptions = type === CustomSearchType.Fund ? dummyFundForSearching : dummyProductForSearching;
    // Custom Fund options for
    // OnePath OneAnswer Frontier Personal Super
    if (productId && productId === 3) {
      newOptions = onePathOptions;
    }

    setOptions(newOptions);
  }, [productId]);

  return (
    <TopSearch border>
      <Icon type="search" />
      <Select
        showSearch
        defaultValue={selectedOption && selectedOption.name}
        onSelect={onSelect}
        placeholder={placeholder}
        className="custom-select"
        showArrow={false}
        dropdownClassName="custom-search-menu"
        optionFilterProp="title"
      >
        {renderOptions(options)}
      </Select>
      <Icon component={Filter} />
    </TopSearch>
  );
};

export default CustomSearch;
