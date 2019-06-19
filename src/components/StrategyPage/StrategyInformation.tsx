import React, { PureComponent } from 'react';
import { get } from 'lodash';
import StatisticItem, { Statistic } from './StatisticItem';
import { StrategyTypes } from '../../enums/strategies';
import StandardText from './StandardText';
import { StrategyInfoWrapper, TitleStrategyBlock } from './styled';
import { Col, Row } from 'antd';
import GraphContainer, { GraphType } from './Graph/GraphContainer';

interface StrategyInformationProps {
  type: StrategyTypes;
  statistic: Statistic;
  graph: any;
  expandable: object;
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

class StrategyInformation extends PureComponent<StrategyInformationProps> {
  public render() {
    const { statistic, type } = this.props;
    const standardTextExample = [
      {
        text: 'Text line {{0}}',
        params: ['one'],
      },
      {
        text: 'Text line {{0}}',
        params: ['two'],
      },
      {
        text: 'Text line {{0}}',
        params: ['three'],
      },
    ];

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

        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem {...statistic} title={'Accumulation balance'} subTitle={'At retirement'} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Area}
                  name="Superannuation balance"
                  data={areaData}
                  className={'marginTop'}
                />
              </Col>
            </Row>
            <StandardText data={standardTextExample} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Pensions: {
        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem {...statistic} title={'Average pension income'} subTitle={'Per annum paid until'} />
              </Col>
              <Col span={12}>
                <GraphContainer type={GraphType.Line} name="Pension balance" data={data} className={'marginTop'} />
              </Col>
            </Row>
            <StandardText data={standardTextExample} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Investments: {
        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem {...statistic} title={'Cash reserve'} subTitle={'At age'} />
              </Col>
              <Col span={12}>
                <GraphContainer
                  type={GraphType.Line}
                  name="Investment (non-super) balance"
                  data={data}
                  className={'marginTop'}
                />
              </Col>
            </Row>
            <StandardText data={standardTextExample} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Debt: {
        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem
                  {...statistic}
                  title={'Total interest cost'}
                  subTitle={'non-deductible debt over loan period'}
                />
              </Col>
              <Col span={12}>
                <GraphContainer type={GraphType.Line} name="Debt Value" data={data} className={'marginTop'} />
              </Col>
            </Row>
            <StandardText data={standardTextExample} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Centrelink: {
        return (
          <StrategyInfoWrapper>
            <TitleStrategyBlock>{getTitle(type)}</TitleStrategyBlock>
            <Row type="flex" justify="space-between" gutter={32}>
              <Col span={12}>
                <StatisticItem {...statistic} title={'Centrelink income'} />
              </Col>
              <Col span={12}>
                <GraphContainer type={GraphType.Line} name="Centrelink income" data={data} className={'marginTop'} />
              </Col>
            </Row>
            <StandardText data={standardTextExample} />
          </StrategyInfoWrapper>
        );
      }
      default:
        return <div>No support for this type {{ type }}</div>;
    }
  }
}

export default StrategyInformation;
