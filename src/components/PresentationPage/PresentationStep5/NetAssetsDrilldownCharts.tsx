import React from 'react';
import numeral from 'numeral';
import {
  netAssetsDrillDownData,
  netAssetsDrillDownDataWithLifeEvent,
  netAssetsDrillDownDataWithoutSalarySatisfy,
  netAssetsDrillDownDataWOSalarySatisfyWLifeEvent,
  netAssetsDrillDownDataWOSalarySatisfyNInsuranceWLifeEvent,
} from './drilldownData';
import { ChartBlockDrillDown } from '../PresentationStep3/styled';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';

const getNetAssetChartData = (hasLifeEvent: boolean, retirementYear: number, checkList?: any) => {
  if (!(checkList as any)['Salary Sacrifice'] && !(checkList as any)['Insurance'] && hasLifeEvent) {
    return (netAssetsDrillDownDataWOSalarySatisfyNInsuranceWLifeEvent as any)[retirementYear];
  }

  if (!(checkList as any)['Salary Sacrifice'] && hasLifeEvent) {
    return (netAssetsDrillDownDataWOSalarySatisfyWLifeEvent as any)[retirementYear];
  }

  if (!(checkList as any)['Salary Sacrifice']) {
    return (netAssetsDrillDownDataWithoutSalarySatisfy as any)[retirementYear];
  }

  if (hasLifeEvent) {
    // return (netAssetsDrillDownDataWithLifeEvent as any)[retirementYrs];
    return (netAssetsDrillDownData as any)[retirementYear];
  }

  return (netAssetsDrillDownData as any)[retirementYear];
};

const NetAssetsDrilldownCharts = (props: {
  retirementYear: number;
  currentDrilldown: number;
  shouldShow?: boolean;
  hasLifeEvent?: boolean;
  checkList?: any;
}) => {
  const { retirementYear, currentDrilldown, shouldShow, hasLifeEvent = false, checkList = {} } = props;
  if (!shouldShow) {
    return null;
  }

  const data = getNetAssetChartData(hasLifeEvent, retirementYear, checkList);

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
