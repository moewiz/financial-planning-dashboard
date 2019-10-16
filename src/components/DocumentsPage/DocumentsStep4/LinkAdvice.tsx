import React from 'react';
import { map, get } from 'lodash';
import { Dropdown, Icon, Menu } from 'antd';
const { SubMenu, Item } = Menu;

import { Choice } from '../../../enums/strategyChoices';
import { LinkCurrentProductWrapper } from '../../StrategyPage/Drawer/styled';

const LinkAdvice = (props: any) => {
  const { options } = props;
  const data: Choice[] = get(options, 'data', []);
  const renderItems = (option: Choice, index: number, keys: string[] = []) => {
    if (option.children && option.children.length > 0) {
      return (
        <SubMenu title={option.label} key={index}>
          {map(option.children, (otp, idx) => renderItems(otp, idx, [...keys, option.value]))}
        </SubMenu>
      );
    }
    const onClickItem = () => {
      console.log(option);
    };

    return (
      <Item onClick={onClickItem} key={index}>
        {option.label}
      </Item>
    );
  };
  const renderMenu = () => {
    const menu = map(data, (option, index) => renderItems(option, index));

    return <Menu>{menu}</Menu>;
  };

  return (
    <LinkCurrentProductWrapper>
      <Dropdown overlay={renderMenu()} trigger={['click']}>
        <Icon type="link" style={{ transform: 'rotate(45deg)' }} />
      </Dropdown>
    </LinkCurrentProductWrapper>
  );
};

export default LinkAdvice;
