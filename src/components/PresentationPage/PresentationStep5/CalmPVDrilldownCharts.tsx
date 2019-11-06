import React from 'react';
import { calmPVDrillDownData, calmPVDrillDownDataWithLifeEvent } from './drilldownData';
import { ChartBlockDrillDown } from '../PresentationStep3/styled';
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
    ? (calmPVDrillDownDataWithLifeEvent as any)[retirementYear]
    : (calmPVDrillDownData as any)[retirementYear];

  if (!shouldShow) {
    return null;
  }

  return (
    <ChartBlockDrillDown hidden={false}>
      <GraphPresentation
        type={GraphType.Bar}
        data={data.calmpv}
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
