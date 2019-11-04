import React from 'react';
import { netAssetsDrillDownData } from './drilldownData';
import { ChartBlock } from './styled';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';

const NetAssetsDrilldownCharts = (props: { retirementYear: number; currentDrilldown: number }) => {
  const { retirementYear, currentDrilldown } = props;
  const data = (netAssetsDrillDownData as any)[retirementYear];

  return (
    <>
      <ChartBlock hidden={currentDrilldown !== 0}>
        <GraphPresentation
          type={GraphType.Bar}
          data={data.assets}
          redraw
          options={{
            legend: {
              display: true,
              position: 'bottom',
            },
            scales: {
              xAxes: [
                {
                  stacked: true,
                },
              ],
              yAxes: [
                {
                  stacked: true,
                },
              ],
            },
          }}
        />
      </ChartBlock>
      <ChartBlock hidden={currentDrilldown !== 1}>
        <GraphPresentation
          type={GraphType.Line}
          data={data.liabilities}
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
          type={GraphType.Line}
          data={data.netAssets}
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

export default NetAssetsDrilldownCharts;
