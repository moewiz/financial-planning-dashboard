import React, { PureComponent } from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import { ActionTableGeneral, HeaderTitleTable, TableEntryContainer, TextTitle } from '../styled';
import { isFunction } from 'lodash';
import GeneralTable from '../GeneralTable';
import { FormikProps } from 'formik';
import { addKeyToArray } from '../DataEntry';
import ExpandedAssetsRow from '../assets/ExpandedAssetsRow';

interface IncomeTableProps {
  data: object[];
  loading?: boolean;

  formProps?: FormikProps<any>;
  tableName?: string;
  setFieldValue?: (field: string, value: any) => void;
  resetForm: (nextValues?: any) => void;
  addRow: (row: any) => void;
  deleteRow: (key: number) => void;
}

interface IncomeTableState {
  dataSource: object[];
  count: number;
}

class IncomeTable extends PureComponent<IncomeTableProps, IncomeTableState> {
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
      options: [{ value: 'employment', label: 'Employment' }, { value: 'taxable', label: 'Taxable' }],
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
      title: 'Indexation',
      dataIndex: 'indexation',
      key: '4',
      width: '13%',
      type: 'select',
      options: [
        { value: 'salaryInflation', label: 'Salary Inflation' },
        { value: 'inflationCPI', label: 'Inflation (CPI)' },
      ],
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '5',
      type: 'date',
      width: '13%',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '6',
      width: '13%',
      type: 'date',
    },
    {
      title: 'Action',
      key: 'operation',
      editable: false,
      width: '10%',
    },
  ];

  private tableName = 'income';

  public componentDidUpdate(prevProps: Readonly<IncomeTableProps>, prevState: Readonly<{}>, snapshot?: any): void {
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
      key: count,
      description: 'Salary',
      type: 'employment',
      owner: 'client',
      value: 1000,
      indexation: 'salaryInflation',
      from: 'start',
      to: 'clientRetirement',
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

      if (!editable) {
        return col;
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
          <TextTitle>{'Income'}</TextTitle>
        </HeaderTitleTable>
        <GeneralTable
          loading={loading || false}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          expandedRowRender={ExpandedAssetsRow}
          className={'income-table'}
        />
        <ActionTableGeneral>
          <Button htmlType={'button'} type={'default'} onClick={this.handleResetForm}>
            Discard
          </Button>
          <Button htmlType={'submit'} type={'primary'}>
            Submit
          </Button>
        </ActionTableGeneral>
      </TableEntryContainer>
    );
  }
}

export default IncomeTable;
