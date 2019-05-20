import React, { PureComponent } from 'react';
import { Button, Icon, Modal } from 'antd';
import ExpandedBasicInformationRow from './ExpandedBasicInformationRow';
import { ActionTableGeneral, HeaderTitleTable, TableEntryContainer, TextTitle } from '../../../pages/client/styled';
import GeneralTable from '../GeneralTable';
import { FormikProps } from 'formik';
import { isFunction } from 'lodash';
import { connect } from 'react-redux';
import { StandardAction } from '../../../reducers/reducerTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { ClientActions, UpdateMaritalStateAction } from '../../../reducers/client';
const confirm = Modal.confirm;

interface BasicInformationProps {
  data: object[];
  loading?: boolean;

  formProps?: FormikProps<any>;
  tableName?: string;
  setFieldValue?: (field: string, value: any) => void;
  resetForm: (nextValues?: any) => void;
  submitForm: () => void;
  addRow: (row: any) => void;
  deleteRow: (key: number) => void;

  updateMaritalState?: (maritalState: string) => UpdateMaritalStateAction;
}

class BasicInformationTable extends PureComponent<BasicInformationProps> {
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
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'selfEmployed', label: 'Self Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'unemployed', label: 'Unemployed' },
      ],
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
      options: [{ value: 'married', label: 'Married' }, { value: 'single', label: 'Single' }],
    },
  ];

  private tableName = 'basicInformation';

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
    const { addRow, data } = this.props;

    // only 1 partner
    if (data.length === 1) {
      const newData = {
        key: 1,
        description: 'Partner',
        firstName: 'Susane',
        lastName: 'Diaz',
        dob: '27/05/1978',
        empStatus: 'unemployed',
        gender: 'female',
        maritalState: 'married',
        expandable: {
          riskProfile: 'highGrowth',
          hasPrivateHealthInsurance: true,
          jointRiskProfile: 'defensive',
          retirementYear: null,
          isSmoker: false,
        },
      };

      // update formik
      if (isFunction(addRow)) {
        addRow(newData);
      }
    }
  }

  public showConfirm(onOk: () => void, onCancel?: () => void) {
    confirm({
      title: 'Do you want to change All Owner to Client?',
      onOk,
      onCancel,
    });
  }

  public handleSave = (arg: { tableName: string; rowIndex: number; dataIndex: string; value: any; record: any }) => {
    const { rowIndex, dataIndex, value } = arg;

    /**
     * side effect
     */
    if (rowIndex === 0 && dataIndex === 'maritalState') {
      const { updateMaritalState } = this.props;

      if (value === 'single') {
        this.handleDelete(1);
        this.showConfirm(() => {
          // update marital state in redux store
          if (updateMaritalState) {
            updateMaritalState(value);
          }
        });
      }
      if (value === 'married') {
        this.handleAdd();
        // update marital state in redux store
        if (updateMaritalState) {
          updateMaritalState(value);
        }
      }
    }
  }

  public handleResetForm = () => {
    const { resetForm } = this.props;
    if (isFunction(resetForm)) {
      resetForm();
    }
  }

  public render() {
    const { loading, data } = this.props;
    const columns = this.columns.map((col) => {
      return {
        ...col,
        onCell: (record: any, rowIndex: number) => ({
          ...col,
          rowIndex,
          tableName: this.tableName,
          type: col.type || 'text',
          record,
          editable: 'true',
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
          dataSource={data}
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

const mapDispatchToProps = (dispatch: Dispatch<StandardAction<any>>) =>
  bindActionCreators(
    {
      updateMaritalState: ClientActions.updateMaritalState,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(BasicInformationTable);
