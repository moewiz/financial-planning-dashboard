import React, { useState } from 'react';
import { connect } from 'formik';
import { get } from 'lodash';

import numeral from 'numeral';
import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import { GraphType } from '../../StrategyPage/Graph/GraphContainer';
import { loadGraphData } from '../../StrategyPage/StrategyHeader';
import GraphPresentation from '../../StrategyPage/Graph/GraphPresentation';
import DrawerProduct, { Product } from '../../ProductOptimizer/Drawer/DrawerProduct';
import { Table } from 'antd';
import { HeaderTitleTable, TableEntryContainer, TextTitle } from '../../../pages/client/styled';
import CurrentProduct from '../../../containers/productOptimizer/CurrentProduct';
import { map } from 'lodash-es';

const currentProducts = [
  {
    id: 2,
    description: 'Hesta Personal Super',
    value: 400000,
    details: {
      product: {
        id: 2,
        name: 'Hesta Personal Super',
      },
      funds: [
        {
          id: 1,
          name: 'Conservative Pool',
          value: 400000,
        },
      ],
      assetAllocation: {
        title: '',
        subTitle: '',
        values: [
          {
            title: 'Domestic Equity',
            values: [12.0, 24, -12],
          },
          {
            title: 'International Equity',
            values: [11, 2, -21],
          },
          {
            title: 'Domestic Property',
            values: [19, 0, 19],
          },
          {
            title: 'International Property',
            values: [0, 7, -7],
          },
          {
            title: 'Other Growth',
            values: [0, 0, 0],
          },
          {
            title: 'Growth Alternatives',
            values: [6, 7, -1],
          },
          {
            title: 'Total Growth',
            values: [48, 70, -22],
            total: true,
          },
          {
            title: 'Domestic Fixed Interest',
            values: [0, 2, -2],
          },
          {
            title: 'International Fixed Interest',
            values: [30, 2, 28],
          },
          {
            title: 'Domestic Cash',
            values: [22, 6, 16],
          },
          {
            title: 'International Cash',
            values: [0, 0, 0],
          },
          {
            title: 'Defensive Alternatives',
            values: [0, 20, -20],
          },
          {
            title: 'Total Defensive',
            values: [52, 30, 22],
            total: true,
          },
        ],
      },
      fees: {
        title: '',
        subTitle: '',
        ongoingFee: [
          {
            id: 1,
            name: 'Administration Fees',
            value: '350',
            percentage: '0.09',
          },
          {
            id: 2,
            name: 'Investment Fees and Costs',
            value: '2160',
            percentage: '0.54',
          },
          {
            id: 3,
            name: 'Membership Fee',
            value: '65',
            percentage: '0.02',
          },
          {
            id: 4,
            name: 'Portfolio Balance Rebate (-)',
            value: '0',
            percentage: '0',
          },
          { id: -1, name: '', value: '', percentage: '' },
          {
            name: 'Net Ongoing Cost',
            value: '2575',
            percentage: '',
          },
        ],
        transactionFee: [
          {
            id: 1,
            name: 'Buy/Sell costs',
            value: '0',
            percentage: '0',
          },
          { id: -1, name: '', value: '', percentage: '' },
        ],
        otherBalances: [
          {
            id: 1,
            name: 'Total Balance held by client',
            value: 0,
          },
          {
            id: 2,
            name: 'Total balance held by family group',
            value: 0,
          },
        ],
      },
    },
  },
  {
    id: 4,
    description: 'CFS FirstChoice Wholesale Investments',
    value: 50000,
    details: {
      product: {
        id: 4,
        name: 'CFS FirstChoice Wholesale Investments',
      },
      funds: [
        {
          id: 1,
          name: 'FirstChoice Wholesale Moderate',
          value: 50000,
        },
      ],
      assetAllocation: {
        title: '',
        subTitle: '',
        values: [
          {
            title: 'Domestic Equity',
            values: [20.24, 24, -3.76],
          },
          {
            title: 'International Equity',
            values: [27.25, 32, -4.75],
          },
          {
            title: 'Domestic Property',
            values: [0.16, 0, 0.16],
          },
          {
            title: 'International Property',
            values: [4.44, 7, -2.56],
          },
          {
            title: 'Other Growth',
            values: [0, 0, 0],
          },
          {
            title: 'Growth Alternatives',
            values: [9.23, 7, 2.23],
          },
          {
            title: 'Total Growth',
            values: [61.32, 70, -8.68],
            total: true,
          },
          {
            title: 'Domestic Fixed Interest',
            values: [6.96, 2, 4.96],
          },
          {
            title: 'International Fixed Interest',
            values: [16.75, 2, 14.75],
          },
          {
            title: 'Domestic Cash',
            values: [14.05, 6, 8.05],
          },
          {
            title: 'International Cash',
            values: [0.92, 0, 0.92],
          },
          {
            title: 'Defensive Alternatives',
            values: [0, 20, -20],
          },
          {
            title: 'Total Defensive',
            values: [38.68, 30, 8.68],
            total: true,
          },
        ],
      },
      fees: {
        title: '',
        subTitle: '',
        ongoingFee: [
          {
            id: 1,
            name: 'Administration Fees',
            value: '490',
            percentage: '0.98',
          },
          { id: -1, name: '', value: '', percentage: '' },
          {
            name: 'Net Ongoing Cost',
            value: '490',
            percentage: '',
          },
        ],
        transactionFee: [
          {
            id: 1,
            name: 'Buy/Sell costs',
            value: '0',
            percentage: '0',
          },
          { id: -1, name: '', value: '', percentage: '' },
        ],
        otherBalances: [
          {
            id: 1,
            name: 'Total Balance held by client',
            value: 0,
          },
          {
            id: 2,
            name: 'Total balance held by family group',
            value: 0,
          },
        ],
      },
    },
  },
];

