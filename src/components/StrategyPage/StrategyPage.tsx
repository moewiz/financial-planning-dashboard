import React from 'react';
import { get } from 'lodash';
import { Form, Formik, FormikActions, FormikProps } from 'formik';
import { Button, Icon } from 'antd';

import { StrategyEntry } from '../../reducers/client';
import { StrategyTypes } from '../../enums/strategies';
import { StrategyPageWrapper } from './styled';
import { ActionTableGeneral } from '../../pages/client/styled';
import StrategyHeader from './StrategyHeader';
import StrategyContainer from './StrategyContainer';
import DrawerContainer from './Drawer/DrawerContainer';

interface StrategyPageProps {
  clientId: number;

  pageData: StrategyEntry;
}

const StrategyPage = (props: StrategyPageProps) => {
  const { pageData } = props;
  const netAssets = get(pageData, 'netAssets');
  const cashflowComparisons = get(pageData, 'cashflowComparisons');
  const tax = get(pageData, 'tax');
  const retirementFunding = get(pageData, 'retirementFunding');
  const superannuation = get(pageData, 'superannuation');
  const pension = get(pageData, 'pension');
  const investments = get(pageData, 'investments');
  const debt = get(pageData, 'debt');
  const centrelink = get(pageData, 'centrelink');
  const insurance = get(pageData, 'insurance');
  const estatePlanning = get(pageData, 'estatePlanning');
  const client = pageData.client;
  const partner = pageData.partner;
  const joint = pageData.joint;
  const defaultFullValue = pageData.defaultFullValue;

  return (
    <StrategyPageWrapper>
      <StrategyHeader
        netAssets={netAssets}
        cashflowComparisons={cashflowComparisons}
        tax={tax}
        retirementFunding={retirementFunding}
      />
      <Formik
        onSubmit={(values: StrategyEntry, actions: FormikActions<StrategyEntry>) => {
          console.log('submitted', values);
          actions.setSubmitting(false);
        }}
        initialValues={{
          superannuation,
          pension,
          investments,
          debt,
          centrelink,
          insurance,
          estatePlanning,
          client,
          partner,
          joint,
          netAssets,
          cashflowComparisons,
          tax,
          retirementFunding,
        }}
        enableReinitialize={true}
        render={(formikProps: FormikProps<StrategyEntry>) => (
          <Form>
            {formikProps.values.superannuation && defaultFullValue && (
              <StrategyContainer type={StrategyTypes.Superannuation} defaultFullValue={defaultFullValue} />
            )}
            {formikProps.values.pension && defaultFullValue && (
              <StrategyContainer type={StrategyTypes.Pensions} defaultFullValue={defaultFullValue} />
            )}
            {formikProps.values.investments && defaultFullValue && (
              <StrategyContainer type={StrategyTypes.Investments} defaultFullValue={defaultFullValue} />
            )}
            {formikProps.values.debt && defaultFullValue && (
              <StrategyContainer type={StrategyTypes.Debt} defaultFullValue={defaultFullValue} />
            )}
            {formikProps.values.centrelink && defaultFullValue && (
              <StrategyContainer type={StrategyTypes.Centrelink} defaultFullValue={defaultFullValue} />
            )}
            {formikProps.values.insurance && defaultFullValue && (
              <StrategyContainer type={StrategyTypes.Insurance} defaultFullValue={defaultFullValue} />
            )}
            {formikProps.values.estatePlanning && defaultFullValue && (
              <StrategyContainer type={StrategyTypes.EstatePlanning} defaultFullValue={defaultFullValue} />
            )}
            <ActionTableGeneral visible>
              <Button htmlType={'submit'} type={'primary'} disabled={formikProps.isSubmitting || !formikProps.dirty}>
                <Icon type="check" />
                <span>Submit</span>
              </Button>
            </ActionTableGeneral>
          </Form>
        )}
      />
      <DrawerContainer />
    </StrategyPageWrapper>
  );
};

export default StrategyPage;
