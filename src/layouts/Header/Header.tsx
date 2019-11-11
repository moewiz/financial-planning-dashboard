import React from 'react';
import { Avatar } from 'antd';
import { TopMenu, MenuItem, Header as StyledHeader } from './styled';
import { FullName } from '../Sidebar/styled';

interface HeaderProps {
  fullName: string;
  avatarUrl: string;
}

class Header extends React.PureComponent<HeaderProps> {
  public render(): JSX.Element {
    const { fullName, avatarUrl } = this.props;
    return (
      <StyledHeader>
        <TopMenu className="topmenu">
          <MenuItem key="1">
            <Avatar src="http://sgp18.siteground.asia/~whistle4/images/always_right.png" size={32} icon="user" />
            {fullName ? <FullName>{fullName}</FullName> : ''}
          </MenuItem>
        </TopMenu>
      </StyledHeader>
    );
  }
}

export default Header;
