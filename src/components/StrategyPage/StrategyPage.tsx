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
  const client = pageData.client;
  const partner = pageData.partner;
  const defaultFullValue = pageData.defaultFullValue;

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
            {formikProps.values.superannuation && client && partner && defaultFullValue && (
              <StrategyContainer
                type={StrategyTypes.Superannuation}
                client={client}
                partner={partner}
                defaultFullValue={defaultFullValue}
              />
            )}
            {formikProps.values.pension && client && partner && defaultFullValue && (
              <StrategyContainer
                type={StrategyTypes.Pensions}
                client={client}
                partner={partner}
                defaultFullValue={defaultFullValue}
              />
            )}
            {formikProps.values.investments && client && partner && defaultFullValue && (
              <StrategyContainer
                type={StrategyTypes.Investments}
                client={client}
                partner={partner}
                defaultFullValue={defaultFullValue}
              />
            )}
            {formikProps.values.debt && client && partner && defaultFullValue && (
              <StrategyContainer
                type={StrategyTypes.Debt}
                client={client}
                partner={partner}
                defaultFullValue={defaultFullValue}
              />
            )}
            {formikProps.values.centrelink && client && partner && defaultFullValue && (
              <StrategyContainer
                type={StrategyTypes.Centrelink}
                client={client}
                partner={partner}
                defaultFullValue={defaultFullValue}
              />
            )}
            {formikProps.values.insurance && client && partner && defaultFullValue && (
              <StrategyContainer
                type={StrategyTypes.Insurance}
                client={client}
                partner={partner}
                defaultFullValue={defaultFullValue}
              />
            )}
            {formikProps.values.estatePlanning && client && partner && defaultFullValue && (
              <StrategyContainer
                type={StrategyTypes.EstatePlanning}
                client={client}
                partner={partner}
                defaultFullValue={defaultFullValue}
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
