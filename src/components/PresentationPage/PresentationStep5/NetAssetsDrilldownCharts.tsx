import React from 'react';
import numeral from 'numeral';
import _cloneDeep from 'lodash-es/cloneDeep';
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
    return _cloneDeep((netAssetsDrillDownDataWOSalarySatisfyNInsuranceWLifeEvent as any)[retirementYear]);
  }

  if (!(checkList as any)['Salary Sacrifice'] && hasLifeEvent) {
    return _cloneDeep((netAssetsDrillDownDataWOSalarySatisfyWLifeEvent as any)[retirementYear]);
  }

  if (!(checkList as any)['Salary Sacrifice']) {
    return _cloneDeep((netAssetsDrillDownDataWithoutSalarySatisfy as any)[retirementYear]);
  }

  if (hasLifeEvent) {
    // return (netAssetsDrillDownDataWithLifeEvent as any)[retirementYrs];
    return _cloneDeep((netAssetsDrillDownData as any)[retirementYear]);
  }

  return _cloneDeep((netAssetsDrillDownData as any)[retirementYear]);
};

const assetConfig = {
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
          max: 1800000,
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
        <GraphPresentation type={GraphType.Bar} data={data.assets} redraw height={470} options={assetConfig} />
      </ChartBlockDrillDown>
      <ChartBlockDrillDown hidden={currentDrilldown !== 1}>
        <GraphPresentation
          type={GraphType.Bar}
          data={data.liabilities}
          redraw
          height={470}
          options={{
            legend: {
              display: true,
              position: 'bottom',
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    max: 300000,
                    min: 0,
                  },
                },
              ],
            },
          }}
        />
      </ChartBlockDrillDown>
      <ChartBlockDrillDown hidden={currentDrilldown !== 2}>
        <GraphPresentation
          type={GraphType.Bar}
          data={data.netAssets}
          redraw
          height={470}
          options={{
            legend: {
              display: true,
              position: 'bottom',
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    max: 1600000,
                    min: 0,
                    step: 200000,
                  },
                },
              ],
            },
          }}
        />
      </ChartBlockDrillDown>
    </>
  );
};

export default NetAssetsDrilldownCharts;
