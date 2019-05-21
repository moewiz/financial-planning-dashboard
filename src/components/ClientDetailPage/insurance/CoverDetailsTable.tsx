import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { InnerTableContainer, DivideLine, HeaderTitleTable, TextTitle } from '../../../pages/client/styled';
import { components } from '../assets/ContributionWithdrawalsTable';
import { addKeyToArray } from '../DataEntry';
import { coverTypeOptions, policyOwnerOptions, premiumTypeOptions } from '../../../enums/options';
import ExpandedCoverDetailRow from './ExpandedCoverDetailRow';

export interface CoverDetail {
  refId?: string;
  coverType: string;
  policyOwner: string;
  benefitAmount: number;
  premiumType: string;
  notes: string;
  expandable: any;
}

interface CoverDetailsProps {
  data: CoverDetail[];
  index: number;
  tableName: string;
}

class CoverDetailsTable extends PureComponent<CoverDetailsProps> {
  public columns = [
    {
      title: '',
      key: 'operation',
      className: 'operation',
      width: 18,
      render: (text: any, record: any) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
          <Icon type="close-square" theme="twoTone" style={{ fontSize: '16px' }} />
        </Popconfirm>
      ),
    },
    {
      title: 'Cover Type',
      dataIndex: 'coverType',
      width: 140,
      type: 'select',
      options: coverTypeOptions,
    },
    {
      title: 'Policy Owner',
      dataIndex: 'policyOwner',
      key: '1',
      width: 120,
      type: 'select',
      options: policyOwnerOptions,
    },
    {
      title: 'Benefit Amount',
      dataIndex: 'benefitAmount',
      key: '2',
      width: 120,
      type: 'number',
    },
    {
      title: 'Premium Type',
      dataIndex: 'premiumType',
      key: '3',
      width: 120,
      type: 'select',
      options: premiumTypeOptions,
    },
    {
      title: 'Special Note',
      dataIndex: 'notes',
      key: '4',
      width: 120,
    },
  ];

  public handleDelete = (key: string) => {};

  public handleAdd = () => {
    const newData = {
      key: Date.now(),
      coverType: 'life',
      policyOwner: 'superFund',
      benefitAmount: 200000.0,
      premiumType: 'stepped',
      notes: 'Sample Note.',
      expandable: {
        isLinked: false,
        linkedProduct: null,
      },
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
          <TextTitle small={true}>{'Cover Details'}</TextTitle>
          <DivideLine />
        </HeaderTitleTable>
        <Table
          columns={columns}
          dataSource={addKeyToArray(data)}
          components={components}
          defaultExpandAllRows={true}
          expandedRowRender={(record: CoverDetail, expandedIndex: number, indent: number, expanded: boolean) => (
            <ExpandedCoverDetailRow
              record={record}
              index={expandedIndex}
              indent={indent}
              expanded={expanded}
              insuranceIndex={index}
            />
          )}
          pagination={false}
          size={'small'}
        />
      </InnerTableContainer>
    );
  }
}

export default CoverDetailsTable;
