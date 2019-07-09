import React from 'react';
import { get } from 'lodash';
import StrategyHeader from './StrategyHeader';
import StrategyContainer from './StrategyContainer';
import { StrategyTypes } from '../../enums/strategies';
import { StrategyPageWrapper } from './styled';
import { StrategyEntry } from '../../reducers/client';
import DrawerContainer from './Drawer/DrawerContainer';
import { Form, Formik, FormikActions, FormikProps } from 'formik';
import { Button, Icon } from 'antd';
import { ActionTableGeneral } from '../../pages/client/styled';

interface StrategyPageProps {
  clientId: number;

  pageData: StrategyEntry;
}

const StrategyPage = (props: StrategyPageProps) => {
  const { pageData } = props;
  const superannuation = get(pageData, 'superannuation');
  const pension = get(pageData, 'pension');
  const investments = get(pageData, 'investments');
  const debt = get(pageData, 'debt');
  const centrelink = get(pageData, 'centrelink');
  const insurance = get(pageData, 'insurance');
  const estatePlanning = get(pageData, 'estatePlanning');

  return (
    <StrategyPageWrapper>
      <Formik
        onSubmit={(values: StrategyEntry, actions: FormikActions<StrategyEntry>) => {
          console.log('submitted', values);
          actions.setSubmitting(false);
        }}
        initialValues={{ superannuation, pension, investments, debt, centrelink, insurance, estatePlanning }}
        enableReinitialize={true}
        render={(formikProps: FormikProps<StrategyEntry>) => (
          <Form>
            <StrategyHeader />
            {formikProps.values.superannuation && (
              <StrategyContainer
                type={StrategyTypes.Superannuation}
                information={formikProps.values.superannuation}
                strategies={formikProps.values.superannuation.strategies}
              />
            )}
            {formikProps.values.pension && (
              <StrategyContainer
                type={StrategyTypes.Pensions}
                information={formikProps.values.pension}
                strategies={formikProps.values.pension.strategies}
              />
            )}
            {formikProps.values.investments && (
              <StrategyContainer
                type={StrategyTypes.Investments}
                information={formikProps.values.investments}
                strategies={formikProps.values.investments.strategies}
              />
            )}
            {formikProps.values.debt && (
              <StrategyContainer
                type={StrategyTypes.Debt}
                information={formikProps.values.debt}
                strategies={formikProps.values.debt.strategies}
              />
            )}
            {formikProps.values.centrelink && (
              <StrategyContainer
                type={StrategyTypes.Centrelink}
                information={formikProps.values.centrelink}
                strategies={formikProps.values.centrelink.strategies}
              />
            )}
            {formikProps.values.insurance && (
              <StrategyContainer
                type={StrategyTypes.Insurance}
                information={formikProps.values.insurance}
                strategies={formikProps.values.insurance.strategies}
              />
            )}
            {formikProps.values.estatePlanning && (
              <StrategyContainer
                type={StrategyTypes.EstatePlanning}
                information={formikProps.values.estatePlanning}
                strategies={formikProps.values.estatePlanning.strategies}
              />
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
