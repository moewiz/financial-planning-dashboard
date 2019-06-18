import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { Line } from 'react-chartjs-2';
import StatisticItem, { Statistic } from './StatisticItem';
import { GraphCard, GraphTitle } from './styled';
import { StrategyTypes } from '../../enums/strategies';
import StandardText from './StandardText';

interface StrategyInformationProps {
  type: StrategyTypes;
  statistic: Statistic;
  graph: any;
  expandable: object;
}

const data = {
  labels: ['19', '20', '21', '22', '23', '24', '25'],
  datasets: [
    {
      label: '',
      fill: false,
      borderColor: '#FF5722',
      data: [165000, 159000, 120000, 165000, 235000, 120000, 140000],
    },
    {
      label: '',
      fill: false,
      borderColor: '#00BCD4',
      data: [85000, 45000, 70000, 65000, 100000, 150000, 135000],
    },
  ],
};

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
        return (
          <div>
            <StatisticItem {...statistic} title={'Accumulation balance'} subTitle={'At retirement'} />
            <GraphCard>
              <GraphTitle>
                <Icon type="info-circle" theme="filled" />
                Superannuation balance
              </GraphTitle>
              <Line
                data={data}
                options={{
                  legend: {
                    display: false,
                  },
                }}
              />
            </GraphCard>
            <StandardText data={standardTextExample} />
          </div>
        );
      }
      case StrategyTypes.Pensions: {
        return (
          <div>
            <StatisticItem {...statistic} title={'Average pension income'} subTitle={'Per annum paid until'} />
            <GraphCard>
              <GraphTitle>
                <Icon type="info-circle" theme="filled" />
                Superannuation balance
              </GraphTitle>
              <Line
                data={data}
                options={{
                  legend: {
                    display: false,
                  },
                }}
              />
            </GraphCard>
            <StandardText data={standardTextExample} />
          </div>
        );
      }
      case StrategyTypes.Investments: {
        return (
          <div>
            <StatisticItem {...statistic} title={'Cash reserve'} subTitle={'At age'} />
            <GraphCard>
              <GraphTitle>
                <Icon type="info-circle" theme="filled" />
                Superannuation balance
              </GraphTitle>
              <Line
                data={data}
                options={{
                  legend: {
                    display: false,
                  },
                }}
              />
            </GraphCard>
            <StandardText data={standardTextExample} />
          </div>
        );
      }
      case StrategyTypes.Debt: {
        return (
          <div>
            <StatisticItem
              {...statistic}
              title={'Total interest cost'}
              subTitle={'non-deductible debt over loan period'}
            />
            <GraphCard>
              <GraphTitle>
                <Icon type="info-circle" theme="filled" />
                Superannuation balance
              </GraphTitle>
              <Line
                data={data}
                options={{
                  legend: {
                    display: false,
                  },
                }}
              />
            </GraphCard>
            <StandardText data={standardTextExample} />
          </div>
        );
      }
      case StrategyTypes.Centrelink: {
        return (
          <div>
            <StatisticItem {...statistic} title={'Centrelink income'} />
            <GraphCard>
              <GraphTitle>
                <Icon type="info-circle" theme="filled" />
                Superannuation balance
              </GraphTitle>
              <Line
                data={data}
                options={{
                  legend: {
                    display: false,
                  },
                }}
              />
            </GraphCard>
            <StandardText data={standardTextExample} />
          </div>
        );
      }
      default:
        return <div>No support for this type {{ type }}</div>;
    }
  }
}

export default StrategyInformation;
