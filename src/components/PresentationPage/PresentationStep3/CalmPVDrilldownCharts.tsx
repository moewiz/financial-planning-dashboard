import React from 'react';
import { calmPVDrillDownData } from './drilldownData';
import { ChartBlockDrillDown } from './styled';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';

const TaxDrilldownCharts = (props: { retirementYear: number; currentDrilldown: number; shouldShow: boolean }) => {
  const { retirementYear, shouldShow } = props;
  const data = (calmPVDrillDownData as any)[retirementYear];
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
