import React, { PureComponent } from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import ExpandedAssetsRow, { AssetProps } from './ExpandedAssetsRowWrapper';
import { TableEntryContainer, HeaderTitleTable, TextTitle, ActionTableGeneral } from '../../../pages/client/styled';
import GeneralTable from '../GeneralTable';
import { FormikProps } from 'formik';
import { isFunction, get } from 'lodash';
import { from2Options, ownerOptions, to2Options, assetTypes, investmentTypeOptions } from '../../../enums/options';
import { loadOptionsBaseOnCol } from '../../../utils/columnUtils';

interface AssetsTableProps {
  data: object[];
  maritalState: string;
  dynamicCustomValue: object;
  empStatus: string;
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
      width: '13%',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: '1',
      width: '12%',
      type: 'select',
      options: assetTypes,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: '2',
      type: 'select',
      options: ownerOptions,
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
      options: investmentTypeOptions,
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '5',
      type: 'date',
      width: '13%',
      pickerType: 'custom',
      options: from2Options,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '6',
      width: '13%',
      type: 'date',
      pickerType: 'custom',
      options: to2Options,
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
      refId: Date.now(),
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

  public render() {
    const { loading, data, maritalState, dynamicCustomValue, empStatus } = this.props;
    const columns = this.columns.map((col: any) => {
      const editable = col.editable === false ? false : 'true';
      if (col.key === 'operation') {
        return {
          ...col,
          title: 'Action',
          key: 'operation',
          width: '10%',
          render: (text: any, record: any) => (
            <Popconfirm title="Really delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a href="javascript:">Delete</a>
            </Popconfirm>
          ),
        };
      }

      return {
        ...col,
        onCell: (record: any, rowIndex: number) => {
          const options = loadOptionsBaseOnCol(col, record, { maritalState });

          return {
            ...col,
            options,
            rowIndex,
            tableName: this.tableName,
            type: col.type || 'text',
            record: { ...record, maritalState },
            editable,
            handleSave: this.handleSave,
          };
        },
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
          expandedRowRender={(record: AssetProps, index: number, indent: number, expanded: boolean) => (
            <ExpandedAssetsRow
              record={record}
              index={index}
              indent={indent}
              expanded={expanded}
              maritalState={maritalState}
              addRow={this.addRowInnerTable}
              deleteRow={this.removeRowInnerTable}
              dynamicCustomValue={dynamicCustomValue}
              empStatus={empStatus}
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

export default AssetsTable;
