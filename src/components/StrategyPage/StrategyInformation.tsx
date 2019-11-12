import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { connect as connectFormik, FormikContext } from 'formik';
import { get, map } from 'lodash';
import { Col, Icon, Row } from 'antd';
import numeral from 'numeral';

import StatisticItem from './StatisticItem';
import { StrategyTypes } from '../../enums/strategies';
import StandardText from './StandardText';
import { EstatePlanningBoxWrapper, StrategyInfoWrapper } from './styled';
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
import { KeyPointItem, KeyPointList } from '../PresentationPage/PresentationStep2/styled';

interface FormikPartProps {
  formik: FormikContext<StrategyEntry>;
}

interface StrategyInformationProps {
  clientId: number;
  type: StrategyTypes;
  openDrawer: (tabActive: string) => OpenDrawerAction;
  fetchDrawerData: (type: string) => FetchDrawerDataAction;
  fetchDrawerSuccess: (drawerData: DrawerPayload) => FetchDrawerDataSuccessAction;
  tableProcessing: string | null;
}

const generalConfig = {
  datasets: [
    {
      dataIndex: 'current',
      label: 'Current',
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

const options = (max: number, min: number, stepSize: number) => ({
  scales: {
    yAxes: [
      {
        ticks: {
          // Include a dollar sign in the ticks
          max,
          min,
          stepSize,
          callback: (value: any, index: any, values: any) => {
            return numeral(Math.round(value * 100) / 100).format('$0,0.[00]');
          },
        },
      },
    ],
  },
});

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
  };

  public render() {
    const { type, tableProcessing } = this.props;
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
        const pensionOption = options(600000, 0, 100000);
        const pensionOption2 = options(700000, 0, 100000);

        return (
          <StrategyInfoWrapper>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Line}
                  dataList={basicGraphData}
                  onGraphClick={this.onGraphClick}
                  optionList={[pensionOption, pensionOption2]}
                />
              </Col>
            </Row>
            <StandardText
              data={standardText}
              tableProcessing={tableProcessing}
              loading={tableProcessing === StrategyTypes.Pensions}
              className="pension-text-item"
            />
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
                <GraphContainer
                  type={GraphType.Line}
                  dataList={basicGraphData}
                  onGraphClick={this.onGraphClick}
                  options={options(350000, 50000, 50000)}
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
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={kpi} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Line}
                  dataList={basicGraphData}
                  onGraphClick={this.onGraphClick}
                  optionList={[
                    options(340000, 100000, 40000),
                    options(180000, 0, 30000),
                  ]}
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
        const optionInsurance = {
          scales: {
            yAxes: [
              {
                ticks: {
                  // Include a dollar sign in the ticks
                  min: 3000,
                  max: 9000,
                  stepSize: 1000,
                  callback: (value: any, index: any, values: any) => {
                    return numeral(Math.round(value * 100) / 100).format('$0,0.[00]');
                  },
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 10,
                },
              },
            ],
          },
        };
        const optionInsuranc2 = {
          scales: {
            yAxes: [
              {
                ticks: {
                  // Include a dollar sign in the ticks
                  min: 0,
                  max: 600000,
                  stepSize: 100000,
                  callback: (value: any, index: any, values: any) => {
                    return numeral(Math.round(value * 100) / 100).format('$0,0.[00]');
                  },
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 10,
                },
              },
            ],
          },
        };
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
                  optionList={[optionInsuranc2, optionInsurance]}
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
                <EstatePlanningBoxWrapper>
                  <KeyPointList>
                    <KeyPointItem>
                      <Icon type="exclamation" />
                      Will
                    </KeyPointItem>
                    <KeyPointItem>
                      <Icon type="exclamation" />
                      PoA
                    </KeyPointItem>
                    <KeyPointItem>
                      <Icon type="check" />
                      <span>Death Benefit nomination</span>
                    </KeyPointItem>
                    <KeyPointItem>
                      <Icon type="exclamation" />
                      Testamentary Trust
                    </KeyPointItem>
                  </KeyPointList>
                </EstatePlanningBoxWrapper>
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
