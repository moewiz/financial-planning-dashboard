import React, { createRef, PureComponent } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import BasicInformationTable from './basicInformation/BasicInformationTable';
import IncomeTable from './income/IncomeTable';
import ExpenditureTable from './expenditure/ExpenditureTable';
import AssetsTable from './assets/AssetsTable';
import LiabilitiesTable from './liabilities/LiabilitiesTable';
import InsuranceTable from './insurance/InsuranceTable';
import { Form, Formik, FormikActions, FormikProps } from 'formik';
import { connect } from 'react-redux';
import { RootState, StandardAction } from '../../reducers/reducerTypes';
import { find, map, isArray, isFunction, pick, get } from 'lodash';
import {
  Client,
  Tag,
  ClientActions,
  Table,
  DataEntry,
  UpdateMaritalStatusAction,
  UpdateAssetsAction,
  UpdateEmpStatus,
  UpdateDataEntryPayload,
  UpdateDataEntryAction,
} from '../../reducers/client';
import { Button, Icon } from 'antd';
import { ActionTableGeneral } from '../../pages/client/styled';

interface DataEntryProps {
  clientId: number;
  tagName: string;
  tabName: string;
  maritalStatus: string;
  empStatus: string;
  assets?: Array<{ refId: number; description: string; type: string }>;

  pageData?: Table;
  loading?: boolean;
  submitting?: boolean;
  updateDataEntry?: (payload: UpdateDataEntryPayload) => UpdateDataEntryAction;
  updateMaritalStatus?: (maritalStatus: string) => UpdateMaritalStatusAction;
  updateEmpStatus?: (empStatus: string) => UpdateEmpStatus;
  updateAssets?: (assets: Array<{ refId: number; description: string; type: string }>) => UpdateAssetsAction;
}

interface DataEntryState {
  formData: Table;
}

export const addKeyToArray = (array: object[], defaultValue?: any) => {
  if (isArray(array)) {
    return map(array, (d, index: number) => {
      const data: any = {};
      Object.entries(d).map(([key, value]) => {
        if (isArray(value)) {
          data[key] = addKeyToArray(value);
        } else {
          data[key] = value;
        }
      });
      return { key: index, ...data };
    });
  }

  return defaultValue;
};

class DataEntryComponent extends PureComponent<DataEntryProps> {
  public static defaultProps = {
    maritalStatus: '',
  };
  public readonly state: DataEntryState = {
    formData: {},
  };

  private readonly basicInformationForm = createRef<any>();
  private readonly incomeForm = createRef<any>();
  private readonly expenditureForm = createRef<any>();
  private readonly assetsForm = createRef<any>();
  private readonly liabilitiesForm = createRef<any>();
  private readonly insuranceForm = createRef<any>();

  public updateFormData = (values: object[]) => {
    const { formData } = this.state;

    this.setState({
      formData: {
        ...formData,
        ...values,
      },
    });
  }

  public componentDidUpdate(prevProps: Readonly<DataEntryProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const { loading, updateMaritalStatus, updateEmpStatus, pageData } = this.props;

    if (loading !== prevProps.loading && updateMaritalStatus && updateEmpStatus) {
      const maritalStatus = get(pageData, 'basicInformation[0].maritalStatus');
      const empStatus = get(pageData, 'basicInformation[0].empStatus');

      updateMaritalStatus(maritalStatus);
      updateEmpStatus(empStatus);
      this.updateAssets();
    }
  }

  public updateAssets = (assetsFormValue?: object[]) => {
    const { pageData, updateAssets } = this.props;
    const assetsSource = assetsFormValue || get(pageData, 'assets');
    const assets = map(assetsSource, (asset: any) => pick(asset, ['refId', 'description', 'type']));

    if (updateAssets) {
      updateAssets(assets);
    }
  }

  public componentWillUnmount(): void {
    const { updateMaritalStatus, updateEmpStatus, updateAssets } = this.props;

    // update marital state, emp status, assets in redux store
    if (updateMaritalStatus && updateEmpStatus && updateAssets) {
      updateMaritalStatus('');
      updateEmpStatus('');
      updateAssets([]);
    }
  }

  public handleDiscardForm = () => {
    if (this.basicInformationForm && this.basicInformationForm.current) {
      this.basicInformationForm.current.props.resetForm();
    }
    if (this.incomeForm) {
      this.incomeForm.current.resetForm();
    }
    if (this.expenditureForm) {
      this.expenditureForm.current.resetForm();
    }
    if (this.assetsForm) {
      this.assetsForm.current.resetForm();
    }
    if (this.liabilitiesForm) {
      this.liabilitiesForm.current.resetForm();
    }
    if (this.insuranceForm) {
      this.insuranceForm.current.resetForm();
    }
  }

