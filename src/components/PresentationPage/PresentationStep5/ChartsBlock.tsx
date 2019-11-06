import React, { useState } from 'react';
import { get } from 'lodash';

import { ChartBlockLeft, ChartBlockRight, ChartsBlockWrapper, ChartBlockTitle } from '../PresentationStep3/styled';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';
import { loadGraphData } from '../../StrategyPage/StrategyHeader';
import DrilldownChart from './DrilldownChart';

const configNetAssets = {
  datasets: [
    {
      dataIndex: 'current',
      label: 'Current',
      fill: false,
      lineTension: 0.2,
      borderColor: '#00BCD4', // #FF5722
    },
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: false,
      lineTension: 0.2,
      borderColor: '#FF5722',
    },
  ],
};
const cashflowConfig = {
  datasets: [
    {
      dataIndex: 'current',
      label: 'Current',
      fill: true,
      borderColor: '#00BCD4',
    },
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: true,
      borderColor: '#FF5722',
    },
  ],
};
const taxConfig = {
  datasets: [
    {
      dataIndex: 'current',
      label: 'Current',
      fill: true,
      borderColor: '#00BCD4',
    },
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: true,
      borderColor: '#FF5722',
    },
  ],
};
const calmPVConfig = {
  datasets: [
    {
      type: 'line',
      dataIndex: 'expenditure',
      label: 'Expenditure',
      fill: false,
      borderColor: '#FF5722',
      backgroundColor: '#FF5722',
      pointBorderColor: '#FF5722',
      pointBackgroundColor: '#FF5722',
      pointHoverBackgroundColor: '#FF5722',
      pointHoverBorderColor: '#FF5722',
    },
    {
      type: 'line',
      dataIndex: 'income',
      label: 'Income',
      fill: false,
      borderColor: '#ffff00',
      backgroundColor: '#ffff00',
      pointBorderColor: '#ffff00',
      pointBackgroundColor: '#ffff00',
      pointHoverBackgroundColor: '#ffff00',
      pointHoverBorderColor: '#ffff00',
    },
    {
      type: 'bar',
      dataIndex: 'netAssets',
      label: 'Net Assets',
      fill: false,
      borderColor: '#71B37C',
      backgroundColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
    },
  ],
};

const calmPVConfigWithoutSalarySarisfy = {
  datasets: [
    {
      type: 'line',
      dataIndex: 'expenditure',
      label: 'Expenditure',
      fill: false,
      borderColor: '#FF5722',
      backgroundColor: '#FF5722',
      pointBorderColor: '#FF5722',
      pointBackgroundColor: '#FF5722',
      pointHoverBackgroundColor: '#FF5722',
      pointHoverBorderColor: '#FF5722',
    },
    {
      type: 'line',
      dataIndex: 'inflowCapital',
      label: 'Inflow + Capital',
      fill: false,
      borderColor: '#ffff00',
      backgroundColor: '#ffff00',
      pointBorderColor: '#ffff00',
      pointBackgroundColor: '#ffff00',
      pointHoverBackgroundColor: '#ffff00',
      pointHoverBorderColor: '#ffff00',
    },
    {
      type: 'bar',
      dataIndex: 'netAssets',
      label: 'Net Assets',
      fill: false,
      borderColor: '#71B37C',
      backgroundColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
    },
  ],
};

const calmPVConfigWithoutSalarySarisfyNInsuranceWithLifeEvent = {
  datasets: [
    {
      type: 'line',
      dataIndex: 'expenditure',
      label: 'Expenditure',
      fill: false,
      borderColor: '#FF5722',
      backgroundColor: '#FF5722',
      pointBorderColor: '#FF5722',
      pointBackgroundColor: '#FF5722',
      pointHoverBackgroundColor: '#FF5722',
      pointHoverBorderColor: '#FF5722',
    },
    {
      type: 'line',
      dataIndex: 'incomeCapital',
      label: 'Inflow + Capital Drawdown',
      fill: false,
      borderColor: '#ffff00',
      backgroundColor: '#ffff00',
      pointBorderColor: '#ffff00',
      pointBackgroundColor: '#ffff00',
      pointHoverBackgroundColor: '#ffff00',
      pointHoverBorderColor: '#ffff00',
    },
    {
      type: 'bar',
      dataIndex: 'netAssets',
      label: 'Net Assets',
      fill: false,
      borderColor: '#71B37C',
      backgroundColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
    },
  ],
};

const ChartsBlock = (props: { chartsData: any; retirementYear?: number; hasLifeEvent?: boolean; checkList?: any }) => {
  const { chartsData, retirementYear = 60, hasLifeEvent = false, checkList = {} } = props;
  const [chartIndex, setChartIndex] = useState<number>(-1);
  let calmPVConfigFinal = calmPVConfig;
  if (!(checkList as any)['Salary Sacrifice']) {
    calmPVConfigFinal = calmPVConfigWithoutSalarySarisfy;
  }

  if (!(checkList as any)['Salary Sacrifice'] && !(checkList as any)['Insurance'] && hasLifeEvent) {
    calmPVConfigFinal = calmPVConfigWithoutSalarySarisfyNInsuranceWithLifeEvent;
  }

  return (
    <>
      {chartIndex > -1 ? (
        <DrilldownChart
          index={chartIndex}
          back={() => setChartIndex(-1)}
          retirementYear={retirementYear}
          hasLifeEvent={hasLifeEvent}
          checkList={checkList}
        />
      ) : (
        <ChartsBlockWrapper>
          <ChartBlockLeft onClick={() => setChartIndex(0)}>
            <ChartBlockTitle>Net assets</ChartBlockTitle>
            <GraphPresentation
              type={GraphType.Line}
              data={loadGraphData(configNetAssets)(get(chartsData, 'netAssetsChartData'))}
              options={{
                legend: {
                  display: true,
                  position: 'bottom',
                },
              }}
            />
          </ChartBlockLeft>
          <ChartBlockRight onClick={() => setChartIndex(1)}>
            <ChartBlockTitle>Cashflow</ChartBlockTitle>
            <GraphPresentation
              type={GraphType.Bar}
              data={loadGraphData(cashflowConfig)(get(chartsData, 'cashflowChartData'))}
              options={{
                legend: {
                  display: true,
                  position: 'bottom',
                },
              }}
            />
          </ChartBlockRight>
          <ChartBlockLeft onClick={() => setChartIndex(2)}>
            <ChartBlockTitle>Tax</ChartBlockTitle>
            <GraphPresentation
              type={GraphType.Bar}
              data={loadGraphData(taxConfig)(get(chartsData, 'taxChartData'))}
              options={{
                legend: {
                  display: true,
                  position: 'bottom',
                },
              }}
            />
          </ChartBlockLeft>
          <ChartBlockRight onClick={() => setChartIndex(3)}>
            <ChartBlockTitle>CALM PV</ChartBlockTitle>
            <GraphPresentation
              type={GraphType.Bar}
              data={loadGraphData(calmPVConfigFinal)(get(chartsData, 'calmPVChartData'))}
              options={{
                legend: {
                  display: true,
                  position: 'bottom',
                },
              }}
            />
          </ChartBlockRight>
        </ChartsBlockWrapper>
      )}
    </>
  );
};

export default ChartsBlock;
