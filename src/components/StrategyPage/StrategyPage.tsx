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
  const pension = get(pageData, 'pension');
  const investments = get(pageData, 'investments');
  const debt = get(pageData, 'debt');
  const centrelink = get(pageData, 'centrelink');
  const insurance = get(pageData, 'insurance');
  const estatePlanning = get(pageData, 'estatePlanning');

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
      {pension && (
        <StrategyContainer type={StrategyTypes.Pensions} information={pension} strategies={pension.strategies} />
      )}
      {investments && (
        <StrategyContainer
          type={StrategyTypes.Investments}
          information={investments}
          strategies={investments.strategies}
        />
      )}
      {debt && <StrategyContainer type={StrategyTypes.Debt} information={debt} strategies={debt.strategies} />}
      {centrelink && (
        <StrategyContainer
          type={StrategyTypes.Centrelink}
          information={centrelink}
          strategies={centrelink.strategies}
        />
      )}
      {insurance && (
        <StrategyContainer type={StrategyTypes.Insurance} information={insurance} strategies={insurance.strategies} />
      )}
      {estatePlanning && (
        <StrategyContainer
          type={StrategyTypes.EstatePlanning}
          information={estatePlanning}
          strategies={estatePlanning.strategies}
        />
      )}
      <Drawer title="Your insurance needs" width={720} onClose={() => setVisible(false)} visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </StrategyPageWrapper>
  );
};

export default StrategyPage;
