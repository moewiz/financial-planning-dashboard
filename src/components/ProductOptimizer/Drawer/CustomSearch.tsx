import React, { PureComponent } from 'react';
import { Select, Icon } from 'antd';
const { OptGroup } = Select;

import { TopSearch } from '../../../layouts/Header/styled';
import { Filter } from '../../Icons';
import { Option } from './DrawerProduct';

export type CustomSearchType = 'product' | 'fund';

interface Prop {
  placeholder: string;
  type?: CustomSearchType;
  onSelect?: (value: any, option: any) => void;
  selectedOption?: Option;
}

interface State {
  keyword?: string;
}

class CustomSearch extends PureComponent<Prop, State> {
  constructor(props: Prop) {
    super(props);

    this.state = {
      keyword: undefined,
    };
  }

  public onChange = (keyword: string) => {
    this.setState({ keyword });
  }

  public renderResults = () => {
    const { type } = this.props;

    if (type === 'fund') {
      return (
        <OptGroup label="Search result">
          <Select.Option value={JSON.stringify({ id: 1, name: 'Fund DE' })} title="Fund DE">
            Fund DE
          </Select.Option>
          <Select.Option value={JSON.stringify({ id: 2, name: 'Fund DF' })} title="Fund DF">
            Fund DF
          </Select.Option>
          <Select.Option value={JSON.stringify({ id: 3, name: 'Fund DG' })} title="Fund DG">
            Fund DG
          </Select.Option>
          <Select.Option value={JSON.stringify({ id: 4, name: 'Fund DH' })} title="Fund DH">
            Fund DH
          </Select.Option>
          <Select.Option value={JSON.stringify({ id: 5, name: 'Fund DI' })} title="Fund DI">
            Fund DI
          </Select.Option>
        </OptGroup>
      );
    }

    return [
      <OptGroup label="Recent">
        <Select.Option
          value={JSON.stringify({ id: 1, name: 'BlackRock Global Income' })}
          title="BlackRock Global Income (AMP1995AU)"
        >
          <span className="text">BlackRock Global Income</span>
          <span className="code">AMP1995AU</span>
        </Select.Option>
        <Select.Option value={JSON.stringify({ id: 2, name: 'Product X' })} title="Product X (AMP1707AU)">
          <span className="text">Product X</span>
          <span className="code">AMP1707AU</span>
        </Select.Option>
      </OptGroup>,
      <OptGroup label="Popular">
        <Select.Option
          value={JSON.stringify({ id: 3, name: 'AMP Australian Share Index' })}
          title="AMP Australian Share Index (AMP1995AU)"
        >
          <span className="text">AMP Australian Share Index</span>
          <span className="code">AMP1995AU</span>
        </Select.Option>
        <Select.Option
          value={JSON.stringify({ id: 4, name: 'Perpetual Industrial Share' })}
          title="Perpetual Industrial Share (AMP0057AU)"
        >
          <span className="text">Perpetual Industrial Share</span>
          <span className="code">AMP0057AU</span>
        </Select.Option>
        <Select.Option
          value={JSON.stringify({ id: 5, name: 'Plato Australian Shares Income' })}
          title="Plato Australian Shares Income (AMP0767AU)"
        >
          <span className="text">Plato Australian Shares Income</span>
          <span className="code">AMP0767AU</span>
        </Select.Option>
      </OptGroup>,
      <OptGroup label="Model Portfolios">
        <Select.Option
          value={JSON.stringify({ id: 6, name: 'Model Portpolio 1 (Growth)' })}
          title="Model Portpolio 1 (Growth)"
        >
          Model Portpolio 1 (Growth)
        </Select.Option>
        <Select.Option
          value={JSON.stringify({ id: 7, name: 'Model Portpolio 2 (Defensive)' })}
          title="Model Portpolio 2 (Defensive)"
        >
          Model Portpolio 2 (Defensive)
        </Select.Option>
        <Select.Option
          value={JSON.stringify({ id: 8, name: 'Model Portpolio 2 (Moderate)' })}
          title="Model Portpolio 3 (Moderate)"
        >
          Model Portpolio 3 (Moderate)
        </Select.Option>
        <Select.Option
          value={JSON.stringify({ id: 9, name: 'Model Portpolio 2 (Defensive)' })}
          title="Model Portpolio 4 (Defensive)"
        >
          Model Portpolio 4 (Defensive)
        </Select.Option>
        <Select.Option
          value={JSON.stringify({ id: 10, name: 'Model Portpolio 2 (Growth)' })}
          title="Model Portpolio 5 (Growth)"
        >
          Model Portpolio 5 (Growth)
        </Select.Option>
      </OptGroup>,
    ];
  }

  public render() {
    const { placeholder, onSelect, selectedOption } = this.props;
    const { keyword } = this.state;

    return (
      <TopSearch border>
        <Icon type="search" />
        <Select
          showSearch
          value={keyword}
          defaultValue={JSON.stringify(selectedOption)}
          onChange={this.onChange}
          onSelect={onSelect}
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
