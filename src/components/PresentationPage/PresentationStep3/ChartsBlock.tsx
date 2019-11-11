import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import numeral from 'numeral';
import { ChartBlockLeft, ChartBlockRight, ChartBlockTitle, ChartsBlockWrapper } from './styled';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';
import { loadGraphData } from '../../StrategyPage/StrategyHeader';
import DrilldownChart from './DrilldownChart';

const configNetAssets = {
  datasets: [
    {
      dataIndex: 'value',
      label: 'Value',
      fill: false,
      lineTension: 0.2,
      borderColor: '#00BCD4',
    },
  ],
};
const cashflowConfig = {
  datasets: [
    {
      dataIndex: 'value',
      label: 'Value',
      fill: true,
      borderColor: '#00BCD4',
    },
  ],
};
const taxConfig = {
  datasets: [
    {
      dataIndex: 'value',
      label: 'Value',
      fill: true,
      borderColor: '#cfaeff',
    },
  ],
};
const calmPVConfig = {
  datasets: [
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
    {
      type: 'bar',
      dataIndex: 'expenditure',
      label: 'Expenditure',
      fill: false,
      borderColor: '#FF5722',
    },
    {
      type: 'bar',
      dataIndex: 'inflow',
      label: 'Cashflow',
      fill: false,
      borderColor: '#fffb03',
    },
    {
      type: 'line',
      dataIndex: 'total',
      label: 'Expenditure met',
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
    },
  ],
};

const calmPVConfigWithLifeEvent = {
  datasets: [
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
      label: 'income',
      fill: false,
      borderColor: '#fffb03',
      backgroundColor: '#fffb03',
      pointBorderColor: '#fffb03',
      pointBackgroundColor: '#fffb03',
      pointHoverBackgroundColor: '#fffb03',
      pointHoverBorderColor: '#fffb03',
    },
  ],
};

const ticks = {
  min: 0,
  callback: (value: any, index: any, values: any) => {
    return numeral(Math.round(value * 100) / 100).format('$0,0.[00]');
  },
};

const startWithZeroConfig = (max: number, stepSize: number) => ({
  scales: {
    yAxes: [
      {
        ticks: {
          ...ticks,
          max,
          stepSize,
        },
      },
    ],
  },
});

const formatNumber = (value: any, index: any, values: any) => {
  return numeral(Math.round(value * 100) / 100).format('$0,0.[00]');
};

const ChartsBlock = (props: { chartsData: any; retirementYear?: number; hasLifeEvent?: boolean }) => {
  const { chartsData, retirementYear = 60, hasLifeEvent = false } = props;
  const [chartIndex, setChartIndex] = useState<number>(-1);

  return (
    <>
      {chartIndex > -1 ? (
        <DrilldownChart
          index={chartIndex}
          back={() => setChartIndex(-1)}
          retirementYear={retirementYear}
          hasLifeEvent={hasLifeEvent}
        />
      ) : (
        <ChartsBlockWrapper>
          <ChartBlockLeft onClick={() => setChartIndex(0)}>
            <ChartBlockTitle>Net assets</ChartBlockTitle>
            <GraphPresentation
              type={GraphType.Line}
              options={{
                maintainAspectRatio: true,
                ...startWithZeroConfig(2400000, 400000),
              }}
              data={loadGraphData(configNetAssets)(get(chartsData, 'netAssetsChartData'))}
              redraw
            />
          </ChartBlockLeft>
          <ChartBlockRight onClick={() => setChartIndex(1)}>
            <ChartBlockTitle>Cashflow</ChartBlockTitle>
            <GraphPresentation
              options={{
                maintainAspectRatio: true,
                ...startWithZeroConfig(120000, 20000),
              }}
              type={GraphType.Bar}
              data={loadGraphData(cashflowConfig)(get(chartsData, 'cashflowChartData'))}
              redraw
            />
          </ChartBlockRight>
          <ChartBlockLeft onClick={() => setChartIndex(2)}>
            <ChartBlockTitle>Tax</ChartBlockTitle>
            <GraphPresentation
              options={{
                maintainAspectRatio: true,
                ...startWithZeroConfig(60000, 10000),
              }}
              type={GraphType.Bar}
              data={loadGraphData(taxConfig)(get(chartsData, 'taxChartData'))}
            />
          </ChartBlockLeft>
          <ChartBlockRight onClick={() => setChartIndex(3)}>
            <ChartBlockTitle>CALM PV</ChartBlockTitle>
            <GraphPresentation
              type={GraphType.Bar}
              data={loadGraphData(hasLifeEvent ? calmPVConfigWithLifeEvent : calmPVConfig)(
                get(chartsData, 'calmPVChartData'),
              )}
              redraw
              options={{
                maintainAspectRatio: true,
                ...startWithZeroConfig(1200000, 150000),
              }}
            />
          </ChartBlockRight>
        </ChartsBlockWrapper>
      )}
    </>
  );
};

export default ChartsBlock;
