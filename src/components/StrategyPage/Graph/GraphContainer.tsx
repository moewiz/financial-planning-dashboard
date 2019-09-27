import React, { useEffect, useState } from 'react';
import { isFunction } from 'lodash';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { Bar, HorizontalBar, Line } from 'react-chartjs-2';
import classNames from 'classnames';

import { GraphCard, GraphTitle, GraphWrapper, GraphGroup } from '../styled';
import { RootState } from '../../../reducers/reducerTypes';

export enum GraphType {
  Line,
  Area,
  Bar,
  HorizontalBar,
}

interface GraphProps {
  processing: boolean;
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
  const { type, name, data, className, flipping = true, onGraphClick, processing } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const defaultListOfData = flipping ? [data, data] : [data];
  const [listOfData, setListOfData] = useState(defaultListOfData);
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((index) => (index + 1 >= listOfData.length ? 0 : index + 1));
    }, 6000);
    return () => clearInterval(id);
  }, []);
  const [redraw, setRedraw] = useState<boolean>(false);

  // redraw graph
  useEffect(() => {
    if (!processing) {
      console.log('clone default list of data and redraw the graph');
      const clonedData = [...defaultListOfData];
      console.log(clonedData === defaultListOfData);
      // setListOfData([...defaultListOfData]);
    }
  }, [processing]);

  useEffect(() => {
    setRedraw(true);
    setListOfData([...defaultListOfData]);
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

const mapStateToProps = (state: RootState) => {
  const processing = state.client.processing;
  return {
    processing,
  };
};

function areEqual(prevProps: GraphProps, nextProps: GraphProps) {
  console.log({ prevProps, nextProps })
  return false;
}

export default connect(mapStateToProps)(React.memo(GraphContainer, areEqual));
