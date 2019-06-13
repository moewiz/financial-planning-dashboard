import React from 'react';
import { Icon } from 'antd';
import { Line } from 'react-chartjs-2';
import { GraphCard, GraphTitle } from '../styled';

interface GraphProps {
  name: string;
  data: {
    labels?: any[];
    datasets: object[];
  };
  options?: object;
}

const LineChart = (props: GraphProps) => {
  const { name, data } = props;

  return (
    <GraphCard>
      <GraphTitle>
        <Icon type="info-circle" theme="filled" />
        {name}
      </GraphTitle>
      <Line
        data={data}
        options={{
          legend: {
            display: false,
          },
        }}
      />
    </GraphCard>
  );
};

export default LineChart;
