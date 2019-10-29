import React, { useEffect, useState } from 'react';
import { isFunction, isBoolean, isNumber } from 'lodash';
import { connect } from 'react-redux';
import { Bar, HorizontalBar, Line } from 'react-chartjs-2';
import classNames from 'classnames';
import numeral from 'numeral';

import { GraphCard, GraphTitle, GraphWrapper, GraphGroup } from '../styled';
import { RootState } from '../../../reducers/reducerTypes';

export enum GraphType {
  Line,
  Doughnut,
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

const defaultOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    titleFontFamily:
      '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', ' +
      '\'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    bodyFontFamily:
      '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', ' +
      '\'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    footerFontFamily:
      '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', ' +
      '\'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    intersect: false,
    mode: 'label',
    callbacks: {
      title(
        tooltipItem: Array<{ label: string }>,
      ) {
        const label = tooltipItem[0].label;
        const numberLabel = parseInt(label, 10);
        return (!isNaN(numberLabel) && isNumber(numberLabel)) ? '20' + label : label;
      },
      label(
        tooltipItem: { datasetIndex: React.ReactText; yLabel: number },
        data: { datasets: { [x: string]: { label: string } } },
      ) {
        let label = data.datasets[tooltipItem.datasetIndex].label || '';

        if (label) {
          label += ': ';
        }
        label += numeral(Math.round(tooltipItem.yLabel * 100) / 100).format('$0,0.[00]');
        return label;
      },
    },
  },
};

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
                ...defaultOptions,
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
            <Line height={190} data={graphData} redraw={redraw} options={defaultOptions} />
          </GraphCard>
        );
      case GraphType.Bar:
        return (
          <GraphCard className={classNames({ active: index === activeIndex })} key={index}>
            <Bar height={190} data={graphData} redraw={redraw} options={defaultOptions} />
          </GraphCard>
        );
      case GraphType.HorizontalBar:
        return (
          <GraphCard className={classNames({ active: index === activeIndex })} key={index}>
            <HorizontalBar height={190} data={graphData} redraw={redraw} options={defaultOptions} />
          </GraphCard>
        );
      default:
        return null;
    }
  };
  const hasOnClick = isFunction(onGraphClick);

  return (
    <GraphWrapper className={className}>
      {name && (
        <GraphTitle>
          {name}
        </GraphTitle>
      )}
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
