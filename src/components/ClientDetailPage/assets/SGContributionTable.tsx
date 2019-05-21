import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { InnerTableNoDelContainer, HeaderTitleTable, TextTitle, DivideLine } from '../../../pages/client/styled';
import { components } from './ContributionWithdrawalsTable';
import { addKeyToArray } from '../DataEntry';
import { sgRateOptions, yesNoOptions } from '../../../enums/options';

interface SGContributionTableProps {
  data: object[];
  index: number;
  titleTable?: string;
  tableName: string;
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
    const { titleTable, data, tableName, index } = this.props;
    const columns = this.columns.map((col) => {
      const editable = 'true';

      return {
        ...col,
        fixed: false,
        onCell: (record: any, rowIndex: number) => ({
          ...col,
          rowIndex,
          tableName: `assets[${index}].${tableName}`,
          type: col.type || 'text',
          record,
          disableRowIndex: true,
          editable,
        }),
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
          dataSource={addKeyToArray(data)}
          pagination={false}
          components={components}
          size={'small'}
        />
      </InnerTableNoDelContainer>
    );
  }
}

export default SGContributionTable;