const proposedProducts = [
  {
    id: '664af850-007e-11ea-a393-77fce7f5271b',
    description: 'CFS FirstChoice Wholesale Investments',
    value: 50000,
    details: {
      product: {
        id: 4,
        name: 'CFS FirstChoice Wholesale Investments',
      },
      funds: [
        {
          id: 1,
          name: 'FirstChoice Wholesale Moderate',
          value: 50000,
        },
      ],
      assetAllocation: {
        title: '',
        subTitle: '',
        values: [
          {
            title: 'Domestic Equity',
            values: [20.24, 24, -3.76],
          },
          {
            title: 'International Equity',
            values: [27.25, 32, -4.75],
          },
          {
            title: 'Domestic Property',
            values: [0.16, 0, 0.16],
          },
          {
            title: 'International Property',
            values: [4.44, 7, -2.56],
          },
          {
            title: 'Other Growth',
            values: [0, 0, 0],
          },
          {
            title: 'Growth Alternatives',
            values: [9.23, 7, 2.23],
          },
          {
            title: 'Total Growth',
            values: [61.32, 70, -8.68],
            total: true,
          },
          {
            title: 'Domestic Fixed Interest',
            values: [6.96, 2, 4.96],
          },
          {
            title: 'International Fixed Interest',
            values: [16.75, 2, 14.75],
          },
          {
            title: 'Domestic Cash',
            values: [14.05, 6, 8.05],
          },
          {
            title: 'International Cash',
            values: [0.92, 0, 0.92],
          },
          {
            title: 'Defensive Alternatives',
            values: [0, 20, -20],
          },
          {
            title: 'Total Defensive',
            values: [38.68, 30, 8.68],
            total: true,
          },
        ],
      },
      fees: {
        title: '',
        subTitle: '',
        ongoingFee: [
          {
            id: 1,
            name: 'Administration Fees',
            value: '490',
            percentage: '0.98',
          },
          {
            id: -1,
            name: '',
            value: '',
            percentage: '',
          },
          {
            name: 'Net Ongoing Cost',
            value: '490',
            percentage: '',
          },
        ],
        transactionFee: [
          {
            id: 1,
            name: 'Buy/Sell costs',
            value: '0',
            percentage: '0',
          },
          {
            id: -1,
            name: '',
            value: '',
            percentage: '',
          },
        ],
        otherBalances: [
          {
            id: 1,
            name: 'Total Balance held by client',
            value: 0,
          },
          {
            id: 2,
            name: 'Total balance held by family group',
            value: 0,
          },
        ],
      },
    },
    key: 1573035347029,
    links: [
      {
        id: 4,
        description: 'CFS FirstChoice Wholesale Investments',
        value: 50000,
        details: {
          product: {
            id: 4,
            name: 'CFS FirstChoice Wholesale Investments',
          },
          funds: [
            {
              id: 1,
              name: 'FirstChoice Wholesale Moderate',
              value: 50000,
            },
          ],
          assetAllocation: {
            title: '',
            subTitle: '',
            values: [
              {
                title: 'Domestic Equity',
                values: [20.24, 24, -3.76],
              },
              {
                title: 'International Equity',
                values: [27.25, 32, -4.75],
              },
              {
                title: 'Domestic Property',
                values: [0.16, 0, 0.16],
              },
              {
                title: 'International Property',
                values: [4.44, 7, -2.56],
              },
              {
                title: 'Other Growth',
                values: [0, 0, 0],
              },
              {
                title: 'Growth Alternatives',
                values: [9.23, 7, 2.23],
              },
              {
                title: 'Total Growth',
                values: [61.32, 70, -8.68],
                total: true,
              },
              {
                title: 'Domestic Fixed Interest',
                values: [6.96, 2, 4.96],
              },
              {
                title: 'International Fixed Interest',
                values: [16.75, 2, 14.75],
              },
              {
                title: 'Domestic Cash',
                values: [14.05, 6, 8.05],
              },
              {
                title: 'International Cash',
                values: [0.92, 0, 0.92],
              },
              {
                title: 'Defensive Alternatives',
                values: [0, 20, -20],
              },
              {
                title: 'Total Defensive',
                values: [38.68, 30, 8.68],
                total: true,
              },
            ],
          },
          fees: {
            title: '',
            subTitle: '',
            ongoingFee: [
              {
                id: 1,
                name: 'Administration Fees',
                value: '490',
                percentage: '0.98',
              },
              {
                id: -1,
                name: '',
                value: '',
                percentage: '',
              },
              {
                name: 'Net Ongoing Cost',
                value: '490',
                percentage: '',
              },
            ],
            transactionFee: [
              {
                id: 1,
                name: 'Buy/Sell costs',
                value: '0',
                percentage: '0',
              },
              {
                id: -1,
                name: '',
                value: '',
                percentage: '',
              },
            ],
            otherBalances: [
              {
                id: 1,
                name: 'Total Balance held by client',
                value: 0,
              },
              {
                id: 2,
                name: 'Total balance held by family group',
                value: 0,
              },
            ],
          },
        },
        key: 1,
        isCurrent: true,
      },
    ],
    note: {
      text: '{{0}}, replace your existing product {{1}}',
      params: ['John Samual', 'CFS FirstChoice Wholesale Investments'],
    },
  },
  {
    key: 0,
    description: 'CFS Super',
    value: 400000,
    id: '83da13cc-372b-4b4f-b8da-1222c2987ca9',
    note: {
      text: '{{0}}, replace your existing product {{1}}',
      params: ['John Samual', 'Hesta Personal Super'],
    },
    links: [
      {
        id: 2,
        description: 'Hesta Personal Super',
        value: 400000,
        details: {
          product: {
            id: 2,
            name: 'Hesta Personal Super',
          },
          funds: [
            {
              id: 1,
              name: 'Conservative Pool',
              value: 400000,
            },
          ],
          assetAllocation: {
            title: '',
            subTitle: '',
            values: [
              {
                title: 'Domestic Equity',
                values: [12, 24, -12],
              },
              {
                title: 'International Equity',
                values: [11, 2, -21],
              },
              {
                title: 'Domestic Property',
                values: [19, 0, 19],
              },
              {
                title: 'International Property',
                values: [0, 7, -7],
              },
              {
                title: 'Other Growth',
                values: [0, 0, 0],
              },
              {
                title: 'Growth Alternatives',
                values: [6, 7, -1],
              },
              {
                title: 'Total Growth',
                values: [48, 70, -22],
                total: true,
              },
              {
                title: 'Domestic Fixed Interest',
                values: [0, 2, -2],
              },
              {
                title: 'International Fixed Interest',
                values: [30, 2, 28],
              },
              {
                title: 'Domestic Cash',
                values: [22, 6, 16],
              },
              {
                title: 'International Cash',
                values: [0, 0, 0],
              },
              {
                title: 'Defensive Alternatives',
                values: [0, 20, -20],
              },
              {
                title: 'Total Defensive',
                values: [52, 30, 22],
                total: true,
              },
            ],
          },
          fees: {
            title: '',
            subTitle: '',
            ongoingFee: [
              {
                id: 1,
                name: 'Administration Fees',
                value: '350',
                percentage: '0.09',
              },
              {
                id: 2,
                name: 'Investment Fees and Costs',
                value: '2160',
                percentage: '0.54',
              },
              {
                id: 3,
                name: 'Membership Fee',
                value: '65',
                percentage: '0.02',
              },
              {
                id: 4,
                name: 'Portfolio Balance Rebate (-)',
                value: '0',
                percentage: '0',
              },
              {
                id: -1,
                name: '',
                value: '',
                percentage: '',
              },
              {
                name: 'Net Ongoing Cost',
                value: '2575',
                percentage: '',
              },
            ],
            transactionFee: [
              {
                id: 1,
                name: 'Buy/Sell costs',
                value: '0',
                percentage: '0',
              },
              {
                id: -1,
                name: '',
                value: '',
                percentage: '',
              },
            ],
            otherBalances: [
              {
                id: 1,
                name: 'Total Balance held by client',
                value: 0,
              },
              {
                id: 2,
                name: 'Total balance held by family group',
                value: 0,
              },
            ],
          },
        },
        key: 0,
        isCurrent: true,
      },
    ],
  },
];

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
  const [product, setProduct] = useState<Product>();
  const [isOpen, setDrawerToggle] = useState(false);
  const openDrawer = (record: Product) => {
    setDrawerToggle(true);
    setProduct(record);
  };
  const closeDrawer = () => {
    setDrawerToggle(false);
    setProduct(undefined);
  };

  return (
    <StepWrapper>
      <TextTitle>Investment Products</TextTitle>
      <CurrentProduct dataList={currentProducts} openDrawer={openDrawer} readOnly={true} />

      <TextTitle>Asset Allocation comparison</TextTitle>
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
            bodyFontStyle: 'normal',
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
      <DrawerProduct isOpen={isOpen} close={closeDrawer} product={product} />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep6);
