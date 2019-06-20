import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState, StandardAction } from '../../reducers/reducerTypes';
import {
  Client as IClient,
  ClientActions,
  DataEntry,
  FetchDataEntryAction,
  FetchDataEntryPayload,
  Tag,
} from '../../reducers/client';
import { connect } from 'react-redux';
import { get, isEqual, find } from 'lodash';
import { Layout, Icon } from 'antd';
const { Content } = Layout;
import Heading from '../../components/Heading/Heading';
import { ButtonModalFixed } from '../../components/NameAndBirthDay/styled';
import { HomeDesc, HomePage } from '../home/styled';
import DataEntryComponent from '../../components/ClientDetailPage/DataEntry';
import StrategyPage from '../../components/StrategyPage/StrategyPage';
import { Tab } from '../../enums/client';

const getParams = (params: { clientId?: string; tagName?: string; tabName?: string }) => {
  return {
    clientId: Number.parseInt(get(params, 'clientId', ''), 10),
    tagName: get(params, 'tagName'),
    tabName: get(params, 'tabName'),
  };
};

interface ClientProps {
  pageData: any;
  fetchDataEntry?: (payload: FetchDataEntryPayload) => FetchDataEntryAction;
}

class Client extends React.PureComponent<RouteComponentProps & ClientProps> {
  public componentDidMount() {
    const { match, fetchDataEntry } = this.props;
    const { clientId, tabName, tagName } = getParams(match.params);

    if (clientId && tagName && tabName && fetchDataEntry) {
      this.fetchDataEntry({ clientId, tagName, tabName });
    }
  }

  public componentDidUpdate(
    prevProps: Readonly<RouteComponentProps & ClientProps>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    const { match } = this.props;
    const { match: prevMatch } = prevProps;
    const { clientId, tagName, tabName } = getParams(match.params);
    const { clientId: prevClientId, tagName: prevTagName, tabName: prevTabName } = getParams(prevMatch.params);
    if (
      clientId &&
      tabName &&
      tagName &&
      !isEqual({ clientId, tagName, tabName }, { clientId: prevClientId, tagName: prevTagName, tabName: prevTabName })
    ) {
      this.fetchDataEntry({ clientId, tabName, tagName });
    }
  }

  public fetchDataEntry = (params: { clientId: number; tagName: string; tabName: string }) => {
    const { fetchDataEntry } = this.props;

    if (fetchDataEntry) {
      fetchDataEntry(params);
    }
  }

  public render(): JSX.Element {
    const { match, pageData } = this.props;
    const { clientId, tagName, tabName } = getParams(match.params);

    if (clientId && tagName && tabName) {
      switch (tabName) {
        case Tab.Current: {
          return <DataEntryComponent clientId={clientId} tabName={tabName} tagName={tagName} empStatus={''} />;
        }
        case Tab.Strategy: {
          return <StrategyPage clientId={clientId} pageData={pageData} />;
        }
        default: {
          return (
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
    }

    return (
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

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps & ClientProps) => {
  let pageData;
  const clients = state.client.get('clients');
  const { clientId, tagName, tabName } = getParams(ownProps.match.params);
  const client: IClient | undefined = find(clients, (c: IClient) => c.clientId === clientId);

  if (tabName && client && client.tagList && client.tagList.length > 0) {
    const tag: Tag | undefined = find(client.tagList, (t: Tag) => t.name === tagName);
    if (tag && tag.dataEntries && tag.dataEntries.length > 0) {
      const dataEntry: DataEntry | undefined = find(tag.dataEntries, (d: DataEntry) => d.tabName === tabName);
      if (dataEntry) {
        pageData = dataEntry.pageData;
      }
    }
  }

  return {
    pageData,
    loading: state.client.get('loading'),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<StandardAction<any>>) =>
  bindActionCreators(
    {
      fetchDataEntry: ClientActions.fetchDataEntry,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Client);