  public handleSubmitForm = () => {
    if (this.basicInformationForm && this.basicInformationForm.current) {
      this.basicInformationForm.current.props.submitForm();
    }
    if (this.incomeForm) {
      this.incomeForm.current.submitForm();
    }
    if (this.expenditureForm) {
      this.expenditureForm.current.submitForm();
    }
    if (this.assetsForm) {
      this.assetsForm.current.submitForm();
    }
    if (this.liabilitiesForm) {
      this.liabilitiesForm.current.submitForm();
    }
    if (this.insuranceForm) {
      this.insuranceForm.current.submitForm();
    }

    // Make sure all forms already submitted.
    const { updateDataEntry, pageData, tagName, tabName } = this.props;
    setTimeout(() => {
      if (isFunction(updateDataEntry)) {
        updateDataEntry({ ...pageData, ...this.state.formData, tagName, tabName });
      }
    }, 0);
  }

  public render() {
    const { pageData, loading, maritalStatus, assets, empStatus, submitting, clientId } = this.props;
    const dynamicCustomValue = pick(pageData, ['inflationCPI', 'salaryInflation', 'sgcRate', 'benefitDefaultAge']);

    return (
      <>
        <Formik
          onSubmit={(values: any, actions: FormikActions<any>) => {
            // set state
            this.updateFormData(values);
          }}
          initialValues={{ basicInformation: pageData ? addKeyToArray(pageData.basicInformation || []) : [] }}
          enableReinitialize={true}
          render={(props: FormikProps<any>) => {
            const addRow = (row: any) => {
              const basicInformation = [...props.values.basicInformation];
              basicInformation.push(row);

              props.setFieldValue('basicInformation', basicInformation);
            };
            const deleteRow = (key: number) => {
              const basicInformation = props.values.basicInformation.filter((info: any) => info.key !== key);

              props.setFieldValue('basicInformation', basicInformation);
            };

            return (
              <Form>
                <BasicInformationTable
                  submitForm={props.submitForm}
                  resetForm={props.resetForm}
                  setFieldValue={props.setFieldValue}
                  data={(props && props.values && props.values.basicInformation) || []}
                  loading={loading}
                  addRow={addRow}
                  deleteRow={deleteRow}
                  ref={this.basicInformationForm}
                />
              </Form>
            );
          }}
        />
        <Formik
          onSubmit={(values: any, actions: FormikActions<any>) => {
            // set state
            this.updateFormData(values);
          }}
          initialValues={{ income: pageData ? addKeyToArray(pageData.income || []) : [] }}
          enableReinitialize={true}
          render={(props: FormikProps<any>) => {
            const addRow = (row: any) => {
              const income = [...props.values.income];
              income.unshift(row);

              props.setFieldValue('income', income);
            };
            const deleteRow = (key: number) => {
              const income = props.values.income.filter((info: any) => info.key !== key);

              props.setFieldValue('income', income);
            };

            return (
              <Form>
                <IncomeTable
                  submitForm={props.submitForm}
                  resetForm={props.resetForm}
                  setFieldValue={props.setFieldValue}
                  data={(props && props.values && props.values.income) || []}
                  loading={loading}
                  addRow={addRow}
                  deleteRow={deleteRow}
                  ref={this.incomeForm}
                  maritalStatus={maritalStatus}
                  dynamicCustomValue={dynamicCustomValue}
                  clientId={clientId}
                />
              </Form>
            );
          }}
        />
        <Formik
          onSubmit={(values: any, actions: FormikActions<any>) => {
            // set state
            this.updateFormData(values);
          }}
          initialValues={{ expenditure: pageData ? addKeyToArray(pageData.expenditure || []) : [] }}
          enableReinitialize={true}
          render={(props: FormikProps<any>) => {
            const addRow = (row: any) => {
              const expenditure = [...props.values.expenditure];
              expenditure.unshift(row);

              props.setFieldValue('expenditure', expenditure);
            };
            const deleteRow = (key: number) => {
              const expenditure = props.values.expenditure.filter((exp: any) => exp.key !== key);

              props.setFieldValue('expenditure', expenditure);
            };

            return (
              <Form>
                <ExpenditureTable
                  submitForm={props.submitForm}
                  resetForm={props.resetForm}
                  setFieldValue={props.setFieldValue}
                  data={(props && props.values && props.values.expenditure) || []}
                  loading={loading}
                  addRow={addRow}
                  deleteRow={deleteRow}
                  ref={this.expenditureForm}
                  maritalStatus={maritalStatus}
                  dynamicCustomValue={dynamicCustomValue}
                  clientId={clientId}
                />
              </Form>
            );
          }}
        />
        <Formik
          onSubmit={(values: any, actions: FormikActions<any>) => {
            // set state
            this.updateFormData(values);
          }}
          initialValues={{ assets: pageData ? addKeyToArray(pageData.assets || []) : [] }}
          enableReinitialize={true}
          render={(props: FormikProps<any>) => {
            const addRow = (row: any) => {
              const assetsFormValue = [...props.values.assets];
              assetsFormValue.unshift(row);

              props.setFieldValue('assets', assetsFormValue);
              this.updateAssets(assetsFormValue);
            };
            const deleteRow = (key: number) => {
              const assetsFormValue = props.values.assets.filter((asset: any) => asset.key !== key);

              props.setFieldValue('assets', assetsFormValue);
              this.updateAssets(assetsFormValue);
            };

            return (
              <Form>
                <AssetsTable
                  submitForm={props.submitForm}
                  resetForm={props.resetForm}
                  setFieldValue={props.setFieldValue}
                  data={(props && props.values && props.values.assets) || []}
                  loading={loading}
                  addRow={addRow}
                  deleteRow={deleteRow}
                  ref={this.assetsForm}
                  maritalStatus={maritalStatus}
                  dynamicCustomValue={dynamicCustomValue}
                  updateAssets={this.updateAssets}
                  empStatus={empStatus}
                  clientId={clientId}
                />
              </Form>
            );
          }}
        />{' '}
        <Formik
          onSubmit={(values: any, actions: FormikActions<any>) => {
            // set state
            this.updateFormData(values);
          }}
          initialValues={{ liabilities: pageData ? addKeyToArray(pageData.liabilities || []) : [] }}
          enableReinitialize={true}
          render={(props: FormikProps<any>) => {
            const addRow = (row: any) => {
              const liabilities = [...props.values.liabilities];
              liabilities.unshift(row);

              props.setFieldValue('liabilities', liabilities);
            };
            const deleteRow = (key: number) => {
              const liabilities = props.values.liabilities.filter((asset: any) => asset.key !== key);

              props.setFieldValue('liabilities', liabilities);
            };

            return (
              <Form>
                <LiabilitiesTable
                  submitForm={props.submitForm}
                  resetForm={props.resetForm}
                  setFieldValue={props.setFieldValue}
                  data={(props && props.values && props.values.liabilities) || []}
                  loading={loading}
                  addRow={addRow}
                  deleteRow={deleteRow}
                  ref={this.liabilitiesForm}
                  maritalStatus={maritalStatus}
                  assets={assets || []}
                  clientId={clientId}
                />
              </Form>
            );
          }}
        />
        <Formik
          onSubmit={(values: any, actions: FormikActions<any>) => {
            // set state
            this.updateFormData(values);
          }}
          initialValues={{ insurance: pageData ? addKeyToArray(pageData.insurance || []) : [] }}
          enableReinitialize={true}
          render={(props: FormikProps<any>) => {
            const addRow = (row: any) => {
              const insurance = [...props.values.insurance];
              insurance.unshift(row);

              props.setFieldValue('insurance', insurance);
            };
            const deleteRow = (key: number) => {
              const insurance = props.values.insurance.filter((asset: any) => asset.key !== key);

              props.setFieldValue('insurance', insurance);
            };

            return (
              <Form>
                <InsuranceTable
                  submitForm={props.submitForm}
                  resetForm={props.resetForm}
                  setFieldValue={props.setFieldValue}
                  data={(props && props.values && props.values.insurance) || []}
                  loading={loading}
                  addRow={addRow}
                  deleteRow={deleteRow}
                  ref={this.insuranceForm}
                  maritalStatus={maritalStatus}
                  dynamicCustomValue={dynamicCustomValue}
                  clientId={clientId}
                />
              </Form>
            );
          }}
        />
        <ActionTableGeneral visible={true}>
          <Button htmlType={'button'} type={'default'} onClick={this.handleDiscardForm}>
            <Icon type="close" />
            <span>Discard</span>
          </Button>
          <Button htmlType={'submit'} type={'primary'} onClick={this.handleSubmitForm} loading={submitting}>
            {!submitting && <Icon type="check" />}
            <span>Submit</span>
          </Button>
        </ActionTableGeneral>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: DataEntryProps) => {
  let pageData;
  const clients = state.client.get('clients');
  const assets = state.client.get('assets');
  const maritalStatus = state.client.get('maritalStatus');
  const empStatus = state.client.get('empStatus');
  const loading = state.client.get('loading');
  const submitting = state.client.get('submitting');
  const clientId = ownProps.clientId;
  const tagName = ownProps.tagName;
  const tabName = ownProps.tabName;
  const client: Client | undefined = find(clients, (c: Client) => c.clientId === clientId);

  if (tabName && client && client.tagList && client.tagList.length > 0) {
    const tag: Tag | undefined = find(client.tagList, (t: Tag) => t.name === tagName);
    if (tag && tag.dataEntries && tag.dataEntries.length > 0) {
      const dataEntry: DataEntry | undefined = find(tag.dataEntries, (d: DataEntry) => d.tabName === tabName);
      if (dataEntry) {
        pageData = dataEntry.pageData;
      }
    }
  }

  return {
    pageData,
    loading,
    submitting,
    maritalStatus,
    assets,
    empStatus,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<StandardAction<any>>) =>
  bindActionCreators(
    {
      updateDataEntry: ClientActions.updateDataEntry,
      updateMaritalStatus: ClientActions.updateMaritalStatus,
      updateEmpStatus: ClientActions.updateEmpStatus,
      updateAssets: ClientActions.updateAssets,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataEntryComponent);
