import React from 'react';
import { connect } from 'formik';
import { Card, Icon } from 'antd';
import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import { CardFeesStep, FeesTable, FeesRowHead, FeesColBoldItem, FeesColItem, FeesRow, FeesColCenterItem } from './styled';

const PresentationStep7 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <CardFeesStep>
        <FeesTable>
          <FeesRowHead>
            <FeesColItem>Type</FeesColItem>
            <FeesColCenterItem>Description</FeesColCenterItem>
            <FeesColCenterItem>Amount</FeesColCenterItem>
          </FeesRowHead>
          <FeesRow>
            <FeesColBoldItem>Initial Advice </FeesColBoldItem>
            <FeesColItem>
              Relates to the skills, expertise and resources of our advisers and specialist consultants (where required)
              to formulate, model and document strategies for your financial life strategy.
            </FeesColItem>
            <FeesColCenterItem>SoA Preparation Fee - $500</FeesColCenterItem>
          </FeesRow>
          <FeesRow>
            <FeesColBoldItem>Advice and Service</FeesColBoldItem>
            <FeesColItem>
              This relates to ongoing advice and services required to keep your Financial Life Strategy relevant and on
              track. Our client service agreement details these services.{' '}
            </FeesColItem>
            <FeesColCenterItem>Ongoing adviser service fee -$2,200</FeesColCenterItem>
          </FeesRow>
          <FeesRow>
            <FeesColBoldItem>Investments and Platform</FeesColBoldItem>
            <FeesColItem>
              These are the costs charged by investment administration services and fund managers. This information is
              contained in product disclosure statements.
            </FeesColItem>
            <FeesColCenterItem>
              CFS Investment – 0.65%$325 based on current balance.CFS Super – 0.87%3,498 based on current balance.
            </FeesColCenterItem>
          </FeesRow>
        </FeesTable>
      </CardFeesStep>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep7);
