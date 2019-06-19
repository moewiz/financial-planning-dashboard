import React from 'react';
import { Icon } from 'antd';
import { Line } from 'react-chartjs-2';
import { GraphCard, GraphTitle, GraphWrapper } from '../styled';

export enum GraphType {
  Line,
  Area,
}

interface GraphProps {
  type: GraphType;
  name: string;
  data: {
    labels?: any[];
    datasets: object[];
  };
  options?: object;
  className?: string;
}

const GraphContainer = (props: GraphProps) => {
  const { type, name, data, className } = props;
  const renderGraph = () => {
    switch (type) {
      case GraphType.Area:
        return (
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
        );
      case GraphType.Line:
        return (
          <Line
            height={190}
            data={data}
            options={{
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <GraphWrapper className={className}>
      <GraphTitle>
        <Icon type="info-circle" theme="filled" />
        {name}
      </GraphTitle>
      <GraphCard>{renderGraph()}</GraphCard>
    </GraphWrapper>
  );
};

export default GraphContainer;
