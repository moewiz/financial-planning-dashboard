import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { InnerTableNoDelContainer, HeaderTitleTable, TextTitle, DivideLine } from '../../../pages/client/styled';
import { components } from './ContributionWithdrawalsTable';
import { sgRateOptions, yesNoOptions } from '../../../enums/options';
import { loadOptionsBaseOnCol } from '../../../utils/columnUtils';

interface SGContributionTableProps {
  data: object[];
  index: number;
  titleTable?: string;
  tableName: string;
  dynamicCustomValue: object;
}
class SGContributionTable extends PureComponent<SGContributionTableProps, {}> {
  public columns = [
    {
      title: 'Super Salary',
      dataIndex: 'superSalary',
      width: 140,
      type: 'number',
    },
    {
      title: 'Increase to limit?',
      dataIndex: 'increaseToLimit',
      key: '1',
      width: 120,
      type: 'select',
      options: yesNoOptions,
    },
    {
      title: 'SG Rate (%)',
      dataIndex: 'sgrate',
      key: '2',
      width: 120,
      type: 'select',
      options: sgRateOptions,
    },
  ];

  public render(): React.ReactNode {
    const { titleTable, data, tableName, index, dynamicCustomValue } = this.props;
    const columns = this.columns.map((col: any) => {
      const editable = 'true';

      return {
        ...col,
        fixed: false,
        onCell: (record: any, rowIndex: number) => {
          const options = loadOptionsBaseOnCol(col, record, { dynamicCustomValue });
          return {
            ...col,
            options,
            rowIndex,
            tableName: `assets[${index}].${tableName}`,
            type: col.type || 'text',
            record,
            disableRowIndex: true,
            editable,
            smallInput: true,
          };
        },
      };
    });

    return (
      <InnerTableNoDelContainer>
        <HeaderTitleTable small={true}>
          <TextTitle small={true}>{titleTable}</TextTitle>
          <DivideLine />
        </HeaderTitleTable>
        <Table
          className="SGContribution-table"
          columns={columns}
          dataSource={data}
          pagination={false}
          components={components}
          size={'small'}
        />
      </InnerTableNoDelContainer>
    );
  }
}

export default SGContributionTable;
