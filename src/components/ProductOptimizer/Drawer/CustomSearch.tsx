import React, { PureComponent } from 'react';
import { isFunction } from 'lodash';
import { Select, Icon } from 'antd';
const { OptGroup } = Select;

import { TopSearch } from '../../../layouts/Header/styled';
import { Filter } from '../../Icons';
import { Option } from './DrawerProduct';

export type CustomSearchType = 'product' | 'fund';

interface Prop {
  placeholder: string;
  type?: CustomSearchType;
  onSelect?: (value: Option) => void;
  selectedOption?: Option;
}

interface OptionData {
  id?: number;
  name: string;
  code?: string;
  children?: OptionData[];
}

const dummyProductForSearching: OptionData[] = [
  {
    name: 'Recent',
    children: [
      {
        id: 1,
        name: 'BlackRock Global Income',
        code: 'AMP1995AU',
      },
      {
        id: 2,
        name: 'Product X',
        code: 'AMP1707AU',
      },
    ],
  },
  {
    name: 'Popular',
    children: [
      {
        id: 3,
        name: 'AMP Australian Share Index',
        code: 'AMP1995AU',
      },
      {
        id: 4,
        name: 'Perpetual Industrial Share',
        code: 'AMP0057AU',
      },
      {
        id: 5,
        name: 'Plato Australian Shares Income',
        code: 'AMP0767AU',
      },
    ],
  },
  {
    name: 'Model Portfolios',
    children: [
      {
        id: 6,
        name: 'Model Portpolio 1 (Growth)',
      },
      {
        id: 7,
        name: 'Model Portpolio 2 (Defensive)',
      },
      {
        id: 8,
        name: 'Model Portpolio 3 (Moderate)',
      },
      {
        id: 9,
        name: 'Model Portpolio 4 (Defensive)',
      },
      {
        id: 10,
        name: 'Model Portpolio 5 (Growth)',
      },
    ],
  },
];

const dummyFundForSearching: OptionData[] = [
  {
    name: 'Search Result',
    children: [
      { id: 1, name: 'Fund DE' },
      { id: 2, name: 'Fund DF' },
      { id: 3, name: 'Fund DG' },
      { id: 4, name: 'Fund DH' },
      { id: 5, name: 'Fund DI' },
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

const findOptionObj = (data: OptionData[], value: number) =>
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

class CustomSearch extends PureComponent<Prop> {
  public renderResults = () => {
    const { type } = this.props;

    if (type === 'fund') {
      return renderOptions(dummyFundForSearching);
    }

    return renderOptions(dummyProductForSearching);
  }

  public onSelect = (value: number) => {
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
          defaultValue={selectedOption && selectedOption.id}
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
