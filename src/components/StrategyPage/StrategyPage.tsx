import React, { useState } from 'react';
import { Drawer } from 'antd';
import StrategyHeader from './StrategyHeader';
import StrategyContainer from './StrategyContainer';
import { StrategyTypes } from '../../enums/strategies';

interface StrategyPageProps {
  clientId: number;
}

const StrategyPage = (props: StrategyPageProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <StrategyHeader />
      <StrategyContainer
        type={StrategyTypes.Superannuation}
        information={{
          statistic: {
            total: 20140404,
            isIncrease: true,
            delta: 21640,
            subValue: 69,
          },
          graph: {},
          expandable: {},
        }}
        strategies={[]}
      />
      <StrategyContainer
        type={StrategyTypes.Pensions}
        information={{
          statistic: {
            total: 20140404,
            isIncrease: true,
            delta: 21640,
            subValue: 69,
          },
          graph: {},
          expandable: {},
        }}
        strategies={[]}
      />
      <StrategyContainer
        type={StrategyTypes.Investments}
        information={{
          statistic: {
            total: 20140404,
            isIncrease: true,
            delta: 21640,
            subValue: 69,
          },
          graph: {},
          expandable: {},
        }}
        strategies={[]}
      />
      <StrategyContainer
        type={StrategyTypes.Debt}
        information={{
          statistic: {
            total: 20140404,
            isIncrease: true,
            delta: 21640,
            subValue: 69,
          },
          graph: {},
          expandable: {},
        }}
        strategies={[]}
      />
      <StrategyContainer
        type={StrategyTypes.Centrelink}
        information={{
          statistic: {
            total: 20140404,
            isIncrease: true,
            delta: 21640,
            subValue: 69,
          },
          graph: {},
          expandable: {},
        }}
        strategies={[]}
      />
      <Drawer title="Your insurance needs" width={720} onClose={() => setVisible(false)} visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default StrategyPage;
