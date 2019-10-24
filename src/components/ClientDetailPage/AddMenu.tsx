import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { map, filter } from 'lodash';

const { SubMenu, Item } = Menu;

import { currentChoices } from '../../enums/currentChoices';
import { CurrentTypes } from '../../enums/currents';
import { Choice } from '../../enums/strategyChoices';
import { maritalStatusOptions, OWNER } from '../../enums/options';

interface AddMenuProps {
  type: CurrentTypes;
  onClick: (value: string[]) => void;
  maritalStatus: string;
}

const AddMenu = ({ type, onClick, maritalStatus }: AddMenuProps) => {
  const renderItems = (option: Choice, index: number, keys: string[] = []) => {
    if (option.children && option.children.length > 0) {
      return (
        <SubMenu title={option.label} key={index}>
          {map(option.children, (otp, idx) => renderItems(otp, idx, [...keys, option.value]))}
        </SubMenu>
      );
    }
    const onClickItem = () => {
      onClick([...keys, option.value]);
    };

    return (
      <Item onClick={onClickItem} key={index + option.value}>
        {option.label}
      </Item>
    );
  };

  const renderMenu = () => {
    const single = maritalStatus === maritalStatusOptions[1].value;
    let options = filter(currentChoices[type], (option: Choice) => (single ? option.label !== OWNER.partner : true));
    if (!single) {
      options = [
        ...options,
        {
          value: 'joint',
          label: 'Joint',
          children: options[0].children,
        },
      ];
    }
    const menu = map(options, (option, index) => renderItems(option, index));

    return <Menu>{menu}</Menu>;
  };

  return (
    <Dropdown overlay={renderMenu()} trigger={['click']}>
      <Icon type={'plus-square'} theme={'filled'} />
    </Dropdown>
  );
};

export default AddMenu;
