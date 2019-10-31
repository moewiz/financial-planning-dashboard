import React, { useEffect, useState } from 'react';
import { get } from 'lodash';

import { ChartBlock, ChartsBlockWrapper } from './styled';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';
import { loadGraphData } from '../../StrategyPage/StrategyHeader';
import DrilldownChart from './DrilldownChart';

const netAssetsChartData = {
  xAxis: ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
  value: [1050000, 1122713, 1199330, 1280642, 1369331, 1355235, 1340951, 1326499, 1311901, 1295469],
};
const cashflowChartData = {
  xAxis: ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
  value: [82675, 84998, 87452, 92415, 73932, 75199, 76495, 77821, 79178, 80565],
};
const taxChartData = {
  xAxis: ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
  value: [33289, 35019, 36758, 36135, 0, 0, 0, 0, 0, 0],
};
const calmPVChartData = {
  xAxis: [
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
  ],
  netAssets: [
    600000,
    629710,
    660561,
    693132,
    729664,
    671478,
    614377,
    558347,
    503378,
    448066,
    392256,
    346274,
    305315,
    267300,
    232063,
    197955,
    163840,
    129452,
    94668,
    59479,
  ],
  expenditure: [
    106368,
    109396,
    112465,
    113204,
    73676,
    74929,
    76210,
    77520,
    78860,
    80231,
    81633,
    83067,
    84534,
    86034,
    88403,
    90531,
    92638,
    94698,
    96808,
    100316,
  ],
  inflow: [
    120000,
    124200,
    128547,
    133046,
    0,
    0,
    0,
    0,
    0,
    0,
    13279,
    20659,
    25480,
    30226,
    33640,
    35227,
    36407,
    37344,
    38305,
    39292,
  ],
  total: [
    120000,
    124200,
    128547,
    133046,
    73676,
    74929,
    76210,
    77520,
    78860,
    80231,
    81633,
    83067,
    84534,
    86034,
    88403,
    90531,
    92638,
    94698,
    96808,
    100316,
  ],
};
const configNetAssets = {
  datasets: [
    {
      dataIndex: 'value',
      label: 'Value',
      fill: false,
      lineTension: 0.2,
      borderColor: '#FF5722',
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
      label: 'Inflow',
      fill: false,
      borderColor: '#fffb03',
    },
    {
      type: 'line',
      dataIndex: 'total',
      label: 'Total inflow',
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

const ChartsBlock = (props: { chartsData: any }) => {
  const { chartsData } = props;
  const [chartIndex, setChartIndex] = useState<number>(-1);

  return (
    <>
      {chartIndex > -1 ? (
        <>
          <DrilldownChart index={chartIndex} back={() => setChartIndex(-1)} />
        </>
      ) : (
        <ChartsBlockWrapper>
          <ChartBlock onClick={() => setChartIndex(0)}>
            <GraphPresentation
              type={GraphType.Line}
              data={loadGraphData(configNetAssets)(get(chartsData, 'netAssetsChartData'))}
            />
          </ChartBlock>
          <ChartBlock onClick={() => setChartIndex(1)}>
            <GraphPresentation
              type={GraphType.Bar}
              data={loadGraphData(cashflowConfig)(get(chartsData, 'cashflowChartData'))}
            />
          </ChartBlock>
          <ChartBlock onClick={() => setChartIndex(2)}>
            <GraphPresentation type={GraphType.Bar} data={loadGraphData(taxConfig)(get(chartsData, 'taxChartData'))} />
          </ChartBlock>
          <ChartBlock onClick={() => setChartIndex(3)}>
            <GraphPresentation
              type={GraphType.Bar}
              data={loadGraphData(calmPVConfig)(get(chartsData, 'calmPVChartData'))}
            />
          </ChartBlock>
        </ChartsBlockWrapper>
      )}
    </>
  );
};

export default ChartsBlock;
