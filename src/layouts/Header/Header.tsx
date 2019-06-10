import React from 'react';
import { Layout, Icon, Avatar } from 'antd';
import { InputSearch, TopSearch, TopMenu, MenuItem } from './styled';
import { FullName } from '../Sidebar/styled';

const AntHeader = Layout.Header;

interface HeaderProps {
  fullName: string;
  avatarUrl: string;
}

class Header extends React.PureComponent<HeaderProps> {
  public render(): JSX.Element {
    const { fullName, avatarUrl } = this.props;

    return (
      <AntHeader className="header">
        <TopMenu className="topmenu">
          <MenuItem key="1">
            <TopSearch>
              <Icon type="search" />
              <InputSearch placeholder="Search Here" />
            </TopSearch>
          </MenuItem>
          <MenuItem key="2">
            <Avatar src={avatarUrl} size={32} icon="user" />
            <FullName>{fullName}</FullName>
          </MenuItem>
        </TopMenu>
      </AntHeader>
    );
  }
}

export default Header;
