import React from 'react';
import { cashFlowDrillDownData } from './drilldownData';
import { ChartBlock } from './styled';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';

const CashflowDrilldownCharts = (props: { retirementYear: number; currentDrilldown: number; shouldShow: boolean }) => {
  const { retirementYear, currentDrilldown, shouldShow } = props;
  const data = (cashFlowDrillDownData as any)[retirementYear];
  if (!shouldShow) {
    return null;
  }

  return (
    <>
      <ChartBlock hidden={currentDrilldown !== 0}>
        <GraphPresentation
          type={GraphType.Bar}
          data={data.income}
          redraw
          options={{
            legend: {
              display: true,
              position: 'bottom',
            },
          }}
        />
      </ChartBlock>
      <ChartBlock hidden={currentDrilldown !== 1}>
        <GraphPresentation
          type={GraphType.Bar}
          data={data.expenses}
          redraw
          options={{
            legend: {
              display: true,
              position: 'bottom',
            },
          }}
        />
      </ChartBlock>
      <ChartBlock hidden={currentDrilldown !== 2}>
        <GraphPresentation
          type={GraphType.Bar}
          data={data.netIncome}
          redraw
          options={{
            legend: {
              display: true,
              position: 'bottom',
            },
          }}
        />
      </ChartBlock>
    </>
  );
};

export default CashflowDrilldownCharts;
