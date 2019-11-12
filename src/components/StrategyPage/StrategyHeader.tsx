import React from 'react';
import { Col, Row } from 'antd';
import { get } from 'lodash';

import numeral from 'numeral';
import GraphContainer, { GraphType } from './Graph/GraphContainer';
import { GraphData } from '../../reducers/client';

const configNetAssets = {
  datasets: [
    {
      dataIndex: 'current',
      label: 'Current',
      fill: false,
      lineTension: 0.2,
      borderColor: '#00BCD4',
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
      fill: false,
      lineTension: 0,
      borderColor: '#00BCD4',
    },
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: false,
      lineTension: 0,
      borderColor: '#FF5722',
    },
  ],
};

const retirementFundingConfig = {
  datasets: [
    {
      dataIndex: 'current',
      label: 'Current',
      fill: false,
      lineTension: 0,
      borderColor: '#00BCD4',
    },
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: false,
      lineTension: 0,
      borderColor: '#FF5722',
    },
  ],
};

interface StrategyHeaderProps {
  netAssets: GraphData;
  cashflowComparisons: GraphData;
  tax: GraphData;
  retirementFunding: GraphData;
}

interface DataSet {
  label: string;
  dataIndex: string;

  [key: string]: any;
}

interface GraphConfig {
  datasets: DataSet[];
}

export const loadGraphData = (config: GraphConfig) => (
  data: GraphData,
): {
  labels?: any[];
  datasets: object[];
} => {
  return {
    labels: get(data, 'xAxis', []),
    datasets: config.datasets.map((dataset: any) => {
      return {
        backgroundColor: dataset.borderColor,
        ...dataset,
        data: get(data, dataset.dataIndex, []),
      };
    }),
  };
};

const options = (max: number, min: number, stepSize: number) => ({
  scales: {
    yAxes: [
      {
        ticks: {
          // Include a dollar sign in the ticks
          max,
          min,
          stepSize,
          callback: (value: any, index: any, values: any) => {
            return numeral(Math.round(value * 100) / 100).format('$0,0.[00]');
          },
        },
      },
    ],
  },
});

const StrategyHeader = (props: StrategyHeaderProps) => {
  const { netAssets, cashflowComparisons, tax, retirementFunding } = props;

  return (
    <Row gutter={32}>
      <Col span={6}>
        <GraphContainer type={GraphType.Line} name="Net Assets" data={loadGraphData(configNetAssets)(netAssets)} />
      </Col>
      <Col span={6}>
        <GraphContainer
          type={GraphType.Bar}
          name="Cashflow"
          data={loadGraphData(cashflowConfig)(cashflowComparisons)}
          options={options(100000, 0, 20000)}
        />
      </Col>
      <Col span={6}>
        <GraphContainer
          type={GraphType.Bar}
          name="Net Tax"
          data={loadGraphData(taxConfig)(tax)}
          options={options(50000, 0, 10000)}
        />
      </Col>
      <Col span={6}>
        <GraphContainer
          type={GraphType.Line}
          name="Retirement Funding"
          data={loadGraphData(retirementFundingConfig)(retirementFunding)}
          options={options(1000000, 0, 200000)}
        />
      </Col>
    </Row>
  );
};

export default StrategyHeader;
