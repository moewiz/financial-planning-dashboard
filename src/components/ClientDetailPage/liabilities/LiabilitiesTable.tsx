import React, { PureComponent } from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import { get, isFunction } from 'lodash';
import { TableEntryContainer, HeaderTitleTable, TextTitle, ActionTableGeneral } from '../../../pages/client/styled';
import ExpandedLiabilitiesRow, { LiabilityProps } from './ExpandedLiabilitiesRow';
import GeneralTable from '../GeneralTable';
import { to2Options, liabilitiesTypes, ownerOptions, from2Options } from '../../../enums/options';
import { removePartnerOption } from '../../../utils/columnUtils';

interface LiabilitiesTableProps {
  data: object[];
  maritalState: string;
  assets: Array<{ refId: number; description: string; type: string }>;
  loading?: boolean;

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
      width: 'calc(13% - 20px)',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: '1',
      width: 'calc(12% - 20px)',
      type: 'select',
      options: liabilitiesTypes,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: '2',
      width: '13%',
      type: 'select',
      options: ownerOptions,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '3',
      width: '13%',
      type: 'number',
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: '4',
      width: '13%',
      type: 'number',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '5',
      type: 'date',
      width: '13%',
      pickerType: 'custom',
      options: from2Options,
      className: 'table-expand-datepicker',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '6',
      width: '13%',
      type: 'date',
      pickerType: 'custom',
      className: 'table-expand-datepicker',
      options: to2Options,
    },
    {
      title: 'Action',
      key: 'operation',
      editable: false,
      width: '10%',
    },
  ];

  private tableName = 'liabilities';

  public componentDidUpdate(prevProps: Readonly<LiabilitiesTableProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const { maritalState, setFieldValue, data } = this.props;
    if (prevProps.maritalState !== maritalState && maritalState === 'single') {
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
    const { deleteRow } = this.props;

    // update formik
    if (isFunction(deleteRow)) {
      deleteRow(key);
    }
  }

  public handleAdd = () => {
    const { addRow } = this.props;
    const newData = {
      key: Date.now(),
      description: 'Home Loan',
      type: 'nonDeductible',
      owner: 'client',
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

    // update formik
    if (isFunction(addRow)) {
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
    const tableData = get(data[index], tableName);
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
    const { loading, data, maritalState, assets } = this.props;
    const columns = this.columns.map((col) => {
      const options = removePartnerOption(col, maritalState);
      const editable = col.editable === false ? false : 'true';
      if (col.key === 'operation') {
        return {
          ...col,
          title: 'Action',
          key: 'operation',
          width: '10%',
          render: (text: any, record: any) => (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a href="javascript:">Delete</a>
            </Popconfirm>
          ),
        };
      }

      return {
        ...col,
        onCell: (record: any, rowIndex: number) => ({
          ...col,
          options,
          rowIndex,
          tableName: this.tableName,
          type: col.type || 'text',
          record,
          editable,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <TableEntryContainer>
        <HeaderTitleTable>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.handleAdd} />
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
              maritalState={maritalState}
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
