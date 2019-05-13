import React, { PureComponent } from 'react';
import { Button, Icon } from 'antd';
import ExpandedBasicInformationRow from './ExpandedBasicInformationRow';
import { ActionTableGeneral, HeaderTitleTable, TableEntryContainer, TextTitle } from '../../../pages/client/styled';
import GeneralTable from '../GeneralTable';
import { FormikProps } from 'formik';
import { addKeyToArray } from '../DataEntry';
import { isFunction } from 'lodash';

interface BasicInformationProps {
  data: object[];
  loading?: boolean;

  formProps?: FormikProps<any>;
  tableName?: string;
  setFieldValue?: (field: string, value: any) => void;
  resetForm: (nextValues?: any) => void;
  addRow: (row: any) => void;
  deleteRow: (key: number) => void;
}

interface BasicInformationState {
  dataSource: object[];
  count: number;
}

class BasicInformationTable extends PureComponent<BasicInformationProps, BasicInformationState> {
  public state = {
    dataSource: addKeyToArray(this.props.data),
    count: this.props.data.length,
  };

  public columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      width: 'calc(15% - 20px)',
      type: 'text',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      type: 'text',
      width: '12%',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      type: 'text',
      width: '13%',
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      type: 'date',
      width: '15%',
    },
    {
      title: 'Emp Status',
      dataIndex: 'empStatus',
      type: 'select',
      width: '15%',
      options: [{ value: 'selfEmployed', label: 'Self-employed' }, { value: 'unemployed', label: 'Unemployed' }],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      type: 'select',
      width: '15%',
      options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }],
    },
    {
      title: 'Marital State',
      dataIndex: 'maritalState',
      type: 'select',
      width: 'calc(15% - 20px)',
      options: [{ value: 'married', label: 'Married' }, { value: 'unMarried', label: 'Unmarried' }],
    },
  ];

  private tableName = 'basicInformation';

  public componentDidUpdate(prevProps: Readonly<BasicInformationProps>, prevState: Readonly<{}>, snapshot?: any): void {
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

    // only 1 partner
    if (dataSource.length === 1) {
      const newData = {
        key: count,
        description: 'Partner',
        firstName: 'Susane',
        lastName: 'Diaz',
        dob: 1555924936,
        empStatus: 'unemployed',
        retirementYear: '1555924936',
        maritalState: 'married',
        expandable: {
          riskProfile: 'highGrowth',
          hasPrivateHealthInsurance: false,
          jointRiskProfile: 'defensive',
        },
      };

      // update formik
      if (isFunction(addRow)) {
        addRow(newData);
      }

      // update table
      dataSource.push(newData);
      this.setState({
        dataSource,
        count: count + 1,
      });
    }
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

    // side effect
    if (rowIndex === 0 && dataIndex === 'maritalState') {
      if (value === 'unMarried') {
        this.handleDelete(1);
      }
      if (value === 'married') {
        this.handleAdd();
      }
    }
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
      // const editable = col.editable === false ? false : 'true';
      const editable = 'true';

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
          <Icon type={'user'} />
          <TextTitle>{'Basic Information'}</TextTitle>
        </HeaderTitleTable>
        <GeneralTable
          loading={loading || false}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          expandedRowRender={ExpandedBasicInformationRow}
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

export default BasicInformationTable;
