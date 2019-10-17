import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { Dropdown, Icon, Menu } from 'antd';
const { Item } = Menu;

import { HeaderTitleTable, TextTitle } from '../../../pages/client/styled';

interface AddAdviceProps {
  dropdown: string[];
  onAdd: (text: string) => void;
}

class AddAdvice extends PureComponent<AddAdviceProps> {
  public renderItems = (option: string, index: number) => {
    const { onAdd } = this.props;
    const onClickItem = () => {
      onAdd(option);
    };

    return (
      <Item onClick={onClickItem} key={index + option}>
        {option}
      </Item>
    );
  }

  public renderMenu = () => {
    const { dropdown } = this.props;
    return <Menu>{map(dropdown, (option, index) => this.renderItems(option, index))}</Menu>;
  }

  public render() {
    return (
      <HeaderTitleTable>
        <Dropdown overlay={this.renderMenu()} trigger={['click']}>
          <Icon type={'plus-square'} theme={'filled'} />
        </Dropdown>
        <TextTitle small={true}>Proposed</TextTitle>
      </HeaderTitleTable>
    );
  }
}

export default AddAdvice;
