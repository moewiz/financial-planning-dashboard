import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import Heading from '../../components/Heading/Heading';
import { ButtonModalFixed } from '../../components/NameAndBirthDay/styled';
import { HomeDesc, HomePage } from '../home/styled';
import { get } from 'lodash';
import DataEntry from './DataEntry';
const { Content } = Layout;

class Client extends React.PureComponent<RouteComponentProps> {
  public render(): JSX.Element {
    const { match } = this.props;
    const clientId = get(match, 'params.clientId');
    const tabName = get(match, 'params.tabName');

    return tabName ? (
      <DataEntry tabName={tabName} />
    ) : (
      <HomePage select>
        <Content>
          <Heading level={2} className="subHeading" titleText="Hi John we missed you." />
          <HomeDesc>Click the plus button to start your advice</HomeDesc>
          <ButtonModalFixed size="large" shape="circle" type="primary">
            <Icon type="plus" />
          </ButtonModalFixed>
        </Content>
      </HomePage>
    );
  }
}

export default Client;
