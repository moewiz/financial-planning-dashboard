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
import { CurrentTypes } from '../../../enums/currents';
import AddMenu from '../AddMenu';
import { createEvent } from '../../../utils/GA';
import { sortAlphabetical } from '../../../utils/sort';

interface ExpenditureTableProps {
  data: object[];
  maritalStatus: string;
  dynamicCustomValue: object;
  loading?: boolean;
  clientId: number;

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
      width: 'calc(23% - 20px)',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: '1',
      width: 'calc(8% - 20px)',
      type: 'select',
      options: expenditureTypeOptions,
      sorter: sortAlphabetical('type'),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: '2',
      width: '9%',
      type: 'select',
      options: ownerWithJointOptions,
      sorter: sortAlphabetical('owner'),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '3',
      width: '14%',
      type: 'number',
      sign: 'dollar',
      className: 'text-align-right',
    },
    {
      title: 'Indexation',
      dataIndex: 'indexation',
      key: '4',
      width: '26%',
      type: 'select',
      options: indexationOptions,
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '5',
      type: 'date',
      width: '10%',
      pickerType: 'custom',
      options: from1Options,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '6',
      width: '10%',
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

  private animationTime = 450;
  private tableName = 'expenditure';

  public componentDidUpdate(prevProps: Readonly<ExpenditureTableProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const { maritalStatus, setFieldValue, data } = this.props;
    if (prevProps.maritalStatus !== maritalStatus && maritalStatus === 'single') {
      // update All Owner to Client
      const newData = data.map((d) => ({ ...d, owner: 'client' }));
      setFieldValue(this.tableName, newData);
    }
  }

  public cursorGoToDescriptionField = (key: number) => {
    // Ensure the animation is end
    setTimeout(() => {
      // The new row might be is added to randomly position if the table is applying sort function
      // Make sure the cursor moves to the new row just added
      const descriptionInput: HTMLElement | null = document.querySelector(
        `.expenditure-table tr[data-row-key="${key}"] .ant-input`,
      );
      if (descriptionInput && descriptionInput.focus) {
        descriptionInput.focus();
      }
    }, this.animationTime);
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
      createEvent('current_position', 'delete', 'Expenditure', clientId);
      deleteRow(key);
    }
  }

  public handleAdd = (value: string[]) => {
    const { addRow, clientId } = this.props;
    const [owner, type] = value;
    const newData = {
      key: Date.now(),
      description: '',
      type,
      owner,
      value: null,
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

    if (isFunction(addRow)) {
      createEvent('current_position', 'create', 'Expenditure', clientId);
      addRow(newData);
      this.cursorGoToDescriptionField(newData.key);
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
          <AddMenu onClick={this.handleAdd} type={CurrentTypes.Expenditure} maritalStatus={maritalStatus} />
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
