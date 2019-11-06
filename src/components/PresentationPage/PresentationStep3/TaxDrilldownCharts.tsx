import React from 'react';
import { taxFlowDrillDownData, taxFlowDrillDownDataWithLifeEvent } from './drilldownData';
import { ChartBlockDrillDown } from './styled';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';

const TaxDrilldownCharts = (props: {
  retirementYear: number;
  currentDrilldown: number;
  shouldShow: boolean;
  hasLifeEvent?: boolean;
}) => {
  const { retirementYear, shouldShow, hasLifeEvent } = props;
  const data = hasLifeEvent
    ? (taxFlowDrillDownDataWithLifeEvent as any)[retirementYear]
    : (taxFlowDrillDownData as any)[retirementYear];

  if (!shouldShow) {
    return null;
  }

  return (
    <ChartBlockDrillDown hidden={false}>
      <GraphPresentation
        type={GraphType.Bar}
        data={data.tax}
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
  );
};

export default TaxDrilldownCharts;
