import React, { PureComponent } from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import { FormikProps } from 'formik';
import { isFunction } from 'lodash';
import { ActionTableGeneral, HeaderTitleTable, TableEntryContainer, TextTitle } from '../../../pages/client/styled';
import GeneralTable from '../GeneralTable';
import {
  from1Options,
  to1Options,
  expenditureTypeOptions,
  indexationOptions,
  ownerWithJointOptions,
} from '../../../enums/options';
import { loadOptionsBaseOnCol } from '../../../utils/columnUtils';

interface ExpenditureTableProps {
  data: object[];
  maritalState: string;
  dynamicCustomValue: object;
  loading?: boolean;

  formProps?: FormikProps<any>;
  tableName?: string;
  setFieldValue: (field: string, value: any) => void;
  resetForm: (nextValues?: any) => void;
  submitForm: () => void;
  addRow: (row: any) => void;
  deleteRow: (key: number) => void;
}

class ExpenditureTable extends PureComponent<ExpenditureTableProps> {
  public columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      width: 'calc(13% - 20px)',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: '1',
      width: 'calc(12% - 20px)',
      type: 'select',
      options: expenditureTypeOptions,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: '2',
      width: '13%',
      type: 'select',
      options: ownerWithJointOptions,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '3',
      width: '13%',
      type: 'number',
    },
    {
      title: 'Indexation',
      dataIndex: 'indexation',
      key: '4',
      width: '13%',
      type: 'select',
      options: indexationOptions,
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '5',
      type: 'date',
      width: '13%',
      pickerType: 'custom',
      options: from1Options,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '6',
      width: '13%',
      type: 'date',
      pickerType: 'custom',
      options: to1Options,
    },
    {
      title: 'Action',
      key: 'operation',
      editable: false,
      width: '10%',
    },
  ];

  private tableName = 'expenditure';

  public componentDidUpdate(prevProps: Readonly<ExpenditureTableProps>, prevState: Readonly<{}>, snapshot?: any): void {
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
      description: 'Living Expenses',
      type: 'postTax',
      owner: 'client',
      value: 25000.0,
      indexation: 'inflationCPI',
      from: {
        type: 'start',
        yearValue: null,
      },
      to: {
        type: 'end',
        yearValue: null,
      },
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

  public render() {
    const { loading, data, maritalState, dynamicCustomValue } = this.props;
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
          const options = loadOptionsBaseOnCol(col, record, { maritalState, dynamicCustomValue });
          return {
            ...col,
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
          <Icon type={'plus-square'} theme={'filled'} onClick={this.handleAdd} />
          <TextTitle>{'Expenditure'}</TextTitle>
        </HeaderTitleTable>
        <GeneralTable
          loading={loading || false}
          columns={columns}
          dataSource={data}
          pagination={false}
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

export default ExpenditureTable;
