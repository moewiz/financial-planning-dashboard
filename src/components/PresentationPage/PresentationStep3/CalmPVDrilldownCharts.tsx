import React from 'react';
import { calmPVDrillDownData } from './drilldownData';
import { ChartBlock } from './styled';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';

const TaxDrilldownCharts = (props: { retirementYear: number; currentDrilldown: number; shouldShow: boolean }) => {
  const { retirementYear, shouldShow } = props;
  const data = (calmPVDrillDownData as any)[retirementYear];
  if (!shouldShow) {
    return null;
  }

  return (
    <ChartBlock hidden={false}>
      <GraphPresentation
        type={GraphType.Bar}
        data={data.calmpv}
        redraw
        options={{
          legend: {
            display: true,
            position: 'bottom',
          },
        }}
      />
    </ChartBlock>
  );
};

export default TaxDrilldownCharts;
