import React, { useEffect, useState } from 'react';
import { isFunction, isBoolean, get } from 'lodash';
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
  type: GraphType;
  name?: string;
  data?: {
    labels?: any[];
    datasets: object[];
  };
  dataList?: Array<{
    labels?: any[];
    datasets: object[];
  }>;
  processingDraw: boolean;
  options?: object;
  className?: string;
  redraw?: boolean;
  onGraphClick?: (e: React.SyntheticEvent) => void;
}

const GraphContainer = (props: GraphProps) => {
  const { type, name, data, className, onGraphClick, redraw: redrawProp, dataList } = props;
  const flipping = dataList && dataList.length > 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const defaultListOfData = dataList && dataList.length > 0 ? dataList : [data];
  const [listOfData, setListOfData] = useState(defaultListOfData);
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((index) => (index + 1 >= listOfData.length ? 0 : index + 1));
    }, 6000);
    return () => clearInterval(id);
  }, []);
  const redraw = isBoolean(redrawProp) ? redrawProp : true;

  // redraw graph
  useEffect(() => {
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
        {flipping ? get(listOfData[activeIndex], 'title') : name}
      </GraphTitle>
      <GraphGroup onClick={onGraphClick} className={classNames({ hasOnClick })}>
        {listOfData.map(renderGraph)}
      </GraphGroup>
    </GraphWrapper>
  );
};

const mapStateToProps = (state: RootState) => {
  const processingDraw = state.client.processingDraw;
  return {
    processingDraw,
  };
};

function areEqual(prevProps: GraphProps, nextProps: GraphProps) {
  const shouldRender = !prevProps.processingDraw && !nextProps.processingDraw;
  return !shouldRender;
}

export default connect(mapStateToProps)(React.memo(GraphContainer, areEqual));
