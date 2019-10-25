import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Avatar, Icon } from 'antd';
import { map } from 'lodash';

import {
  ClientInfo,
  ClientItem,
  ClientRoot,
  ClientSide,
  DateItem,
  FullName,
  InputSearch,
  SiderCollapsible,
  StatusItem,
  StickyStyle,
  SubList,
  TopSearch,
} from './styled';
import { default as ModalNameAndBirthDay } from '../../components/NameAndBirthDay/NameAndBirthDay';
import { Position, POSITIONS } from '../../enums/client';
import { Client, Tag } from '../../reducers/client';
import { createEvent } from '../../utils/GA';

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

const colors = ['#00AA55', '#009FD4', '#B381B3', '#939393', '#E3BC00', '#D47500', '#DC2A2A'];

// numberFromText("AA");
const numberFromText = (text: string): number => {
  const charCodes = text
    .split('') // => ["A", "A"]
    .map((char) => char.charCodeAt(0)) // => [65, 65]
    .join(''); // => "6565"
  return parseInt(charCodes, 10);
};

const getColorFromText = (text: string): string => colors[numberFromText(text) % colors.length];

const getAvatarName = (fullName: string) => {
  const names = fullName.split(' ');
  return `${names[0][0]}${names[1][0]}`;
};

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

  public showTable = (tag: Tag, position: Position, clientId: number) => {
    const { history } = this.props;
    const { name: tagName, date } = tag;

    createEvent('client_navigation', position.label, date, clientId);
    history.push(`/client/${clientId}/${tagName}/${position.slug}`);
  }

  public selectClient = (clientId: number) => {
    const { history } = this.props;

    history.push(`/client/${clientId}`);
  }

  public renderClientItem = (tag: Tag, clientId: number) => {
    const { name, date, icon } = tag;

    return (
      <ClientItem
        key={name + clientId}
        title={
          <StatusItem>
            <DateItem>
              <Icon type={icon} />
              {date}
            </DateItem>
          </StatusItem>
        }
      >
        {map(POSITIONS, (position: Position) => (
          <SubList key={name + clientId + position.value} onClick={() => this.showTable(tag, position, clientId)}>
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
        <TopSearch>
          <Icon type="search" />
          <InputSearch placeholder="Search Here" />
          <Icon
            className="trigger IconSider"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggleCollapsed}
          />
        </TopSearch>
        <ClientSide mode="inline">
          {map(clients, (client: Client) => {
            const randomColor = getColorFromText(getAvatarName(client.clientName));
            return (
              <ClientRoot
                key={client.clientId}
                title={
                  <ClientInfo onClick={() => this.selectClient(client.clientId)}>
                    <Avatar
                      size={38}
                      style={{
                        color: randomColor,
                        backgroundColor: `${randomColor}80`,
                      }}
                    >
                      {getAvatarName(client.clientName)}
                    </Avatar>
                    <FullName>{client.clientName}</FullName>
                  </ClientInfo>
                }
              >
                {map(client.tagList, (tag: Tag) => this.renderClientItem(tag, client.clientId))}
              </ClientRoot>
            );
          })}
        </ClientSide>
        <ModalNameAndBirthDay />
        <StickyStyle collapsed={this.state.collapsed} />
      </SiderCollapsible>
    );
  }
}

export default withRouter(Sidebar);
