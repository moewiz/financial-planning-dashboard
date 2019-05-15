import React, { PureComponent } from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import ExpandedAssetsRow from './ExpandedAssetsRow';
import { TableEntryContainer, HeaderTitleTable, TextTitle, ActionTableGeneral } from '../../../pages/client/styled';
import GeneralTable from '../GeneralTable';
import { FormikProps } from 'formik';
import { isFunction } from 'lodash';
import { addKeyToArray } from '../DataEntry';

interface AssetsTableProps {
  data: object[];
  loading?: boolean;

  formProps?: FormikProps<any>;
  tableName?: string;
  setFieldValue?: (field: string, value: any) => void;
  resetForm: (nextValues?: any) => void;
  addRow: (row: any) => void;
  deleteRow: (key: number) => void;
}

interface AssetsTableState {
  dataSource: object[];
  count: number;
}

class AssetsTable extends PureComponent<AssetsTableProps, AssetsTableState> {
  public state = {
    dataSource: addKeyToArray(this.props.data),
    count: this.props.data.length,
  };

  public columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      width: '13%',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: '1',
      width: '12%',
      type: 'select',
      options: [
        { value: 'lifestyle', label: 'Lifestyle' },
        { value: 'directInvestment', label: 'Direct Investment' },
        { value: 'accountBased', label: 'Account Based' },
        { value: 'super', label: 'Super' },
      ],
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: '2',
      type: 'select',
      options: [{ value: 'client', label: 'Client' }],
      width: 'calc(13% - 20px)',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '3',
      type: 'number',
      width: 'calc(13% - 20px)',
    },
    {
      title: 'Investment',
      dataIndex: 'investment',
      key: '4',
      width: '13%',
      type: 'select',
      options: [
        { value: 'primaryResidence', label: 'Primary Residence' },
        { value: 'australianEquity', label: 'Australian Equity' },
        { value: 'preservation', label: 'Preservation' },
        { value: 'moderate', label: 'Moderate' },
      ],
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '5',
      width: '13%',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '6',
      width: '13%',
    },
    {
      title: 'Action',
      key: 'operation',
      editable: false,
      width: '10%',
    },
  ];

  private tableName = 'assets';

  public componentDidUpdate(prevProps: Readonly<AssetsTableProps>, prevState: Readonly<{}>, snapshot?: any): void {
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
      description: 'Home',
      type: 'lifestyle',
      owner: 'client',
      value: 25000,
      investment: 'primaryResidence',
      from: {
        type: 'existing',
        yearValue: null,
      },
      to: {
        type: 'retain',
        yearValue: null,
      },
      expandable: {
        growthRate: 3.2,
        costBase: 0,
        isCGTAssessable: true,
      },
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
    const { loading, data } = this.props;
    const columns = this.columns.map((col: any) => {
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
          <TextTitle>{'Assets'}</TextTitle>
        </HeaderTitleTable>
        <GeneralTable
          loading={loading || false}
          columns={columns}
          dataSource={data}
          pagination={false}
          expandedRowRender={ExpandedAssetsRow}
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

export default AssetsTable;
