import React from 'react';
import { Icon, Avatar } from 'antd';
import { map } from 'lodash';

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
  ClientRoot,
} from './styled';
import { default as ModalNameAndBirthDay } from '../../components/NameAndBirthDay/NameAndBirthDay';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { POSITIONS, Position } from '../../enums/client';
import { Client, Tag } from '../../reducers/client';

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
  clients: Client[];
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

  public showTable = (tagName: string, tabName: string, clientId: number) => {
    const { history } = this.props;

    history.push(`/client/${clientId}/${tagName}/${tabName}`);
  }

  public selectClient = (clientId: number) => {
    const { history } = this.props;

    history.push(`/client/${clientId}`);
  }

  public renderClientItem = (tag: Tag, clientId: number) => {
    const { name, date } = tag;
    const { loading } = this.state;

    return (
      <ClientItem
        key={name}
        title={
          <StatusItem>
            <DateItem>{date}</DateItem>
            <StatusTags tagName={name}>{name}</StatusTags>
          </StatusItem>
        }
      >
        {map(POSITIONS, (position: Position) => (
          <SubList key={name + position.value} onClick={() => this.showTable(name, position.slug, clientId)}>
            <i className={position.icon} />
            <span>{position.label}</span>
          </SubList>
        ))}
      </ClientItem>
    );
  }

  public render(): JSX.Element {
    const { clients } = this.props;
    return (
      <SiderCollapsible width={295} trigger={null} collapsible collapsed={this.state.collapsed}>
        <Icon
          className="trigger IconSider"
          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggleCollapsed}
        />
        <ClientSide mode="inline">
          {map(clients, (client: Client) => (
            <ClientRoot
              key={client.clientId}
              title={
                <ClientInfo onClick={() => this.selectClient(client.clientId)}>
                  <Avatar size={56} style={{ color: '#fff', backgroundColor: '#383f5b' }}>
                    JS
                  </Avatar>
                  <FullName>{client.clientName}</FullName>
                </ClientInfo>
              }
            >
              {map(client.tagList, (tag: Tag) => this.renderClientItem(tag, client.clientId))}
            </ClientRoot>
          ))}
        </ClientSide>
        <ModalNameAndBirthDay />
      </SiderCollapsible>
    );
  }
}

export default withRouter(Sidebar);
