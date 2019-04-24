import React from 'react';
import { Skeleton, Icon, Avatar } from 'antd';

import {
  SiderCollapsible,
  ClientInfo,
  FullName,
  ClientItem,
  SubList,
  StatusItem,
  DateItem,
  StatusTags,
  ClientSide,
  SkeletonClient,
  ClientRoot
} from './styled';
import { default as ModalNameAndBirthDay } from '../../components/NameAndBirthDay/NameAndBirthDay';
import { withRouter, RouteComponentProps } from 'react-router-dom';

/* ClientItem
 *    ClientInfo
 *      Avatar
 *      Full Name
 *
 *    SubsList
 *      StatusItem
 *      StatusItem
 *      StatusItem
 */

interface SidebarProps {
  tagName?: string;
}
class Sidebar extends React.PureComponent<SidebarProps & RouteComponentProps> {
  public state = {
    collapsed: false,
    loading: true,
  };

  public toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  public ClientItemRender = (tagName: string) => {
    const { loading } = this.state;
    return (
      <ClientItem
        key={tagName}
        title={
          <StatusItem>
            <DateItem>15/03/2018</DateItem>
            <StatusTags tagName={tagName}>{tagName}</StatusTags>
          </StatusItem>
        }
      >
        <SubList key="1">
          <i className="icon-current" />
          <span>Current</span>
        </SubList>
        <SubList key="2">
          <i className="icon-strategy" />
          <span>Strategy</span>
        </SubList>
        <SubList key="3">
          <i className="icon-projections" />
          <span>Switching</span>
        </SubList>
        <SubList key="4">
          <i className="icon-documents" />
          <span>Documents</span>
        </SubList>
        <SubList key="5">
          <i className="icon-presentation" />
          <span>Presentation</span>
        </SubList>
      </ClientItem>
    );
  }

  public selectClient = () => {
    const { history } = this.props;
    const clientId = '123456';

    history.push(`/client/${clientId}`);
  }

  public render(): JSX.Element {
    return (
      <SiderCollapsible width={295} trigger={null} collapsible collapsed={this.state.collapsed}>
        <Icon
          className="trigger IconSider"
          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggleCollapsed}
        />
        <ClientSide defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
          <ClientRoot
            key="sub1"
            title={
              <ClientInfo onClick={this.selectClient}>
                <Avatar size={56} style={{ color: '#fff', backgroundColor: '#383f5b' }}>
                  JS
                </Avatar>
                <FullName>John Samual</FullName>
              </ClientInfo>
            }>
            {this.ClientItemRender('new')}
            {this.ClientItemRender('position')}
            {this.ClientItemRender('strategy')}
            {this.ClientItemRender('products')}
            {this.ClientItemRender('advice')}
            {this.ClientItemRender('done')}
          </ClientRoot>
        </ClientSide>
        <ModalNameAndBirthDay />
      </SiderCollapsible>
    );
  }
}

export default withRouter(Sidebar);
