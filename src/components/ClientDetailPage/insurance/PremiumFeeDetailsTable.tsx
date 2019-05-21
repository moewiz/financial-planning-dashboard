import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { DivideLine, HeaderTitleTable, InnerTableContainer, TextTitle } from '../../../pages/client/styled';
import { AnimTag, components } from '../assets/ContributionWithdrawalsTable';
import { feeTypeOptions, frequencyOptions } from '../../../enums/options';
import { addKeyToArray } from '../DataEntry';

export interface PremiumFeeDetail {
  feeType: string;
  amount: number;
  frequency: string;
  specialNote: string;
}

interface PremiumFeeDetailsProp {
  data: PremiumFeeDetail[];
  index: number;
  tableName: string;
}

class PremiumFeeDetailsTable extends PureComponent<PremiumFeeDetailsProp> {
  public columns = [
    {
      title: '',
      key: 'operation',
      className: 'operation',
      width: 20,
      render: (text: any, record: any) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
          <Icon type="close-square" theme="twoTone" style={{ fontSize: '16px' }} />
        </Popconfirm>
      ),
    },
    {
      title: 'Fee Type',
      dataIndex: 'feeType',
      width: 140,
      type: 'select',
      options: feeTypeOptions,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '1',
      width: 120,
      type: 'number',
    },
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      key: '2',
      width: 120,
      type: 'select',
      options: frequencyOptions,
    },
    {
      title: 'Special Note',
      dataIndex: 'specialNote',
      key: '3',
      width: 120,
    },
  ];

  public handleDelete = (key: string) => {};

  public handleAdd = () => {
    const newData = {
      key: Date.now(),
      feeType: 'premium',
      amount: 80000.0,
      frequency: 'yearly',
      specialNote: 'Sample note',
    };
  }

  public render() {
    const { data, index, tableName } = this.props;
    const columns = this.columns.map((col) => {
      const editable = col.key === 'operation' ? false : 'true';

      return {
        ...col,
        fixed: false,
        onCell: (record: any, rowIndex: number) => ({
          ...col,
          rowIndex,
          tableName: `insurance[${index}].${tableName}`,
          type: col.type || 'text',
          record,
          editable,
        }),
      };
    });

    return (
      <InnerTableContainer>
        <HeaderTitleTable small={true}>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.handleAdd} />
          <TextTitle small={true}>{'Premium & Fee Details'}</TextTitle>
          <DivideLine />
        </HeaderTitleTable>
        <Table
          className={'premium-details-table'}
          columns={columns}
          dataSource={addKeyToArray(data)}
          components={components}
          pagination={false}
          size={'small'}
        />
      </InnerTableContainer>
    );
  }
}

export default PremiumFeeDetailsTable;
