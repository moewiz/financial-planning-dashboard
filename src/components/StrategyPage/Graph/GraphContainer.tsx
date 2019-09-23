import React, { useEffect, useState } from 'react';
import { isFunction } from 'lodash';
import { Icon } from 'antd';
import { Bar, HorizontalBar, Line } from 'react-chartjs-2';
import { GraphCard, GraphTitle, GraphWrapper, GraphGroup } from '../styled';
import classNames from 'classnames';

export enum GraphType {
  Line,
  Area,
  Bar,
  HorizontalBar,
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
  flipping?: boolean;
  onGraphClick?: (e: React.SyntheticEvent) => void;
}
const data1 = {
  labels: ['19', '20', '21', '22', '23', '24', '25'],
  datasets: [
    {
      label: 'a',
      fill: false,
      borderColor: '#FF5722',
      data: [165000, 159000, 150000, 165000, 235000, 45000, 140000],
    },
    {
      label: 'b',
      fill: false,
      borderColor: '#00BCD4',
      data: [165000, 235000, 70000, 120000, 165000, 150000, 120000],
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
      data: [165000, 159000, 120000, 165000, 235000, 120000, 140000],
    },
    {
      label: 'b',
      fill: false,
      borderColor: '#00BCD4',
      data: [70000, 150000, 45000, 100000, 65000, 35000, 150000],
    },
  ],
};
const datasets1 = [
  ...data1.datasets,
  {
    label: 'c',
    fill: true,
    borderColor: '#00BCD4',
    data: [70000, 45000, 45000, 150000, 100000, 35000, 65000],
  },
];
const areaData1 = {
  ...data1,
  datasets: datasets1.map((dataset, index) => ({
    ...dataset,
    fill: true,
    borderColor: '',
    pointRadius: 0,
  })),
};
const datasets2 = [
  ...data1.datasets,
  {
    label: 'c',
    fill: true,
    borderColor: '#00BCD4',
    data: [150000, 24500, 32500, 75000, 63000, 31000, 13000],
  },
];
const areaData2 = {
  ...data1,
  datasets: datasets2.map((dataset, index) => ({
    ...dataset,
    fill: true,
    borderColor: '',
    pointRadius: 0,
  })),
};
const GraphContainer = (props: GraphProps) => {
  const { type, name, data, className, flipping = true, onGraphClick } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const listOfData = flipping ? [data, data] : [data];
  const updateActiveIndex = () => {
    const nextActiveIndex = activeIndex + 1 >= listOfData.length ? 0 : activeIndex + 1;
    setActiveIndex(nextActiveIndex);
  };
  useEffect(() => {
    const id = setInterval(updateActiveIndex, 6000);
    return () => clearInterval(id);
  }, [activeIndex]);
  const [redraw, setRedraw] = useState<boolean>(false);
  useEffect(() => {
    setRedraw(true);
  }, [data]);

  const renderGraph = (graphData: any, index: number) => {
    switch (type) {
      case GraphType.Area:
        return (
          <GraphCard className={classNames({ active: index === activeIndex })} key={index}>
            <Line
              height={190}
              data={graphData}
              redraw={redraw}
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
        );
      case GraphType.Line:
        return (
          <GraphCard className={classNames({ active: index === activeIndex })} key={index}>
            <Line
              height={190}
              data={graphData}
              redraw={redraw}
              options={{
                maintainAspectRatio: false,
                legend: {
                  display: false,
                },
              }}
            />
          </GraphCard>
        );
      case GraphType.Bar:
        return (
          <GraphCard className={classNames({ active: index === activeIndex })} key={index}>
            <Bar
              height={190}
              data={graphData}
              redraw={redraw}
              options={{
                maintainAspectRatio: false,
                legend: {
                  display: false,
                },
              }}
            />
          </GraphCard>
        );
      case GraphType.HorizontalBar:
        return (
          <GraphCard className={classNames({ active: index === activeIndex })} key={index}>
            <HorizontalBar
              height={190}
              data={graphData}
              redraw={redraw}
              options={{
                maintainAspectRatio: false,
                legend: {
                  display: false,
                },
              }}
            />
          </GraphCard>
        );
      default:
        return null;
    }
  };
  const hasOnClick = isFunction(onGraphClick);

  return (
    <GraphWrapper className={className}>
      <GraphTitle>
        <Icon type="info-circle" theme="filled" />
        {name}
      </GraphTitle>
      <GraphGroup onClick={onGraphClick} className={classNames({ hasOnClick })}>
        {listOfData.map(renderGraph)}
      </GraphGroup>
    </GraphWrapper>
  );
};

export default GraphContainer;
