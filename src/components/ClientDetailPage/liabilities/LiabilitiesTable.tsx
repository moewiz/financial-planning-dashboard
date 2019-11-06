import React, { PureComponent } from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import { get, isFunction } from 'lodash';
import { TableEntryContainer, HeaderTitleTable, TextTitle, ActionTableGeneral } from '../../../pages/client/styled';
import ExpandedLiabilitiesRow, { LiabilityProps } from './ExpandedLiabilitiesRow';
import { CURRENT_COLUMN_WIDTH } from '../../../enums/currents';
import GeneralTable from '../GeneralTable';
import { to2Options, liabilitiesTypes, ownerOptions, from2Options } from '../../../enums/options';
import { loadOptionsBaseOnCol, removePartnerOption } from '../../../utils/columnUtils';
import { CurrentTypes } from '../../../enums/currents';
import AddMenu from '../AddMenu';
import { createEvent } from '../../../utils/GA';
import { sortAlphabetical } from '../../../utils/sort';

interface LiabilitiesTableProps {
  data: object[];
  maritalStatus: string;
  assets: Array<{ refId: number; description: string; type: string }>;
  loading?: boolean;
  clientId: number;

  setFieldValue: (field: string, value: any) => void;
  resetForm: (nextValues?: any) => void;
  submitForm: () => void;
  addRow: (row: any) => void;
  deleteRow: (key: number) => void;
  ref?: React.RefObject<any>;
}

class LiabilitiesTable extends PureComponent<LiabilitiesTableProps> {
  public columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      type: 'text',
      key: '0',
      width: CURRENT_COLUMN_WIDTH.DescriptionIcon,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: '1',
      width: CURRENT_COLUMN_WIDTH.Type,
      type: 'select',
      options: liabilitiesTypes,
      sorter: sortAlphabetical('type'),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: '2',
      width: CURRENT_COLUMN_WIDTH.Owner,
      type: 'select',
      options: ownerOptions,
      sorter: sortAlphabetical('owner'),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '3',
      width: CURRENT_COLUMN_WIDTH.Value,
      type: 'number',
      sign: 'dollar',
      className: 'text-align-right',
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: '4',
      width: CURRENT_COLUMN_WIDTH.Investment,
      type: 'number',
      precision: 1,
      sign: 'percent',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '5',
      type: 'date',
      width: CURRENT_COLUMN_WIDTH.From,
      pickerType: 'custom',
      options: from2Options,
      className: 'table-expand-datepicker',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '6',
      width: CURRENT_COLUMN_WIDTH.To,
      type: 'date',
      pickerType: 'custom',
      className: 'table-expand-datepicker',
      options: to2Options,
    },
    {
      title: '',
      key: 'operation',
      editable: false,
      className: 'text-align-center',
      width: CURRENT_COLUMN_WIDTH.Delete,
    },
  ];

  private tableName = 'liabilities';

  public componentDidUpdate(prevProps: Readonly<LiabilitiesTableProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const { maritalStatus, setFieldValue, data } = this.props;
    if (prevProps.maritalStatus !== maritalStatus && maritalStatus === 'single') {
      // update All Owner to Client
      const newData = data.map((d) => ({ ...d, owner: 'client' }));
      setFieldValue(this.tableName, newData);
    }
  }

  public resetForm = () => {
    this.handleResetForm();
  }

  public submitForm = () => {
    const { submitForm } = this.props;
    submitForm();
  }

  public handleDelete = (key: number) => {
    const { deleteRow, clientId } = this.props;

    if (isFunction(deleteRow)) {
      createEvent('current_position', 'delete', 'Liabilities', clientId);
      deleteRow(key);
    }
  }

  public handleAdd = (value: string[]) => {
    const { addRow, clientId } = this.props;
    const [owner, type] = value;
    const newData = {
      key: Date.now(),
      description: 'Home Loan',
      type,
      owner,
      value: 100000,
      interest: 4.5,
      from: {
        type: 'existing',
        yearValue: null,
      },
      to: {
        type: 'retain',
        yearValue: null,
      },
      expandable: {
        deductibility: 0,
        repaymentAmount: 6139.0,
        repaymentType: 'principalInterest',
        durationLength: 30,
        durationType: 'months',
        creditLimit: 0,
        associatedAssetRefId: 1,
      },
      drawdowns: [],
    };

    if (isFunction(addRow)) {
      createEvent('current_position', 'create', 'Liabilities', clientId);
      addRow(newData);
    }
  }

  public handleSave = (arg: { tableName: string; rowIndex: number; dataIndex: string; value: any; record: any }) => {
    const { tableName, rowIndex, dataIndex, value, record } = arg;
  }

  public handleResetForm = () => {
    const { resetForm } = this.props;
    if (isFunction(resetForm)) {
      resetForm();
    }
  }

  public addRowInnerTable = (index: number, tableName: string, row: any) => {
    const { setFieldValue, data } = this.props;
    const tableData = get(data[index], tableName, []);
    tableData.unshift(row);

    const newData: any = data;
    newData[index][tableName] = tableData;

    setFieldValue(this.tableName, newData);
  }

  public removeRowInnerTable = (index: number, tableName: string, key: number) => {
    const { setFieldValue, data } = this.props;
    const tableData = get(data[index], tableName).filter((i: any) => i.key !== key);

    const newData: any = data;
    newData[index][tableName] = tableData;

    setFieldValue(this.tableName, newData);
  }

  public render() {
    const { loading, data, maritalStatus, assets } = this.props;
    const columns = this.columns.map((col: any) => {
      const editable = col.editable === false ? false : 'true';
      if (col.key === 'operation') {
        return {
          ...col,
          key: 'operation',
          render: (text: any, record: any) => (
            <Popconfirm title="Really delete?" onConfirm={() => this.handleDelete(record.key)}>
              <Icon type="close-square" theme="twoTone" style={{ fontSize: '16px' }} />
            </Popconfirm>
          ),
        };
      }
      const { sorter, ...cellProps } = col;

      return {
        ...col,
        onCell: (record: any, rowIndex: number) => {
          const options = loadOptionsBaseOnCol(col, record, { maritalStatus });

          return {
            ...cellProps,
            options,
            rowIndex,
            tableName: this.tableName,
            type: col.type || 'text',
            record,
            editable,
            handleSave: this.handleSave,
          };
        },
      };
    });

    return (
      <TableEntryContainer>
        <HeaderTitleTable>
          <AddMenu onClick={this.handleAdd} type={CurrentTypes.Liabilities} maritalStatus={maritalStatus} />
          <TextTitle>{'Liabilities'}</TextTitle>
        </HeaderTitleTable>
        <GeneralTable
          loading={loading || false}
          columns={columns}
          dataSource={data}
          pagination={false}
          expandedRowRender={(record: LiabilityProps, index: number, indent: number, expanded: boolean) => (
            <ExpandedLiabilitiesRow
              record={record}
              index={index}
              indent={indent}
              expanded={expanded}
              maritalStatus={maritalStatus}
              assets={assets}
              addRow={this.addRowInnerTable}
              deleteRow={this.removeRowInnerTable}
            />
          )}
          className={`${this.tableName}-table`}
        />
        <ActionTableGeneral>
          <Button htmlType={'button'} type={'default'} onClick={this.handleResetForm}>
            <Icon type="close" />
            <span>Discard</span>
          </Button>
          <Button htmlType={'submit'} type={'primary'}>
            <Icon type="check" />
            <span>Submit</span>
          </Button>
        </ActionTableGeneral>
      </TableEntryContainer>
    );
  }
}

export default LiabilitiesTable;
