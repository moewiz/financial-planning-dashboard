import React from 'react';
import { Bar, HorizontalBar, Line } from 'react-chartjs-2';
import numeral from 'numeral';
import { isNumber } from 'lodash';

import { GraphType } from './GraphContainer';

interface GraphPresentationProps {
  type: GraphType;
  data: any;
  redraw?: boolean;
  options?: any;
}

const defaultOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          // Include a dollar sign in the ticks
          callback: (value: any, index: any, values: any) => {
            return numeral(Math.round(value * 100) / 100).format('$0,0.[00]');
          },
        },
      },
    ],
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    titleFontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', " +
      "'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    bodyFontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', " +
      "'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    footerFontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', " +
      "'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    intersect: false,
    mode: 'label',
    callbacks: {
      title(tooltipItem: { label: string }[]) {
        const label = tooltipItem[0].label;
        const numberLabel = parseInt(label, 10);
        return !isNaN(numberLabel) && isNumber(numberLabel) ? '20' + label : label;
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

const GraphPresentation = (props: GraphPresentationProps) => {
  const { type, data, redraw, options } = props;

  switch (type) {
    case GraphType.Area:
      return (
        <Line
          height={190}
          data={data}
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
      );
    case GraphType.Line:
      return <Line height={190} data={data} redraw={redraw} options={{ ...defaultOptions, ...options }} />;
    case GraphType.Bar:
      return <Bar height={190} data={data} redraw={redraw} options={{ ...defaultOptions, ...options }} />;
    case GraphType.HorizontalBar:
      return <HorizontalBar height={190} data={data} redraw={redraw} options={{ ...defaultOptions, ...options }} />;
    default:
      return null;
  }
};

export default GraphPresentation;
