import React, { PureComponent } from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import ExpandedAssetsRowWrapper from './ExpandedAssetsRowWrapper';
import { TableEntryContainer, HeaderTitleTable, TextTitle, ActionTableGeneral } from '../../../pages/client/styled';
import GeneralTable from '../GeneralTable';
import { FormikProps } from 'formik';
import { isFunction } from 'lodash';
import { from2Options, ownerOptions, to2Options, assetTypes, investmentTypes } from '../../../enums/options';
import {addJointOption, loadOptionsBaseOnCol, removePartnerOption} from '../../../utils/columnUtils';

interface AssetsTableProps {
  data: object[];
  maritalState: string;
  loading?: boolean;

  formProps?: FormikProps<any>;
  tableName?: string;
  setFieldValue: (field: string, value: any) => void;
  resetForm: (nextValues?: any) => void;
  submitForm: () => void;
  addRow: (row: any) => void;
  deleteRow: (key: number) => void;
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
      options: investmentTypes,
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

    console.log('new row', newData);
    // update formik
    if (isFunction(addRow)) {
      addRow(newData);
    }
  }

  public handleSave = (arg: { tableName: string; rowIndex: number; dataIndex: string; value: any; record: any }) => {
  }

  public handleResetForm = () => {
    const { resetForm } = this.props;
    if (isFunction(resetForm)) {
      resetForm();
    }
  }

  public render() {
    const { loading, data, maritalState } = this.props;
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
        onCell: (record: any, rowIndex: number) => {
          const options = loadOptionsBaseOnCol(col, record, maritalState);

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
          expandedRowRender={ExpandedAssetsRowWrapper}
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
