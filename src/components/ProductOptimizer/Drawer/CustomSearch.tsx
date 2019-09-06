import React, { PureComponent } from 'react';
import { Select, Icon } from 'antd';
const { Option, OptGroup } = Select;

import { TopSearch } from '../../../layouts/Header/styled';

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
          dropdownStyle={{
            minWidth: 'unset',
          }}
        >
          <OptGroup label="Manager">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </OptGroup>
          <OptGroup label="Engineer">
            <Option value="Yiminghe">yiminghe</Option>
          </OptGroup>
        </Select>
        <Icon type="filter" />
      </TopSearch>
    );
  }
}

export default CustomSearch;
