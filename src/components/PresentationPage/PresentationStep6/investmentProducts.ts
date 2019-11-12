export const currentProducts = [
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

export const proposedProducts = [
  {
    id: '93315da0-0132-11ea-9ef6-7b9f2fb9b908',
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
          name: 'FirstChoice Wholesale Multi-Index Diversified',
          value: 50000,
          code: 'FSF0472AU',
          warning: 'Asset allocation not in line with risk profile.',
          percentage: '100',
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
    key: 1573112731770,
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
              percentage: '100',
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
      {
        id: -1,
        description: 'RoP - alternative',
        value: 400000,
        details: {
          funds: [],
        },
      },
    ],
    note: {
      text: '{{0}}, replace your existing product {{1}}',
      params: ['John Samual', 'CFS FirstChoice Wholesale Investments'],
    },
    hasCurrent: true,
  },
  {
    key: 1573035347030,
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
              value: 200000,
              percentage: '50',
            },
            {
              id: 2,
              name: 'Core Pool (My Super)',
              value: 200000,
              percentage: '50',
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
      {
        id: -1,
        description: 'RoP - alternative',
        value: 400000,
        details: {
          funds: [
            {
              id: 1,
              name: 'Greencape Broad Cap',
              value: 32000,
              percentage: '8',
            },
            {
              id: 2,
              name: 'Vanguard Australian Shares Index Trust',
              value: 52000,
              percentage: '13',
            },
            {
              id: 3,
              name: 'OnePath Emerging Companies Trust (Karara)',
              value: 12000,
              percentage: '3',
            },
            {
              id: 4,
              name: 'MFS Global Equity Trust',
              value: 20000,
              percentage: '5',
            },
            {
              id: 5,
              name: 'Vanguard International Shares Index Trust',
              value: 60000,
              percentage: '15',
            },
            {
              id: 6,
              name: 'Vanguard International Shares Index (Hedged) Trust',
              value: 36000,
              percentage: '9',
            },
            {
              id: 7,
              name: 'OptiMix Ws Global Emerging Markets Share',
              value: 12000,
              percentage: '3',
            },
            {
              id: 8,
              name: 'OnePath Global Property Securities (Vanguard)',
              value: 16000,
              percentage: '4',
            },
            {
              id: 9,
              name: 'CFS Global Listed Infrastructure',
              value: 12000,
              percentage: '3',
            },
            {
              id: 10,
              name: 'Schroder Real Return CPI Plus 5%',
              value: 16000,
              percentage: '4',
            },
            {
              id: 11,
              name: 'OnePath Alternatives Growth Trust',
              value: 12000,
              percentage: '3',
            },
            {
              id: 12,
              name: 'Schroder Real Return CPI Plus 5%',
              value: 16000,
              percentage: '4',
            },
            {
              id: 13,
              name: 'Kapstream Absolute Return Income Trust',
              value: 32000,
              percentage: '8',
            },
            {
              id: 14,
              name: 'T Rowe Global Bond',
              value: 32000,
              percentage: '8',
            },
            {
              id: 15,
              name: 'OnePath Ws Diversified Fixed Interest Trust (PIMCO)',
              value: 16000,
              percentage: '4',
            },
            {
              id: 16,
              name: 'ANZ Cash Advantage',
              value: 24000,
              percentage: '6',
            },
          ],
          product: {
            id: 3,
            name: 'OnePath OneAnswer Frontier Personal Super',
          },
        },
      },
    ],
    details: {
      funds: [
        {
          id: 1,
          name: 'Solaris W/S Core Aust Equity',
          value: 16000,
          percentage: '4',
        },
        {
          id: 2,
          name: 'CFS W/S Index Aust Share',
          value: 68000,
          percentage: '17',
        },
        {
          id: 3,
          name: 'Ausbil W/S Aust Emerging Leaders',
          value: 12000,
          percentage: '3',
        },
        {
          id: 4,
          name: 'MFS W/S Global Equity',
          value: 20000,
          percentage: '5',
        },
        {
          id: 5,
          name: 'CFS W/S Global Share Index',
          value: 56000,
          percentage: '14',
        },
        {
          id: 6,
          name: 'CFS W/S - Index Global Share (H)',
          value: 40000,
          percentage: '10',
        },
        {
          id: 7,
          name: 'Pendal W/S Global Emerging Market Opportunities',
          value: 12000,
          percentage: '3',
        },
        {
          id: 8,
          name: 'CFS W/S Global Property Securities',
          value: 16000,
          percentage: '4',
        },
        {
          id: 9,
          name: 'CFS W/S Global Listed Infrast. Secs',
          value: 20000,
          percentage: '5',
        },
        {
          id: 10,
          name: 'Schroder W/S Real Return',
          value: 18000,
          percentage: '5',
        },
        {
          id: 11,
          name: 'Schroder W/S Real Return',
          value: 18000,
          percentage: '5',
        },
        {
          id: 12,
          name: 'Macquarie W/S Income Opps',
          value: 28000,
          percentage: '7',
        },
        {
          id: 13,
          name: 'Kapstream W/S Absolute Return Income',
          value: 36000,
          percentage: '9',
        },
        {
          id: 14,
          name: 'FirstChoice W/S Fixed Interest',
          value: 16000,
          percentage: '4',
        },
        {
          id: 15,
          name: 'FirstRate Wholesale Saver',
          value: 24000,
          percentage: '6',
        },
      ],
      product: {
        id: 1,
        name: 'CFS FirstChoice Wholesale Personal Super',
      },
    },
    hasCurrent: true,
  },
];
