import React, { PureComponent } from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import { isFunction } from 'lodash';
import { TableEntryContainer, HeaderTitleTable, TextTitle, ActionTableGeneral } from '../../../pages/client/styled';
import ExpandedLiabilitiesRow from './ExpandedLiabilitiesRow';
import GeneralTable from '../GeneralTable';
import { FormikProps } from 'formik';
import { addKeyToArray } from '../DataEntry';

interface LiabilitiesTableProps {
  data: object[];
  loading?: boolean;

  formProps?: FormikProps<any>;
  tableName?: string;
  setFieldValue?: (field: string, value: any) => void;
  resetForm: (nextValues?: any) => void;
  addRow: (row: any) => void;
  deleteRow: (key: number) => void;
}

interface LiabilitiesTableState {
  dataSource: object[];
  count: number;
}

class LiabilitiesTable extends PureComponent<LiabilitiesTableProps, LiabilitiesTableState> {
  public state = {
    dataSource: addKeyToArray(this.props.data),
    count: this.props.data.length,
  };

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
      options: [{ value: 'nonDeductible', label: 'Non-Deductible' }, { value: 'deductible', label: 'Deductible' }],
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: '2',
      width: '13%',
      type: 'select',
      options: [{ value: 'client', label: 'Client' }, { value: 'partner', label: 'Partner' }],
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '3',
      width: '13%',
      type: 'text',
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: '4',
      width: '13%',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '5',
      type: 'date',
      width: '13%',
      pickerType: 'custom',
      options: [
        { value: '23/7/1999', label: 'Start' },
        { value: '24/6/2004', label: `Client's Retirement` },
        { value: '31/12/2005', label: `Partner's Retirement` },
      ],
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '6',
      width: '13%',
      type: 'date',
      pickerType: 'custom',
      options: [
        { value: '1/5/2005', label: 'End' },
        { value: '25/6/2009', label: `Client's Retirement` },
        { value: '18/7/2012', label: `Partner's Retirement` },
      ],
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
    if (this.props.loading !== prevProps.loading) {
      this.setState({
        dataSource: addKeyToArray(this.props.data),
        count: this.props.data.length,
      });
    }
  }

  public handleDelete = (key: number) => {
    const { deleteRow } = this.props;

    // update formik
    if (isFunction(deleteRow)) {
      deleteRow(key);
    }

    // update table
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter((item) => item.key !== key) });
  }

  public handleAdd = () => {
    const { addRow } = this.props;
    const { count, dataSource } = this.state;
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
      drawdowns: [
        {
          // id: 1,
          value: 18000.0,
          from: {
            type: 'start',
            yearValue: null,
          },
          to: {
            type: 'end',
            yearValue: null,
          },
        },
      ],
    };

    // update formik
    if (isFunction(addRow)) {
      addRow(newData);
    }

    // update table
    dataSource.unshift(newData);
    this.setState({
      dataSource,
      count: count + 1,
    });
  }

  public handleSave = (arg: { tableName: string; rowIndex: number; dataIndex: string; value: any; record: any }) => {
    const { tableName, rowIndex, dataIndex, value, record } = arg;
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((data) => record.key === data.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      [dataIndex]: value,
    });
    this.setState({ dataSource: newData });
  }

  public handleResetForm = () => {
    const { resetForm, data } = this.props;
    if (isFunction(resetForm)) {
      resetForm();
    }
    this.setState({
      dataSource: addKeyToArray(data),
      count: data.length,
    });
  }

  public render() {
    const { dataSource } = this.state;
    const { loading } = this.props;
    const columns = this.columns.map((col) => {
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
          dataSource={dataSource}
          pagination={false}
          expandedRowRender={ExpandedLiabilitiesRow}
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
