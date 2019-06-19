import React from 'react';
import { Icon } from 'antd';
import { Line } from 'react-chartjs-2';
import { GraphCard, GraphTitle, GraphWrapper } from '../styled';

interface GraphProps {
  name: string;
  data: {
    labels?: any[];
    datasets: object[];
  };
  options?: object;
}

const AreaChart = (props: GraphProps) => {
  const { name, data } = props;

  return (
    <GraphWrapper>
      <GraphTitle>
        <Icon type="info-circle" theme="filled" />
        {name}
      </GraphTitle>
      <GraphCard>
        <Line
          height={190}
          data={data}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  stacked: true,
                },
              ],
            },
          }}
        />
      </GraphCard>
    </GraphWrapper>
  );
};

export default AreaChart;
