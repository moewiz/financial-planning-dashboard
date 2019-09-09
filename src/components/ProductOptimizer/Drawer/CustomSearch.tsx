import React, { PureComponent } from 'react';
import { Select, Icon } from 'antd';
const { Option, OptGroup } = Select;

import { TopSearch } from '../../../layouts/Header/styled';
import { Filter } from '../../Icons';

interface Prop {
  placeholder: string;
}

interface State {
  keyword: string;
}

class CustomSearch extends PureComponent<Prop, State> {
  constructor(props: Prop) {
    super(props);

    this.state = {
      keyword: '',
    };
  }

  public onChange = (keyword: string) => {
    this.setState({ keyword });
  }

  public render() {
    const { placeholder } = this.props;
    const { keyword } = this.state;

    return (
      <TopSearch border>
        <Icon type="search" />
        <Select
          showSearch
          value={keyword}
          onChange={this.onChange}
          placeholder={placeholder}
          className="custom-select"
          showArrow={false}
          dropdownClassName="custom-search-menu"
        >
          <OptGroup label="Recent">
            <Option value="BlackRock Global Income AMP1995AU">
              <span className="text">BlackRock Global Income</span>
              <span className="code">AMP1995AU</span>
            </Option>
            <Option value="Product X AMP1707AU">
              <span className="text">Product X</span>
              <span className="code">AMP1707AU</span>
            </Option>
          </OptGroup>
          <OptGroup label="Popular">
            <Option value="AMP Australian Share Index AMP1995AU">
              <span className="text">AMP Australian Share Index</span>
              <span className="code">AMP1995AU</span>
            </Option>
            <Option value="Perpetual Industrial Share AMP0057AU">
              <span className="text">Perpetual Industrial Share</span>
              <span className="code">AMP0057AU</span>
            </Option>
            <Option value="Plato Australian Shares Income AMP0767AU">
              <span className="text">Plato Australian Shares Income</span>
              <span className="code">AMP0767AU</span>
            </Option>
          </OptGroup>
          <OptGroup label="Model Portfolios">
            <Option value="Model Portpolio 1 (Growth)">Model Portpolio 1 (Growth)</Option>
            <Option value="Model Portpolio 2 (Defensive)">Model Portpolio 2 (Defensive)</Option>
            <Option value="Model Portpolio 3 (Moderate)">Model Portpolio 3 (Moderate)</Option>
            <Option value="Model Portpolio 4 (Defensive)">Model Portpolio 4 (Defensive)</Option>
            <Option value="Model Portpolio 5 (Growth)">Model Portpolio 5 (Growth)</Option>
          </OptGroup>
        </Select>
        <Icon component={Filter} />
      </TopSearch>
    );
  }
}

export default CustomSearch;
