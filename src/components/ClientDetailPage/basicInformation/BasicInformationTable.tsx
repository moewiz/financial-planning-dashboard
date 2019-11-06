import React, { PureComponent } from 'react';
import { Button, Icon } from 'antd';
import { bindActionCreators, Dispatch } from 'redux';
import { FormikProps } from 'formik';
import { connect } from 'react-redux';
import { isFunction, get } from 'lodash';
import { CURRENT_COLUMN_WIDTH } from '../../../enums/currents';

import ExpandedBasicInformationRow from './ExpandedBasicInformationRow';
import { ActionTableGeneral, HeaderTitleTable, TableEntryContainer, TextTitle } from '../../../pages/client/styled';
import GeneralTable from '../GeneralTable';
import { StandardAction } from '../../../reducers/reducerTypes';
import { ClientActions, UpdateEmpStatus, UpdateMaritalStatusAction } from '../../../reducers/client';
import { empStatusOptions, genderOptions, maritalStatusOptions } from '../../../enums/options';

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

  updateMaritalStatus?: (maritalStatus: string) => UpdateMaritalStatusAction;
  updateEmpStatus?: (empStatus: string) => UpdateEmpStatus;
}

class BasicInformationTable extends PureComponent<BasicInformationProps> {
  public columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      width: CURRENT_COLUMN_WIDTH.DescriptionIcon,
      type: 'text',
      editable: false,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      type: 'text',
      width: CURRENT_COLUMN_WIDTH.firstName,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      type: 'text',
      width: CURRENT_COLUMN_WIDTH.lastName,
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      type: 'date',
      width: CURRENT_COLUMN_WIDTH.DOB,
      showAge: true,
    },
    {
      title: 'Emp Status',
      dataIndex: 'empStatus',
      type: 'select',
      width: CURRENT_COLUMN_WIDTH.empStatus,
      options: empStatusOptions,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      type: 'select',
      width: CURRENT_COLUMN_WIDTH.gender,
      options: genderOptions,
    },
    {
      title: 'Marital Status',
      dataIndex: 'maritalStatus',
      type: 'select',
      width: CURRENT_COLUMN_WIDTH.maritalStatus,
      options: maritalStatusOptions,
      confirmTitle: {
        title: 'Remove partner?',
        content: 'This action will change all ownerships to the Client.',
        okText: 'Yes',
        cancelText: 'No',
        fieldValue: maritalStatusOptions[1].value,
      },
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
        firstName: '',
        lastName: get(data, [0, 'lastName'], ''),
        dob: '',
        empStatus: 'employed',
        gender: '',
        maritalStatus: 'married',
        expandable: {
          riskProfile: 'balanced',
          hasPrivateHealthInsurance: true,
          jointRiskProfile: 'balanced',
          retirementYear: 2023,
          isSmoker: false,
        },
      };

      if (isFunction(addRow)) {
        addRow(newData);
        setTimeout(() => {
          const nodeList: NodeListOf<HTMLElement> = document.querySelectorAll(
            `.basicInformation-table tr[data-row-key="${newData.key}"] input.ant-input`,
          );
          if (nodeList && nodeList[1] && nodeList[1].focus) {
            // First name input
            nodeList[1].focus();
          }
        }, 450);
      }
    }
  }

  public handleSave = (arg: { tableName: string; rowIndex: number; dataIndex: string; value: any; record: any }) => {
    const { rowIndex, dataIndex, value } = arg;

    /**
     * side effect
     */
    if (rowIndex === 0) {
      if (dataIndex === 'maritalStatus') {
        const { updateMaritalStatus } = this.props;
        // update marital state in redux store
        if (updateMaritalStatus) {
          updateMaritalStatus(value);
        }

        if (value === 'single') {
          this.handleDelete(1);
        }
        if (value === 'married') {
          this.handleAdd();
        }
      }
      if (dataIndex === 'empStatus') {
        const { updateEmpStatus } = this.props;
        if (updateEmpStatus) {
          updateEmpStatus(value);
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
        onCell: (record: any, rowIndex: number) => {
          const editable =
            col.editable === false ? false : rowIndex === 1 && col.dataIndex === 'maritalStatus' ? false : 'true';

          return {
            ...col,
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
      updateMaritalStatus: ClientActions.updateMaritalStatus,
      updateEmpStatus: ClientActions.updateEmpStatus,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(BasicInformationTable);
