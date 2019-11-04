import React, { PureComponent } from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import { FormikProps } from 'formik';
import { isFunction, get } from 'lodash';
import { PaginationConfig } from 'antd/lib/pagination';
import { TableCurrentDataSource } from 'antd/lib/table';

import GeneralTable from '../GeneralTable';
import { CURRENT_COLUMN_WIDTH } from '../../../enums/currents';
import ExpandedAssetsRow, { AssetProps } from './ExpandedAssetsRowWrapper';
import { TableEntryContainer, HeaderTitleTable, TextTitle, ActionTableGeneral } from '../../../pages/client/styled';
import { from2Options, ownerOptions, to2Options, assetTypes, investmentTypeOptions } from '../../../enums/options';
import { loadOptionsBaseOnCol } from '../../../utils/columnUtils';
import { CurrentTypes } from '../../../enums/currents';
import AddMenu from '../AddMenu';
import { createEvent } from '../../../utils/GA';
import { sortAlphabetical } from '../../../utils/sort';

interface AssetsTableProps {
  data: object[];
  maritalStatus: string;
  dynamicCustomValue: object;
  empStatus: string;
  clientId: number;
  loading?: boolean;

  formProps?: FormikProps<any>;
  tableName?: string;
  setFieldValue: (field: string, value: any) => void;
  resetForm: (nextValues?: any) => void;
  submitForm: () => void;
  addRow: (row: any) => void;
  deleteRow: (key: number) => void;
  updateAssets: (assets?: object[]) => void;
}

class AssetsTable extends PureComponent<AssetsTableProps> {
  public columns = [
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: '1',
      width: CURRENT_COLUMN_WIDTH.Default,
      type: 'select',
      options: assetTypes,
      sorter: sortAlphabetical('type'),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: '2',
      type: 'select',
      options: ownerOptions,
      width: CURRENT_COLUMN_WIDTH.Default,
      sorter: sortAlphabetical('owner'),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '3',
      type: 'number',
      sign: 'dollar',
      className: 'text-align-right',
      width: CURRENT_COLUMN_WIDTH.Default,
      // className: 'text-align-right',
    },
    {
      title: 'Investment',
      dataIndex: 'investment',
      key: '4',
      width: CURRENT_COLUMN_WIDTH.Double,
      type: 'select',
      options: investmentTypeOptions,
      sorter: sortAlphabetical('investment'),
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '5',
      type: 'date',
      width: CURRENT_COLUMN_WIDTH.Default,
      pickerType: 'custom',
      options: from2Options,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '6',
      width: CURRENT_COLUMN_WIDTH.Default,
      type: 'date',
      pickerType: 'custom',
      options: to2Options,
    },
    {
      title: '',
      key: 'operation',
      editable: false,
      width: CURRENT_COLUMN_WIDTH.Default,
      className: 'text-align-center',
    },
  ];

  private tableName = 'assets';

  public componentDidUpdate(prevProps: Readonly<AssetsTableProps>, prevState: Readonly<{}>, snapshot?: any): void {
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
      createEvent('current_position', 'delete', 'Assets', clientId);
      deleteRow(key);
    }
  }

  public handleAdd = (value: string[]) => {
    const { addRow, clientId } = this.props;
    const [owner, type] = value;
    const newData = {
      key: Date.now(),
      refId: Date.now(),
      description: 'Home',
      type,
      owner,
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

    if (isFunction(addRow)) {
      createEvent('current_position', 'create', 'Assets', clientId);
      addRow(newData);
    }
  }

  public handleSave = (arg: { tableName: string; rowIndex: number; dataIndex: string; value: any; record: any }) => {
    const { dataIndex } = arg;
    if (dataIndex === 'type' || dataIndex === 'description') {
      const { updateAssets, data } = this.props;
      updateAssets(data);
    }
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

  public onChange = (pagination: PaginationConfig, filters: any, sorter: any, extra: TableCurrentDataSource<any>) => {
    const { setFieldValue } = this.props;
    setFieldValue(this.tableName, extra.currentDataSource);
  }

  public render() {
    const { loading, data, maritalStatus, dynamicCustomValue, empStatus } = this.props;
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

      return {
        ...col,
        onCell: (record: any, rowIndex: number) => {
          const { sorter, ...cellProps } = col;
          const options = loadOptionsBaseOnCol(col, record, { maritalStatus });

          return {
            ...cellProps,
            options,
            rowIndex,
            tableName: this.tableName,
            type: col.type || 'text',
            record: { ...record, maritalStatus },
            editable,
            handleSave: this.handleSave,
          };
        },
      };
    });

    return (
      <TableEntryContainer>
        <HeaderTitleTable>
          <AddMenu onClick={this.handleAdd} type={CurrentTypes.Assets} maritalStatus={maritalStatus} />
          <TextTitle>{'Assets'}</TextTitle>
        </HeaderTitleTable>
        <GeneralTable
          loading={loading || false}
          columns={columns}
          dataSource={data}
          pagination={false}
          expandedRowRender={(record: AssetProps, index: number, indent: number, expanded: boolean) => (
            <ExpandedAssetsRow
              record={record}
              index={index}
              indent={indent}
              expanded={expanded}
              maritalStatus={maritalStatus}
              addRow={this.addRowInnerTable}
              deleteRow={this.removeRowInnerTable}
              dynamicCustomValue={dynamicCustomValue}
              empStatus={empStatus}
            />
          )}
          className={`${this.tableName}-table`}
          onChange={this.onChange}
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
