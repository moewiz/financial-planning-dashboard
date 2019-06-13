import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import ExpandedBasicInformationRow from './ExpandedBasicInformationRow';
import { HeaderTitleTable, TableEntryContainer, TextTitle } from '../../../pages/client/styled';
import GeneralTable from '../GeneralTable';
import { get, isFunction } from 'lodash';
import { connect } from 'react-redux';
import { StandardAction } from '../../../reducers/reducerTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { ClientActions, UpdateEmpStatus, UpdateMaritalStatusAction } from '../../../reducers/client';
import { empStatusOptions, genderOptions, maritalStatusOptions } from '../../../enums/options';

interface BasicInformationProps {
  data?: object[];
  loading?: boolean;

  addRow: (row: any) => void;
  deleteRow: (index: number) => void;
  setFieldValue: (field: string, value: any) => void;
  setFieldTouched: (field: string, isTouched?: boolean | undefined) => void;

  updateMaritalStatus?: (maritalStatus: string) => UpdateMaritalStatusAction;
  updateEmpStatus?: (empStatus: string) => UpdateEmpStatus;
}

class BasicInformationTable extends PureComponent<BasicInformationProps> {
  public columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      width: 'calc(23% - 20px)',
      type: 'text',
      editable: false,
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
      width: '14%',
    },
    {
      title: 'Emp Status',
      dataIndex: 'empStatus',
      type: 'select',
      width: '17%',
      options: empStatusOptions,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      type: 'select',
      width: '12%',
      options: genderOptions,
    },
    {
      title: 'Marital State',
      dataIndex: 'maritalStatus',
      type: 'select',
      width: 'calc(11% - 20px)',
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

  public handleDelete = (index: number) => {
    const { deleteRow } = this.props;

    // update formik
    if (isFunction(deleteRow)) {
      deleteRow(index);
    }
  }

  public handleAdd = () => {
    const { addRow, data } = this.props;

    if (!data) return;
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
        maritalStatus: 'married',
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

  public render() {
    const { loading, data, setFieldValue, setFieldTouched } = this.props;
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
            setFieldValue,
            setFieldTouched,
            editable,
            handleSave: this.handleSave,
          };
        },
      };
    });
    console.log('BasicInformation table rendered, props', this.props);

    return (
      <TableEntryContainer>
        <HeaderTitleTable>
          <Icon type={'user'} />
          <TextTitle>{'Basic Information'}</TextTitle>
        </HeaderTitleTable>
        <GeneralTable
          loading={loading || false}
          columns={columns}
          dataSource={data || []}
          pagination={false}
          expandedRowRender={ExpandedBasicInformationRow}
          className={`${this.tableName}-table`}
        />
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

export const EnhanceBasicInformationTable = connect(
  null,
  mapDispatchToProps,
)(BasicInformationTable);

export default BasicInformationTable;
