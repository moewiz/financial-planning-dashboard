import React from 'react';
import numeral from 'numeral';
import { taxFlowDrillDownData, taxFlowDrillDownDataWithLifeEvent } from './drilldownData';
import { ChartBlockDrillDown } from '../PresentationStep3/styled';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';

const stackedConfig = {
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
};

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
        options={stackedConfig}
      />
    </ChartBlockDrillDown>
  );
};

export default TaxDrilldownCharts;
