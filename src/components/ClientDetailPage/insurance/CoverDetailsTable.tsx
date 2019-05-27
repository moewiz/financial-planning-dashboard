import React, { Component } from 'react';
import { map } from 'lodash';
import { Icon, Popconfirm, Table } from 'antd';
import { InnerTableContainer, DivideLine, HeaderTitleTable, TextTitle } from '../../../pages/client/styled';
import { components } from '../assets/ContributionWithdrawalsTable';
import { coverTypeOptions, policyOwnerOptions, premiumTypeOptions } from '../../../enums/options';
import ExpandedCoverDetailRow from './ExpandedCoverDetailRow';
import { loadOptionsBaseOnCol } from '../../../utils/columnUtils';

export interface CoverDetail {
  key: number;
  refId: number;
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
  addRow: (index: number, tableName: string, row: any) => void;
  deleteRow: (index: number, tableName: string, key: number) => void;
  dynamicCustomValue: object;
  maritalState: string;
}

class CoverDetailsTable extends Component<CoverDetailsProps> {
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

  public handleDelete = (key: number) => {
    const { index, tableName, deleteRow } = this.props;
    deleteRow(index, tableName, key);
  }

  public handleAdd = () => {
    const { index, tableName, addRow } = this.props;
    const newData = {
      key: Date.now(),
      refId: Date.now(),
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
    addRow(index, tableName, newData);
  }

  public render() {
    const { data, index, tableName, dynamicCustomValue, maritalState } = this.props;
    const columns = this.columns.map((col: any) => {
      const editable = col.key === 'operation' ? false : 'true';

      return {
        ...col,
        fixed: false,
        onCell: (record: any, rowIndex: number) => {
          const options = loadOptionsBaseOnCol(col, record, { maritalState });

          return {
            ...col,
            options,
            rowIndex,
            tableName: `insurance[${index}].${tableName}`,
            type: col.type || 'text',
            record,
            editable,
            smallInput: true,
          };
        },
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
          className={'cover-details-table'}
          dataSource={data}
          components={components}
          expandedRowKeys={map(data, 'key')}
          expandedRowRender={(record: CoverDetail, expandedIndex: number, indent: number, expanded: boolean) => (
            <ExpandedCoverDetailRow
              record={record}
              index={expandedIndex}
              indent={indent}
              expanded={expanded}
              insuranceIndex={index}
              coverDetails={data}
              dynamicCustomValue={dynamicCustomValue}
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
