import React, { PureComponent } from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import { isFunction } from 'lodash';
import { FormikProps } from 'formik';

import GeneralTable from '../GeneralTable';
import { ActionTableGeneral, HeaderTitleTable, TableEntryContainer, TextTitle } from '../../../pages/client/styled';
import {
  maritalStatusOptions,
  ownerOptions,
  incomeTypeOptions,
  from1Options,
  to1Options,
  indexationOptions,
} from '../../../enums/options';
import { loadOptionsBaseOnCol } from '../../../utils/columnUtils';
import { CurrentTypes } from '../../../enums/currents';
import AddMenu from '../AddMenu';
import { createEvent } from '../../../utils/GA';
import { sortAlphabetical } from '../../../utils/sort';

interface IncomeTableProps {
  data: object[];
  maritalStatus: string;
  dynamicCustomValue: object;
  clientId: number;
  loading?: boolean;

  formProps?: FormikProps<any>;
  tableName?: string;
  setFieldValue: (field: string, value: any) => void;
  resetForm: (nextValues?: any) => void;
  submitForm: () => void;
  addRow: (row: any) => void;
  deleteRow: (key: number) => void;
}

class IncomeTable extends PureComponent<IncomeTableProps> {
  public columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      type: 'text',
      key: '0',
      width: 'calc(19% - 20px)',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: '1',
      width: 'calc(11% - 20px)',
      type: 'select',
      options: incomeTypeOptions,
      sorter: sortAlphabetical('type'),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: '2',
      width: '9%',
      type: 'select',
      options: ownerOptions,
      sorter: sortAlphabetical('owner'),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '3',
      width: '10%',
      type: 'number',
      sign: 'dollar',
      className: 'text-align-right',
    },
    {
      title: 'Indexation',
      dataIndex: 'indexation',
      key: '4',
      width: '25%',
      type: 'select',
      options: indexationOptions,
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '5',
      type: 'date',
      width: '9%',
      pickerType: 'custom',
      options: from1Options,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '6',
      width: '17%',
      type: 'date',
      pickerType: 'custom',
      options: to1Options,
    },
    {
      title: '',
      key: 'operation',
      className: 'text-align-center',
      editable: false,
      width: 28,
    },
  ];

  private tableName = 'income';

  public componentDidUpdate(prevProps: Readonly<IncomeTableProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const { maritalStatus, setFieldValue, data } = this.props;
    if (prevProps.maritalStatus !== maritalStatus && maritalStatus === maritalStatusOptions[1].value) {
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
      createEvent('current_position', 'delete', 'Income', clientId);
      deleteRow(key);
    }
  }

  public handleAdd = (value: string[]) => {
    const { addRow, clientId } = this.props;
    const [owner, type] = value;
    const newData = {
      key: Date.now(),
      description: 'Salary',
      type,
      owner,
      value: 1000,
      indexation: 'salaryInflation',
      from: {
        type: 'start',
        yearValue: null,
      },
      to: {
        type: 'clientRetirement',
        yearValue: null,
      },
    };

    if (isFunction(addRow)) {
      createEvent('current_position', 'create', 'Income', clientId);
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
    const { loading, data, maritalStatus, dynamicCustomValue } = this.props;
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
          const options = loadOptionsBaseOnCol(col, record, { maritalStatus, dynamicCustomValue });

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
          <AddMenu onClick={this.handleAdd} type={CurrentTypes.Income} maritalStatus={maritalStatus} />
          <TextTitle>{'Income'}</TextTitle>
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

export default IncomeTable;
