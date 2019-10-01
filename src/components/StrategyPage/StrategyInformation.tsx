import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { connect as connectFormik, FormikContext } from 'formik';
import { get, map } from 'lodash';
import StatisticItem from './StatisticItem';
import { StrategyTypes } from '../../enums/strategies';
import StandardText from './StandardText';
import { StrategyInfoWrapper, TitleStrategyBlock } from './styled';
import { Col, Row } from 'antd';
import GraphContainer, { GraphType } from './Graph/GraphContainer';
import { StrategyEntry, GraphData } from '../../reducers/client';
import { StandardAction } from '../../reducers/reducerTypes';
import {
  DrawerActions,
  DrawerPayload,
  FetchDrawerDataAction,
  FetchDrawerDataSuccessAction,
  OpenDrawerAction,
} from '../../reducers/drawer';
import { loadGraphData } from './StrategyHeader';

interface FormikPartProps {
  formik: FormikContext<StrategyEntry>;
}

interface StrategyInformationProps {
  type: StrategyTypes;
  openDrawer: (tabActive: string) => OpenDrawerAction;
  fetchDrawerData: (type: string) => FetchDrawerDataAction;
  fetchDrawerSuccess: (drawerData: DrawerPayload) => FetchDrawerDataSuccessAction;
}

const getTitle = (type: StrategyTypes) => {
  switch (type) {
    case StrategyTypes.Superannuation:
      return 'Superannuation';
    case StrategyTypes.Pensions:
      return 'Pensions';
    case StrategyTypes.Investments:
      return 'Investments (non-super)';
    case StrategyTypes.Debt:
      return 'Debt';
    case StrategyTypes.Centrelink:
      return 'Centrelink';
    case StrategyTypes.Insurance:
      return 'Insurance';
    case StrategyTypes.EstatePlanning:
      return 'Estate Planning';
    default:
      return '';
  }
};

const generalConfig = {
  datasets: [
    {
      dataIndex: 'current',
      label: 'Current',
      fill: false,
      borderColor: '#FF5722',
      lineTension: 0,
    },
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: false,
      borderColor: '#00BCD4',
      lineTension: 0,
    },
  ],
};

const colors = {
  grey: {
    backgroundColor: '#f1f1f1',
    stoke: '#d0d0d0',
  },
  green: {
    backgroundColor: '#e0eadf',
    stroke: '#5eb84d',
  },
  lightBlue: {
    backgroundColor: '#6fccdd',
    stroke: '#6fccdd',
  },
  darkBlue: {
    backgroundColor: '#3282bf',
    stroke: '#3282bf',
  },
  purple: {
    backgroundColor: '#8fa8c8',
    stroke: '#75539e',
  },
};

class StrategyInformation extends PureComponent<FormikPartProps & StrategyInformationProps> {
  public onGraphClick = (e: React.SyntheticEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const { openDrawer, type, fetchDrawerSuccess } = this.props;
    openDrawer('client');
    const drawerData = get(this.props, ['formik', 'values', type, 'drawer'], {});
    fetchDrawerSuccess(drawerData);
  }

  public render() {
    const { type } = this.props;
    const kpi = get(this.props, ['formik', 'values', type, 'kpi'], []);
    const graph = get(this.props, ['formik', 'values', type, 'graph'], []);
    const standardText = get(this.props, ['formik', 'values', type, 'standardText'], []);
    const basicGraphData = map(graph, (graphData: GraphData) => ({
      ...loadGraphData(generalConfig)(graphData),
      title: graphData.title,
    }));

    switch (type) {
      case StrategyTypes.Superannuation: {
        const config = {
          datasets: [
            {
              dataIndex: 'current',
              label: 'Current',
              fill: true,
              pointRadius: 0,
              ...colors.lightBlue,
            },
            {
              dataIndex: 'proposed',
              label: 'Proposed',
              fill: true,
              pointRadius: 0,
              ...colors.darkBlue,
            },
          ],
        };
        const graphList = map(graph, (graphData: GraphData) => ({
          ...loadGraphData(config)(graphData),
          title: graphData.title,
        }));

        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Area}
                  dataList={graphList}
                  className={'marginTop'}
                  onGraphClick={this.onGraphClick}
                />
              </Col>
            </Row>
            <StandardText data={standardText} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Pensions: {
        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Line}
                  dataList={basicGraphData}
                  className={'marginTop'}
                  onGraphClick={this.onGraphClick}
                />
              </Col>
            </Row>
            <StandardText data={standardText} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Investments: {
        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Line}
                  dataList={basicGraphData}
                  className={'marginTop'}
                  onGraphClick={this.onGraphClick}
                />
              </Col>
            </Row>
            <StandardText data={standardText} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Debt: {
        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Line}
                  dataList={basicGraphData}
                  className={'marginTop'}
                  onGraphClick={this.onGraphClick}
                />
              </Col>
            </Row>
            <StandardText data={standardText} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Centrelink: {
        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Line}
                  dataList={basicGraphData}
                  className={'marginTop'}
                  onGraphClick={this.onGraphClick}
                />
              </Col>
            </Row>
            <StandardText data={standardText} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Insurance: {
        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.HorizontalBar}
                  dataList={basicGraphData}
                  className={'marginTop'}
                  onGraphClick={this.onGraphClick}
                />
              </Col>
            </Row>
            <StandardText data={standardText} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.EstatePlanning: {
        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Bar}
                  dataList={basicGraphData}
                  className={'marginTop'}
                  onGraphClick={this.onGraphClick}
                />
              </Col>
            </Row>
            <StandardText data={standardText} />
          </StrategyInfoWrapper>
        );
      }
      default:
        return <div>No support for this type {{ type }}</div>;
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch<StandardAction<any>>) =>
  bindActionCreators(
    {
      openDrawer: DrawerActions.openDrawer,
      fetchDrawerData: DrawerActions.fetchDrawerData,
      fetchDrawerSuccess: DrawerActions.fetchDrawerSuccess,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(connectFormik<StrategyInformationProps, StrategyEntry>(StrategyInformation));
