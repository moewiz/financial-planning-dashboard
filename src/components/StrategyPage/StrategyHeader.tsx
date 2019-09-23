import React from 'react';
import { Col, Row } from 'antd';
import { get } from 'lodash';

import GraphContainer, { GraphType } from './Graph/GraphContainer';
import { GraphData } from '../../reducers/client';

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
      borderColor: '#00BCD4',
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
      backgroundColor: '#FF5722',
    },
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: true,
      borderColor: '#00BCD4',
      backgroundColor: '#00BCD4',
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
      borderColor: '#FF5722',
    },
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: false,
      lineTension: 0,
      borderColor: '#00BCD4',
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
      borderColor: '#FF5722',
    },
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: false,
      lineTension: 0,
      borderColor: '#00BCD4',
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

const loadGraphData = (config: GraphConfig) => (
  data: GraphData,
): {
  labels?: any[];
  datasets: object[];
} => {
  return {
    labels: get(data, 'xAxis', []),
    datasets: config.datasets.map((dataset) => {
      return {
        ...dataset,
        data: get(data, dataset.dataIndex, []),
      };
    }),
  };
};

const StrategyHeader = (props: StrategyHeaderProps) => {
  const { netAssets, cashflowComparisons, tax, retirementFunding } = props;

  return (
    <Row gutter={32}>
      <Col span={6}>
        <GraphContainer
          type={GraphType.Line}
          name="Net assets"
          data={loadGraphData(configNetAssets)(netAssets)}
          flipping={false}
        />
      </Col>
      <Col span={6}>
        <GraphContainer
          type={GraphType.Bar}
          name="Cashflow comparisons"
          data={loadGraphData(cashflowConfig)(cashflowComparisons)}
          flipping={false}
        />
      </Col>
      <Col span={6}>
        <GraphContainer type={GraphType.Line} name="Tax" data={loadGraphData(taxConfig)(tax)} flipping={false} />
      </Col>
      <Col span={6}>
        <GraphContainer
          type={GraphType.Line}
          name="Retirement Funding"
          data={loadGraphData(retirementFundingConfig)(retirementFunding)}
          flipping={false}
        />
      </Col>
    </Row>
  );
};

export default StrategyHeader;
