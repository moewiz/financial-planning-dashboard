import React from 'react';
import { Col, Row } from 'antd';
import GraphContainer, { GraphType } from './Graph/GraphContainer';

const data1 = {
  labels: ['19', '20', '21', '22', '23', '24', '25'],
  datasets: [
    {
      label: 'a',
      fill: false,
      lineTension: 0.6,
      // backgroundColor: '#fff',
      borderColor: '#FF5722',
      // borderCapStyle: 'butt',
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: 'miter',
      // pointBorderColor: 'rgba(75,192,192,1)',
      // pointBackgroundColor: '#fff',
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      // pointHoverBorderColor: 'rgba(220,220,220,1)',
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: [30000, 200000, 80000, 155000, 166000, 220000, 380000],
    },
    {
      label: 'b',
      fill: false,
      lineTension: 0.6,
      // backgroundColor: '#fff',
      borderColor: '#00BCD4',
      // borderCapStyle: 'butt',
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: 'miter',
      // pointBorderColor: 'rgba(75,192,192,1)',
      // pointBackgroundColor: '#fff',
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      // pointHoverBorderColor: 'rgba(220,220,220,1)',
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: [30000, 140000, 120000, 166000, 180000, 191000, 256000],
    },
    {
      label: 'c',
      fill: false,
      lineTension: 0.6,
      // backgroundColor: '#fff',
      borderColor: '#FFC107',
      // borderCapStyle: 'butt',
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: 'miter',
      // pointBorderColor: 'rgba(75,192,192,1)',
      // pointBackgroundColor: '#fff',
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      // pointHoverBorderColor: 'rgba(220,220,220,1)',
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: [30000, 80000, 50000, 70000, 60000, 90000, 100000],
    },
  ],
};
const data2 = {
  labels: ['19', '20', '21', '22', '23', '24', '25'],
  datasets: [
    {
      label: 'a',
      fill: false,
      borderColor: '#FF5722',
      steppedLine: true,
      data: [165000, 159000, 120000, 165000, 235000, 120000, 140000],
    },
    {
      label: 'b',
      fill: false,
      borderColor: '#00BCD4',
      steppedLine: true,
      data: [85000, 45000, 70000, 65000, 100000, 150000, 135000],
    },
  ],
};
const data3 = {
  labels: ['19', '20', '21', '22', '23', '24', '25'],
  datasets: [
    {
      label: 'a',
      fill: false,
      lineTension: 0,
      borderColor: '#FF5722',
      data: [65000, 59000, 80000, 91000, 135000, 120000, 140000],
    },
  ],
};

const data4 = {
  labels: ['19', '20', '21', '22', '23', '24', '25'],
  datasets: [
    {
      label: 'a',
      type: 'bubble',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(103, 58, 183, 0.8)',
      pointBorderColor: 'rgba(103, 58, 183, 1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(103, 58, 183, 1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65000, 59000, 80000, 91000, 135000, 120000, 140000],
    },
    {
      label: 'b',
      type: 'line',
      fill: false,
      borderColor: '#FF5722',
      backgroundColor: 'rgba(218,83,79, .7)',
      pointRadius: 0,
      data: [65000, 59000, 80000, 91000, 135000, 120000, 140000],
    },
  ],
};

const StrategyHeader = () => {
  return (
    <Row gutter={32}>
      <Col span={6}>
        <GraphContainer type={GraphType.Line} name="Name 1" data={data1} flipping={false} />
      </Col>
      <Col span={6}>
        <GraphContainer type={GraphType.Line} name="Name 2" data={data2} flipping={false} />
      </Col>
      <Col span={6}>
        <GraphContainer type={GraphType.Line} name="Name 3" data={data3} flipping={false} />
      </Col>
      <Col span={6}>
        <GraphContainer type={GraphType.Line} name="Name 4" data={data4} flipping={false} />
      </Col>
    </Row>
  );
};

export default StrategyHeader;
