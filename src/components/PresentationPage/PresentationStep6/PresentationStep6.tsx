import React from 'react';
import { connect } from 'formik';
import { get } from 'lodash';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';
import { loadGraphData } from '../../StrategyPage/StrategyHeader';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import numeral from 'numeral';

const chartConfig = {
  datasets: [
    {
      dataIndex: 'proposed',
      label: 'Proposed',
      fill: true,
      borderColor: '#00BCD4',
    },
    {
      dataIndex: 'balanced',
      label: 'Balanced',
      fill: true,
      borderColor: '#FF5722',
    },
    {
      dataIndex: 'current',
      label: 'Current',
      fill: true,
      borderColor: '#70ad47',
    },
  ],
};

const chartData = {
  xAxis: [
    'Domestic Equity',
    'International Equity',
    'Domestic Property',
    'International Property',
    'Growth Alternatives',
    'Other Growth',
    'Domestic Fixed Interest',
    'International Fixed Interest',
    'Domestic Cash',
    'Defensive Alternatives',
  ],
  proposed: [23.59, 31.09, 0, 8.98, 0, 4.49, 1.12, 2.68, 7.06, 0.49, 20.5],
  balanced: [24, 32, 0, 7, 0, 7, 2, 2, 6, 0, 20],
  current: [21.5, 17.5, 20.25, 0, 0, 7.25, 0, 20, 13.5, 0, 0],
};

const PresentationStep6 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <GraphPresentation
        type={GraphType.Bar}
        height={300}
        data={loadGraphData(chartConfig)(chartData)}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  // Include a dollar sign in the ticks
                  callback: (value: any, index: any, values: any) => {
                    return value + '%';
                  },
                },
              },
            ],
          },
          legend: {
            display: true,
            position: 'bottom',
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
              label(
                tooltipItem: { datasetIndex: React.ReactText; yLabel: number },
                data: { datasets: { [x: string]: { label: string } } },
              ) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += ': ';
                }
                label += numeral(Math.round(tooltipItem.yLabel * 100) / 100).format('0,0.[00]') + '%';
                return label;
              },
            },
          },
        }}
      />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep6);
