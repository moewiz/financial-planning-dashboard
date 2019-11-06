import React, { useEffect, useState } from 'react';
import { get } from 'lodash';

import { ChartBlockLeft, ChartBlockRight, ChartsBlockWrapper } from '../PresentationStep3/styled';
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
      borderColor: '#FF5722',
    },
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: false,
      lineTension: 0.2,
      borderColor: '#5B9BD5',
    },
  ],
};
const cashflowConfig = {
  datasets: [
    {
      dataIndex: 'current',
      label: 'Current',
      fill: true,
      borderColor: '#FF5722',
    },
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: true,
      borderColor: '#5B9BD5',
    },
  ],
};
const taxConfig = {
  datasets: [
    {
      dataIndex: 'current',
      label: 'Current',
      fill: true,
      borderColor: '#FF5722',
    },
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: true,
      borderColor: '#5B9BD5',
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
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
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
      borderColor: '#5B9BD5',
      backgroundColor: '#5B9BD5',
      hoverBackgroundColor: '#5B9BD5',
      hoverBorderColor: '#5B9BD5',
    },
  ],
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
            <GraphPresentation
              type={GraphType.Line}
              data={loadGraphData(configNetAssets)(get(chartsData, 'netAssetsChartData'))}
            />
          </ChartBlockLeft>
          <ChartBlockRight onClick={() => setChartIndex(1)}>
            <GraphPresentation
              type={GraphType.Bar}
              data={loadGraphData(cashflowConfig)(get(chartsData, 'cashflowChartData'))}
            />
          </ChartBlockRight>
          <ChartBlockLeft onClick={() => setChartIndex(2)}>
            <GraphPresentation type={GraphType.Bar} data={loadGraphData(taxConfig)(get(chartsData, 'taxChartData'))} />
          </ChartBlockLeft>
          <ChartBlockRight onClick={() => setChartIndex(3)}>
            <GraphPresentation
              type={GraphType.Bar}
              data={loadGraphData(calmPVConfig)(get(chartsData, 'calmPVChartData'))}
            />
          </ChartBlockRight>
        </ChartsBlockWrapper>
      )}
    </>
  );
};

export default ChartsBlock;
