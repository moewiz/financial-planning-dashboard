import React from 'react';
import { cashFlowDrillDownData } from './drilldownData';
import { ChartBlockDrillDown } from './styled';
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
      <ChartBlockDrillDown hidden={currentDrilldown !== 0}>
        <GraphPresentation
          type={GraphType.Bar}
          data={data.income}
          redraw
          height={470}
          options={{
            legend: {
              display: true,
              position: 'bottom',
            },
          }}
        />
      </ChartBlockDrillDown>
      <ChartBlockDrillDown hidden={currentDrilldown !== 1}>
        <GraphPresentation
          type={GraphType.Bar}
          data={data.expenses}
          redraw
          height={470}
          options={{
            legend: {
              display: true,
              position: 'bottom',
            },
          }}
        />
      </ChartBlockDrillDown>
      <ChartBlockDrillDown hidden={currentDrilldown !== 2}>
        <GraphPresentation
          type={GraphType.Bar}
          data={data.netIncome}
          redraw
          height={470}
          options={{
            legend: {
              display: true,
              position: 'bottom',
            },
          }}
        />
      </ChartBlockDrillDown>
    </>
  );
};

export default CashflowDrilldownCharts;
