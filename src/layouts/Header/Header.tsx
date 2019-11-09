import React from 'react';
import { Layout, Icon, Avatar } from 'antd';
import { TopMenu, MenuItem } from './styled';
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
            <Avatar src={'http://sgp18.siteground.asia/~whistle4/images/always_right.png'} size={32} icon="user" />
            {
              fullName ? <FullName>{fullName}</FullName> : ''
            }
          </MenuItem>
        </TopMenu>
      </AntHeader>
    );
  }
}

export default Header;
