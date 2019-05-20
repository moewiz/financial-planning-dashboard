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
import { find, map, isArray } from 'lodash';
import {
  Client,
  Tag,
  FetchDataEntryPayload,
  FetchDataEntryAction,
  ClientActions,
  Table,
  DataEntry,
  UpdateMaritalStateAction,
} from '../../reducers/client';
import { Button, Icon } from 'antd';
import { ActionTableGeneral } from '../../pages/client/styled';

interface DataEntryProps {
  clientId: string;
  tagName: string;
  tabName: string;
  maritalState: string;

  tables?: Table;
  loading?: boolean;
  fetchDataEntry?: (payload: FetchDataEntryPayload) => FetchDataEntryAction;
  updateMaritalState?: (maritalState: string) => UpdateMaritalStateAction;
}

interface DataEntryState {
  formData: Table;
}

export const addKeyToArray = (array: object[], defaultValue?: any) => {
  if (isArray(array)) {
    return map(array, (d, index: number) => ({ key: index, ...d }));
  }

  return defaultValue;
};

class DataEntryComponent extends PureComponent<DataEntryProps> {
  public static defaultProps = {
    maritalState: '',
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

  public componentDidMount() {
    const { clientId, tagName, tabName, fetchDataEntry } = this.props;

    if (clientId && tagName && tabName && fetchDataEntry) {
      this.fetchDataEntry({ clientId, tagName, tabName });
    }
  }

  public componentDidUpdate(prevProps: Readonly<DataEntryProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const { clientId, tagName, tabName } = this.props;

    if (prevProps.clientId !== clientId || prevProps.tagName !== tagName || prevProps.tabName !== tabName) {
      this.fetchDataEntry({ clientId, tagName, tabName });
    }
  }

  public fetchDataEntry = (params: { clientId: string; tagName: string; tabName: string }) => {
    const { fetchDataEntry } = this.props;

    if (fetchDataEntry) {
      fetchDataEntry(params);
    }
  }

  public componentWillUnmount(): void {
    const { updateMaritalState } = this.props;
    // update marital state in redux store
    if (updateMaritalState) {
      updateMaritalState('');
    }
  }

  public handleDiscardForm = () => {
    if (this.basicInformationForm) {
      this.basicInformationForm.current.resetForm();
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
    console.log('handle discard form');
  }

  public handleSubmitForm = () => {
    if (this.basicInformationForm) {
      this.basicInformationForm.current.submitForm();
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
    console.log('handle submit form', this.state.formData);
  }

  public render() {
    const { tables, loading, maritalState } = this.props;

    return (
      <>
        <Formik
          onSubmit={(values: any, actions: FormikActions<any>) => {
            // set state
            console.log(values);
            this.updateFormData(values);
          }}
          initialValues={{ basicInformation: tables ? addKeyToArray(tables.basicInformation || []) : [] }}
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
          initialValues={{ income: tables ? addKeyToArray(tables.income || []) : [] }}
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
                  maritalState={maritalState}
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
          initialValues={{ expenditure: tables ? addKeyToArray(tables.expenditure || []) : [] }}
          enableReinitialize={true}
          render={(props: FormikProps<any>) => {
            const addRow = (row: any) => {
              const expenditure = [...props.values.expenditure];
              expenditure.unshift(row);

              props.setFieldValue('expenditure', expenditure);
            };
            const deleteRow = (key: number) => {
              const expenditure = props.values.expenditure.filter((asset: any) => asset.key !== key);

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
                  maritalState={maritalState}
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
          initialValues={{ assets: tables ? addKeyToArray(tables.assets || []) : [] }}
          enableReinitialize={true}
          render={(props: FormikProps<any>) => {
            const addRow = (row: any) => {
              const assets = [...props.values.assets];
              assets.unshift(row);

              props.setFieldValue('assets', assets);
            };
            const deleteRow = (key: number) => {
              const assets = props.values.assets.filter((asset: any) => asset.key !== key);

              props.setFieldValue('assets', assets);
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
                  maritalState={maritalState}
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
          initialValues={{ liabilities: tables ? addKeyToArray(tables.liabilities || []) : [] }}
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
                  maritalState={maritalState}
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
          initialValues={{ insurance: tables ? addKeyToArray(tables.insurance || []) : [] }}
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
                  maritalState={maritalState}
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
          <Button htmlType={'submit'} type={'primary'} onClick={this.handleSubmitForm}>
            <Icon type="check" />
            <span>Submit</span>
          </Button>
        </ActionTableGeneral>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: DataEntryProps) => {
  let tables;
  const clients = state.client.get('clients');
  const maritalState = state.client.get('maritalState');
  const loading = state.client.get('loading');
  const clientId = ownProps.clientId;
  const tagName = ownProps.tagName;
  const tabName = ownProps.tabName;
  const client: Client | undefined = find(clients, (c: Client) => c.clientId === clientId);

  if (tabName && client && client.tagList && client.tagList.length > 0) {
    const tag: Tag | undefined = find(client.tagList, (t: Tag) => t.name === tagName);
    if (tag && tag.dataEntries && tag.dataEntries.length > 0) {
      const dataEntry: DataEntry | undefined = find(tag.dataEntries, (d: DataEntry) => d.tabName === tabName);
      if (dataEntry) {
        tables = dataEntry.tables;
      }
    }
  }

  return {
    tables,
    loading,
    maritalState,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<StandardAction<any>>) =>
  bindActionCreators(
    {
      fetchDataEntry: ClientActions.fetchDataEntry,
      updateMaritalState: ClientActions.updateMaritalState,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataEntryComponent);
