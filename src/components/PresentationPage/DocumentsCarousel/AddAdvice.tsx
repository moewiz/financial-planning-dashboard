import React, { PureComponent } from 'react';
import { map, get } from 'lodash';
import { Dropdown, Icon, Menu } from 'antd';
const { Item } = Menu;

import { HeaderTitleTable, TextTitle } from '../../../pages/client/styled';
import { advices } from '../../../enums/advices';

interface AddAdviceProps {
  header: string;
  onAdd: (text: string) => void;
}

const emptyArray: any[] = [];

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
    const { header } = this.props;
    const options: string[] = get(advices, header, emptyArray);
    return <Menu>{map(options, (option, index) => this.renderItems(option, index))}</Menu>;
  }

  public render() {
    return (
      <HeaderTitleTable>
        <Dropdown overlay={this.renderMenu()} trigger={['click']}>
          <Icon type={'plus-square'} theme={'filled'} />
        </Dropdown>
        <TextTitle small={true}>Advice Area</TextTitle>
      </HeaderTitleTable>
    );
  }
}

export default AddAdvice;
