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
import { StrategyEntry } from '../../reducers/client';
import { StandardAction } from '../../reducers/reducerTypes';
import {
  DrawerActions,
  DrawerPayload,
  FetchDrawerDataAction,
  FetchDrawerDataSuccessAction,
  OpenDrawerAction,
} from '../../reducers/drawer';

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

const data = {
  labels: ['19', '20', '21', '22', '23', '24', '25'],
  datasets: [
    {
      label: 'a',
      fill: false,
      borderColor: '#FF5722',
      data: [165000, 159000, 120000, 165000, 235000, 120000, 140000],
    },
    {
      label: 'b',
      fill: false,
      borderColor: '#00BCD4',
      data: [85000, 45000, 70000, 65000, 100000, 150000, 135000],
    },
  ],
};
const colors = {
  grey: {
    fill: '#f1f1f1',
    stoke: '#d0d0d0',
  },
  green: {
    fill: '#e0eadf',
    stroke: '#5eb84d',
  },
  lightBlue: {
    fill: '#6fccdd',
    stroke: '#6fccdd',
  },
  darkBlue: {
    fill: '#3282bf',
    stroke: '#3282bf',
  },
  purple: {
    fill: '#8fa8c8',
    stroke: '#75539e',
  },
};
const superannuationChartColors = [colors.lightBlue, colors.darkBlue, colors.grey];

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

    switch (type) {
      case StrategyTypes.Superannuation: {
        const datasets = [
          ...data.datasets,
          {
            label: 'c',
            fill: true,
            borderColor: '#00BCD4',
            data: [70000, 45000, 45000, 150000, 100000, 35000, 65000],
          },
        ];
        const areaData = {
          ...data,
          datasets: datasets.map((dataset, index) => ({
            ...dataset,
            fill: true,
            borderColor: '',
            pointRadius: 0,
            backgroundColor: get(superannuationChartColors[index], 'fill'),
          })),
        };
        const listOfKpi = map(kpi, (i: any) => ({ ...i, total: i.accumulationBalance, subValue: i.retirementYear }));

        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={listOfKpi} title={'Accumulation balance'} subTitle={'At retirement'} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Area}
                  name="Superannuation balance"
                  data={areaData}
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
        const listOfKpi = map(kpi, (i: any) => ({ ...i, total: i.averagePensionIncome, subValue: i.paidUntil }));

        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem
                  listOfKpi={listOfKpi}
                  title={'Average pension income'}
                  subTitle={'Per annum paid until'}
                />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Line}
                  name="Pension balance"
                  data={data}
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
        const listOfKpi = map(kpi, (i: any) => ({ ...i, total: i.cashReserve, subValue: i.atAge }));

        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={listOfKpi} title={'Cash reserve'} subTitle={'At age'} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Line}
                  name="Investment (non-super) balance"
                  data={data}
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
        const listOfKpi = map(kpi, (i: any) => ({ ...i, total: i.interestCost, subValue: i.atAge }));

        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem
                  listOfKpi={listOfKpi}
                  title={'Total interest cost'}
                  subTitle={'non-deductible debt over loan period'}
                />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Line}
                  name="Debt Value"
                  data={data}
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
        const listOfKpi = map(kpi, (i: any) => ({ ...i, total: i.interestCost }));

        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={listOfKpi} title={'Centrelink income'} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Line}
                  name="Centrelink income"
                  data={data}
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
        const listOfKpi = map(kpi, (i: any) => ({ ...i, total: i.lifeInsurance }));

        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={listOfKpi} title={'Life insurance'} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.HorizontalBar}
                  name="[Graph Name]"
                  data={data}
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
        const listOfKpi = map(kpi, (i: any) => ({ ...i, total: i.kpiName }));

        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem listOfKpi={listOfKpi} title={'[KPI Name]'} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Bar}
                  name="[Graph Name]"
                  data={data}
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
