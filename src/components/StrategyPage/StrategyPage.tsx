import React, { useCallback, useEffect, useState } from 'react';
import { get, values } from 'lodash';
import { Formik, FormikActions, FormikProps } from 'formik';
import { Button, Collapse, Icon, Row } from 'antd';

import { StrategyEntry } from '../../reducers/client';
import { StrategyTypes } from '../../enums/strategies';
import { StrategyPageWrapper, TitleStrategyBlock, FormWrapper, PanelWrapper } from './styled';
import { ActionTableGeneral } from '../../pages/client/styled';
import StrategyHeader from './StrategyHeader';
import StrategyContainer from './StrategyContainer';
import DrawerContainer from './Drawer/DrawerContainer';
import { Lock } from '../Icons';

interface StrategyPageProps {
  clientId: number;

  pageData: StrategyEntry;
}

export const getStrategyTitle = (type: StrategyTypes) => {
  switch (type) {
    case StrategyTypes.Superannuation:
      return 'Superannuation';
    case StrategyTypes.Pensions:
      return 'Pensions';
    case StrategyTypes.Investments:
      return 'Investments (non-super)';
    case StrategyTypes.Debt:
      return 'Debt';
    case StrategyTypes.Centrelink:
      return 'Centrelink';
    case StrategyTypes.Insurance:
      return 'Insurance';
    case StrategyTypes.EstatePlanning:
      return 'Estate Planning';
    default:
      return '';
  }
};

const StrategyPage = (props: StrategyPageProps) => {
  const [pinned, setPinned] = useState<boolean>(false);
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
  const graphs = document.getElementById('header-graphs');

  useEffect(() => {
    if (graphs) {
      if (pinned) {
        const sticky = graphs.offsetTop;
        const strategyForm = document.getElementById('strategy-form');

        window.onscroll = () => {
          if (window.pageYOffset >= sticky) {
            graphs.classList.add('sticky');
            if (strategyForm) {
              strategyForm.classList.add('paddingTop');
            }
          } else {
            graphs.classList.remove('sticky');
            if (strategyForm) {
              strategyForm.classList.remove('paddingTop');
            }
          }
        };
      } else {
        graphs.classList.remove('sticky');
      }
    }

    return () => {
      window.onscroll = null;
    };
  }, [graphs, pinned]);

  const togglePinned = useCallback(() => {
    setPinned((p) => !p);
  }, []);
  const defaultActiveKey = values(StrategyTypes).filter((i) => i !== StrategyTypes.Centrelink);

  return (
    <StrategyPageWrapper>
      <Lock lock={pinned} onClick={togglePinned} />
      <div id="header-graphs">
        <StrategyHeader
          netAssets={netAssets}
          cashflowComparisons={cashflowComparisons}
          tax={tax}
          retirementFunding={retirementFunding}
        />
      </div>
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
          <FormWrapper id="strategy-form">
            <Collapse defaultActiveKey={defaultActiveKey} bordered={false}>
              <PanelWrapper
                key={StrategyTypes.Superannuation}
                header={<TitleStrategyBlock>{getStrategyTitle(StrategyTypes.Superannuation)}</TitleStrategyBlock>}
              >
                {formikProps.values.superannuation && defaultFullValue && (
                  <StrategyContainer type={StrategyTypes.Superannuation} defaultFullValue={defaultFullValue} />
                )}
              </PanelWrapper>
              <PanelWrapper
                key={StrategyTypes.Pensions}
                header={<TitleStrategyBlock>{getStrategyTitle(StrategyTypes.Pensions)}</TitleStrategyBlock>}
              >
                {formikProps.values.pension && defaultFullValue && (
                  <StrategyContainer type={StrategyTypes.Pensions} defaultFullValue={defaultFullValue} />
                )}
              </PanelWrapper>
              <PanelWrapper
                key={StrategyTypes.Investments}
                header={<TitleStrategyBlock>{getStrategyTitle(StrategyTypes.Investments)}</TitleStrategyBlock>}
              >
                {formikProps.values.investments && defaultFullValue && (
                  <StrategyContainer type={StrategyTypes.Investments} defaultFullValue={defaultFullValue} />
                )}
              </PanelWrapper>
              <PanelWrapper
                key={StrategyTypes.Debt}
                header={<TitleStrategyBlock>{getStrategyTitle(StrategyTypes.Debt)}</TitleStrategyBlock>}
              >
                {formikProps.values.debt && defaultFullValue && (
                  <StrategyContainer type={StrategyTypes.Debt} defaultFullValue={defaultFullValue} />
                )}
              </PanelWrapper>
              <PanelWrapper
                key={StrategyTypes.Centrelink}
                header={<TitleStrategyBlock>{getStrategyTitle(StrategyTypes.Centrelink)}</TitleStrategyBlock>}
              >
                {formikProps.values.centrelink && defaultFullValue && (
                  <StrategyContainer type={StrategyTypes.Centrelink} defaultFullValue={defaultFullValue} />
                )}
              </PanelWrapper>
              <PanelWrapper
                key={StrategyTypes.Insurance}
                header={<TitleStrategyBlock>{getStrategyTitle(StrategyTypes.Insurance)}</TitleStrategyBlock>}
              >
                {formikProps.values.insurance && defaultFullValue && (
                  <StrategyContainer type={StrategyTypes.Insurance} defaultFullValue={defaultFullValue} />
                )}
              </PanelWrapper>
              <PanelWrapper
                key={StrategyTypes.EstatePlanning}
                header={<TitleStrategyBlock>{getStrategyTitle(StrategyTypes.EstatePlanning)}</TitleStrategyBlock>}
              >
                {formikProps.values.estatePlanning && defaultFullValue && (
                  <StrategyContainer type={StrategyTypes.EstatePlanning} defaultFullValue={defaultFullValue} />
                )}
              </PanelWrapper>
            </Collapse>
            <ActionTableGeneral visible>
              <Button htmlType={'submit'} type={'primary'} disabled={formikProps.isSubmitting || !formikProps.dirty}>
                <Icon type="check" />
                <span>Submit</span>
              </Button>
            </ActionTableGeneral>
          </FormWrapper>
        )}
      />
      <DrawerContainer />
    </StrategyPageWrapper>
  );
};

export default StrategyPage;
