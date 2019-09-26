import React, { useCallback, useEffect, useState } from 'react';
import { isFunction } from 'lodash';
import { Icon } from 'antd';
import { Bar, HorizontalBar, Line } from 'react-chartjs-2';
import classNames from 'classnames';

import { GraphCard, GraphTitle, GraphWrapper, GraphGroup } from '../styled';

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

const GraphContainer = (props: GraphProps) => {
  const { type, name, data, className, flipping = true, onGraphClick } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const listOfData = flipping ? [data, data] : [data];
  const updateActiveIndex = useCallback(() => {
    setActiveIndex((index) => (index + 1 >= listOfData.length ? 0 : index + 1));
  }, []);
  useEffect(() => {
    const id = setInterval(updateActiveIndex, 6000);
    return () => {
      clearInterval(id);
    };
  }, []);
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
