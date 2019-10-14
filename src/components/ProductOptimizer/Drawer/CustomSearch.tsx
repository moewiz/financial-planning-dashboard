import React, { PureComponent } from 'react';
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
      { id: 1, name: 'CFS FirstChoice Low Cost Model Portfolio', value: 10000 },
      { id: 2, name: 'CFS FirstChoice Accumulation Model Portfolio', value: 5000 },
      { id: 3, name: 'CFS FirstChoice Retirement Model Portfolio', value: 15000 },
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

// TODO: implement Filter Search result by option ids
const filterOption = () => {
  console.log('TODO: implement Filter Search result by option ids');
};

class CustomSearch extends PureComponent<CustomSearchProp> {
  public renderResults = () => {
    const { type } = this.props;

    if (type === 'fund') {
      return renderOptions(dummyFundForSearching);
    }

    return renderOptions(dummyProductForSearching);
  }

  public onSelect = (value: number | string) => {
    const { onSelect, type } = this.props;
    if (isFunction(onSelect)) {
      const dictionary = type === 'fund' ? dummyFundForSearching : dummyProductForSearching;

      const options = findOptionObj(dictionary, value);
      if (options && options.length > 0) {
        onSelect(options[0]);
      }
    }
  }

  public render() {
    const { placeholder, selectedOption } = this.props;

    return (
      <TopSearch border>
        <Icon type="search" />
        <Select
          showSearch
          defaultValue={selectedOption && selectedOption.name}
          onSelect={this.onSelect}
          placeholder={placeholder}
          className="custom-select"
          showArrow={false}
          dropdownClassName="custom-search-menu"
          optionFilterProp="title"
        >
          {this.renderResults()}
        </Select>
        <Icon component={Filter} />
      </TopSearch>
    );
  }
}

export default CustomSearch;
