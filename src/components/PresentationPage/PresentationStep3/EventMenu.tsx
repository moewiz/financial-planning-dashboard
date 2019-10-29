import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
const { Item } = Menu;

import { HeaderTitleTable, TextTitle } from '../../../pages/client/styled';

const renderMenu = (onClick: (key: string) => void) => {
  return (
    <Menu>
      <Item onClick={() => onClick('client')}>Client</Item>
      <Item onClick={() => onClick('partner')}>Partner</Item>
    </Menu>
  );
};

interface EventMenuProps {
  title: string;
  createEvent: (key: string) => void;
}

const EventMenu = (props: EventMenuProps) => {
  const { title, createEvent } = props;

  return (
    <HeaderTitleTable>
      <Dropdown overlay={renderMenu(createEvent)} trigger={['click']}>
        <Icon type={'plus-square'} theme={'filled'} />
      </Dropdown>
      <TextTitle small={true}>{title}</TextTitle>
    </HeaderTitleTable>
  );
};

export default EventMenu;
