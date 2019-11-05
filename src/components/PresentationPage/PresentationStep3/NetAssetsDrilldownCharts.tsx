import React from 'react';
import numeral from 'numeral';
import { netAssetsDrillDownData, netAssetsDrillDownDataWithLifeEvent } from './drilldownData';
import { ChartBlockDrillDown } from './styled';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';

const NetAssetsDrilldownCharts = (props: {
  retirementYear: number;
  currentDrilldown: number;
  shouldShow?: boolean;
  hasLifeEvent?: boolean;
}) => {
  const { retirementYear, currentDrilldown, shouldShow, hasLifeEvent } = props;
  const data = hasLifeEvent
    ? (netAssetsDrillDownDataWithLifeEvent as any)[retirementYear]
    : (netAssetsDrillDownData as any)[retirementYear];
  if (!shouldShow) {
    return null;
  }

  return (
    <>
      <ChartBlockDrillDown hidden={currentDrilldown !== 0}>
        <GraphPresentation
          type={GraphType.Bar}
          data={data.assets}
          redraw
          height={470}
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
      </ChartBlockDrillDown>
      <ChartBlockDrillDown hidden={currentDrilldown !== 1}>
        <GraphPresentation
          type={GraphType.Line}
          data={data.liabilities}
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
          type={GraphType.Line}
          data={data.netAssets}
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

export default NetAssetsDrilldownCharts;
