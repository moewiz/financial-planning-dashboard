import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { connect as connectFormik, FormikContext } from 'formik';
import { get, map } from 'lodash';
import StatisticItem from './StatisticItem';
import { StrategyTypes } from '../../enums/strategies';
import StandardText from './StandardText';
import { StrategyInfoWrapper } from './styled';
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
import { createEvent } from '../../utils/GA';
import { getStrategyTitle } from './StrategyPage';

interface FormikPartProps {
  formik: FormikContext<StrategyEntry>;
}

interface StrategyInformationProps {
  clientId: number;
  type: StrategyTypes;
  openDrawer: (tabActive: string) => OpenDrawerAction;
  fetchDrawerData: (type: string) => FetchDrawerDataAction;
  fetchDrawerSuccess: (drawerData: DrawerPayload) => FetchDrawerDataSuccessAction;
}

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

    const { openDrawer, type, fetchDrawerSuccess, formik, clientId } = this.props;
    const drawerData = get(formik, ['values', type, 'drawer'], {});

    createEvent('strategy', 'drawer_initiate', getStrategyTitle(type), clientId);
    openDrawer('client');
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
        return (
          <StrategyInfoWrapper>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer type={GraphType.Line} dataList={basicGraphData} onGraphClick={this.onGraphClick} />
              </Col>
            </Row>
            <StandardText data={standardText} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Pensions: {
        return (
          <StrategyInfoWrapper>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer type={GraphType.Line} dataList={basicGraphData} onGraphClick={this.onGraphClick} />
              </Col>
            </Row>
            <StandardText data={standardText} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Investments: {
        return (
          <StrategyInfoWrapper>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer type={GraphType.Line} dataList={basicGraphData} onGraphClick={this.onGraphClick} />
              </Col>
            </Row>
            <StandardText data={standardText} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Debt: {
        return (
          <StrategyInfoWrapper>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer type={GraphType.Line} dataList={basicGraphData} onGraphClick={this.onGraphClick} />
              </Col>
            </Row>
            <StandardText data={standardText} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Centrelink: {
        return (
          <StrategyInfoWrapper>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer type={GraphType.Line} dataList={basicGraphData} onGraphClick={this.onGraphClick} />
              </Col>
            </Row>
            <StandardText data={standardText} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Insurance: {
        const insuranceConfig = {
          datasets: [
            {
              dataIndex: 'current',
              label: 'Needs Analysis',
              fill: false,
              borderColor: '#00BCD4',
              lineTension: 0,
            },
            {
              dataIndex: 'proposed',
              label: 'Proposed',
              fill: false,
              borderColor: '#FF5722',
              lineTension: 0,
            },
          ],
        };
        const insuranceGraphData = map(graph, (graphData: GraphData) => ({
          ...loadGraphData(insuranceConfig)(graphData),
          title: graphData.title,
        }));

        return (
          <StrategyInfoWrapper>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Bar}
                  dataList={insuranceGraphData}
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
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer type={GraphType.Bar} dataList={basicGraphData} onGraphClick={this.onGraphClick} />
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
