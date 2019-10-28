import React from 'react';
import { map, get, findIndex } from 'lodash';
import { Dropdown, Icon, Menu } from 'antd';
const { SubMenu, Item } = Menu;

import { Choice } from '../../../enums/strategyChoices';
import { LinkCurrentProductWrapper } from '../../StrategyPage/Drawer/styled';

const LinkAdvice = (props: any) => {
  const { options, onChange, value, name } = props;
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
      const newTag = {
        id: Number.parseInt(option.value, 10),
        value: option.label,
      };
      const shouldAddNew = findIndex(value, (tag) => JSON.stringify(tag) === JSON.stringify(newTag)) === -1;
      if (shouldAddNew) {
        onChange([...value, newTag], name);
      }
    };

    return (
      <Item onClick={onClickItem} key={index + option.value}>
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
