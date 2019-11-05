import React from 'react';
import { netAssetsDrillDownData } from './drilldownData';
import { ChartBlock } from './styled';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';
import numeral from "numeral";

const NetAssetsDrilldownCharts = (props: {
  retirementYear: number;
  currentDrilldown: number;
  shouldShow?: boolean;
}) => {
  const { retirementYear, currentDrilldown, shouldShow } = props;
  const data = (netAssetsDrillDownData as any)[retirementYear];
  if (!shouldShow) {
    return null;
  }

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
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: (value: any, index: any, values: any) => {
                      return numeral(Math.round(value * 100) / 100).format('$0,0.[00]');
                    },
                  },
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
