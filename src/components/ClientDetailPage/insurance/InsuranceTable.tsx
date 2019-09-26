import React, { PureComponent } from 'react';
import { Button, Icon, Popconfirm } from 'antd';
import { isFunction, get } from 'lodash';
import { TableEntryContainer, HeaderTitleTable, TextTitle, ActionTableGeneral } from '../../../pages/client/styled';
import ExpandedInsuranceRow, { InsuranceProps } from './ExpandedInsuranceRow';
import GeneralTable from '../GeneralTable';
import { FormikProps } from 'formik';
import { ownerWithJointOptions } from '../../../enums/options';
import { removePartnerOption } from '../../../utils/columnUtils';

interface InsuranceTableProps {
  data: object[];
  maritalStatus: string;
  loading?: boolean;

  formProps?: FormikProps<any>;
  tableName?: string;
  setFieldValue: (field: string, value: any) => void;
  resetForm: (nextValues?: any) => void;
  submitForm: () => void;
  addRow: (row: any) => void;
  deleteRow: (key: number) => void;
  dynamicCustomValue: object;
}

class InsuranceTable extends PureComponent<InsuranceTableProps> {
  public columns = [
    {
      title: 'Provider',
      dataIndex: 'provider',
      type: 'text',
      key: '0',
      width: 160,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: '2',
      type: 'select',
      options: ownerWithJointOptions,
    },
    {
      title: 'Delete',
      key: 'operation',
      width: 60,
      className: 'text-align-center',
      editable: false,
    },
  ];

  private tableName = 'insurance';

  public componentDidUpdate(prevProps: Readonly<InsuranceTableProps>, prevState: Readonly<{}>, snapshot?: any): void {
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
      provider: 'ABC',
      owner: 'client',
      premiumFeeDetails: [
        {
          key: 0,
          feeType: 'premium',
          amount: 80000.0,
          frequency: 'yearly',
          specialNote: 'Sample note',
        },
      ],
      coverDetails: [
        {
          refId: 0,
          key: 0,
          coverType: 'life',
          policyOwner: 'superFund',
          benefitAmount: 200000.0,
          premiumType: 'stepped',
          notes: 'Sample Note.',
          expandable: {
            isLinked: false,
            linkedProduct: null,
          },
        },
      ],
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
    const { loading, data, maritalStatus, dynamicCustomValue } = this.props;
    const columns = this.columns.map((col) => {
      const options = removePartnerOption(col, maritalStatus);
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
        onCell: (record: any, rowIndex: number) => ({
          ...col,
          rowIndex,
          options,
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
          <TextTitle>{'Insurance'}</TextTitle>
        </HeaderTitleTable>
        <GeneralTable
          loading={loading || false}
          columns={columns}
          dataSource={data}
          pagination={false}
          expandedRowRender={(record: InsuranceProps, index: number, indent: number, expanded: boolean) => (
            <ExpandedInsuranceRow
              record={record}
              index={index}
              indent={indent}
              expanded={expanded}
              addRow={this.addRowInnerTable}
              deleteRow={this.removeRowInnerTable}
              dynamicCustomValue={dynamicCustomValue}
              maritalStatus={maritalStatus}
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

export default InsuranceTable;
