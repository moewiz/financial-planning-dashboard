import React, { PureComponent } from 'react';
import StatisticItem, { Statistic } from './StatisticItem';
import { StrategyTypes } from '../../enums/strategies';
import LineChart from './Graph/LineChart';
import StandardText from './StandardText';
import { StrategyInfoWrapper } from './styled';

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
          <StrategyInfoWrapper>
            <StatisticItem {...statistic} title={'Accumulation balance'} subTitle={'At retirement'} />
            <LineChart name="Superannuation balance" data={data} />
            <StandardText data={standardTextExample} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Pensions: {
        return (
          <StrategyInfoWrapper>
            <StatisticItem {...statistic} title={'Average pension income'} subTitle={'Per annum paid until'} />
            <LineChart name="Pension balance" data={data} />
            <StandardText data={standardTextExample} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Investments: {
        return (
          <StrategyInfoWrapper>
            <StatisticItem {...statistic} title={'Cash reserve'} subTitle={'At age'} />
            <LineChart name="Investment (non-super) balance" data={data} />
            <StandardText data={standardTextExample} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Debt: {
        return (
          <StrategyInfoWrapper>
            <StatisticItem
              {...statistic}
              title={'Total interest cost'}
              subTitle={'non-deductible debt over loan period'}
            />
            <LineChart name="Debt Value" data={data} />
            <StandardText data={standardTextExample} />
          </StrategyInfoWrapper>
        );
      }
      case StrategyTypes.Centrelink: {
        return (
          <StrategyInfoWrapper>
            <StatisticItem {...statistic} title={'Centrelink income'} />
            <LineChart name="Centrelink income" data={data} />
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
