import React, { useState } from 'react';
import { get } from 'lodash';
import { Drawer } from 'antd';
import StrategyHeader from './StrategyHeader';
import StrategyContainer from './StrategyContainer';
import { StrategyTypes } from '../../enums/strategies';
import { StrategyPageWrapper } from './styled';
import { StrategyEntry } from '../../reducers/client';

interface StrategyPageProps {
  clientId: number;

  pageData: StrategyEntry;
}

const StrategyPage = (props: StrategyPageProps) => {
  const [visible, setVisible] = useState(false);
  const { pageData } = props;
  const superannuation = get(pageData, 'superannuation');
  const standardText = [
    {
      text: 'Pension funds will be invested in line with {{0}} risk profile',
      params: ['xx'],
    },
    {
      text: 'Product fees of {{0}} factored in pension value',
      params: ['xx%'],
    },
    {
      text: 'Income set to meet required expenses of {{0}} per annum',
      params: ['$xx,xx'],
    },
  ];

  return (
    <StrategyPageWrapper>
      <StrategyHeader />
      {superannuation && (
        <StrategyContainer
          type={StrategyTypes.Superannuation}
          information={superannuation}
          strategies={superannuation.strategies}
        />
      )}
      <StrategyContainer
        type={StrategyTypes.Pensions}
        information={{
          kpi: [
            {
              total: 20140404,
              isIncrease: true,
              delta: 21640,
              subValue: 69,
            },
            {
              total: 20140404,
              isIncrease: true,
              delta: 21640,
              subValue: 69,
            },
          ],
          graph: {},
          standardText,
        }}
        strategies={[]}
      />
      <StrategyContainer
        type={StrategyTypes.Investments}
        information={{
          kpi: [
            {
              total: 20140404,
              isIncrease: true,
              delta: 21640,
              subValue: 69,
            },
            {
              total: 20140404,
              isIncrease: true,
              delta: 21640,
              subValue: 69,
            },
          ],
          graph: {},
          standardText,
        }}
        strategies={[]}
      />
      <StrategyContainer
        type={StrategyTypes.Debt}
        information={{
          kpi: [
            {
              total: 20140404,
              isIncrease: true,
              delta: 21640,
              subValue: 69,
            },
            {
              total: 20140404,
              isIncrease: true,
              delta: 21640,
              subValue: 69,
            },
          ],
          graph: {},
          standardText,
        }}
        strategies={[]}
      />
      <StrategyContainer
        type={StrategyTypes.Centrelink}
        information={{
          kpi: [
            {
              total: 20140404,
              isIncrease: true,
              delta: 21640,
              subValue: 69,
            },
            {
              total: 20140404,
              isIncrease: true,
              delta: 21640,
              subValue: 69,
            },
          ],
          graph: {},
          standardText,
        }}
        strategies={[]}
      />
      <Drawer title="Your insurance needs" width={720} onClose={() => setVisible(false)} visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </StrategyPageWrapper>
  );
};

export default StrategyPage;
