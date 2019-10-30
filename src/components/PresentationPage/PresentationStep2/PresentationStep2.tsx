import React from 'react';
import { connect } from 'formik';
import { Card, Icon } from 'antd';
import { StepWrapper } from '../styled';
import { Doughnut, Bar } from 'react-chartjs-2';

import { DocumentData, FormikPartProps } from '../PresentationPage';
import DocumentSwitcher from '../DocumentSwitcher';

import {
  StepCurrentPosition,
  StepPositionLeft,
  StepPositionTop,
  StepPositionRight,
  IcomeBlockStep,
  TitlePositionStep,
  CardChartPositionStep,
  CardPointPositionStep,
  StepPositionBottom,
  ValPositionStep,
  KeyPoitItem,
  CardResultsPositionStep,
  KeyPoitList,
  ExpensesBlockStep,
  AssetsBlockStep,
  LiabilitiesBlockStep,
  DoughnutDesc,
  LineDoughnut,
  LineDoughnutText,
} from './styled';

const dataDoughnut = {
  labels: ['Salary'],
  datasets: [
    {
      data: [120000],
      backgroundColor: ['#2bd8c4', '#2bd8c4', '#8269f8', '#2e98ff'],
      hoverBackgroundColor: ['#2bd8c4', '#2bd8c4', '#8269f8', '#2e98ff'],
    },
  ],
};
const optionsDoughnut = {
  plotOptions: {
    pie: {
      customScale: 1,
      offsetX: 0,
      offsetY: 0,
      expandOnClick: false,
      dataLabels: {
        offset: 0,
        minAngleToShowLabel: 10,
      },
    },
  },
};
const seriesBarInsurance = {
  labels: ['Life', 'TPD', 'Trauma', 'IP'],
  datasets: [
    {
      label: 'Insurance cover',
      backgroundColor: '#2e98ff',
      borderColor: '#2e98ff',
      borderWidth: 1,
      data: [ 500000, 500000, 150000, 840000 ],
    },
    {
      label: 'Needs analysis',
      backgroundColor: 'rgba(255,99,132,1)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      data: [ 500000, 500000, 150000, 840000 ],
    },
  ],
};

const PresentationStep2 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <StepCurrentPosition>
        <StepPositionLeft>
          <StepPositionTop>
            <IcomeBlockStep>
              <TitlePositionStep>Income</TitlePositionStep>
              <ValPositionStep>$120,000</ValPositionStep>
            </IcomeBlockStep>
            <ExpensesBlockStep>
              <TitlePositionStep>Expenses</TitlePositionStep>
              <ValPositionStep>$69,043</ValPositionStep>
            </ExpensesBlockStep>
            <AssetsBlockStep>
              <TitlePositionStep>Assets</TitlePositionStep>
              <ValPositionStep>$1,390,000</ValPositionStep>
            </AssetsBlockStep>
            <LiabilitiesBlockStep>
              <TitlePositionStep>Liabilities</TitlePositionStep>
              <ValPositionStep>$300,000</ValPositionStep>
            </LiabilitiesBlockStep>
          </StepPositionTop>
          <StepPositionBottom>
            <Doughnut options={optionsDoughnut} data={dataDoughnut} />
            <DoughnutDesc>
              <LineDoughnut>$120,000</LineDoughnut>
              <LineDoughnutText>Income</LineDoughnutText>
            </DoughnutDesc>
          </StepPositionBottom>
        </StepPositionLeft>
        <StepPositionRight>
          <StepPositionTop>
            <CardChartPositionStep>
              <Card title="Key Chart" bordered={false} style={{ width: '100%' }}>
                <Bar
                  data={seriesBarInsurance}
                  width={200}
                  height={100}
                  options={{
                    maintainAspectRatio: 1,
                  }}
                />
              </Card>
            </CardChartPositionStep>
            <CardPointPositionStep>
              <Card title="Key Point" bordered={false} style={{ width: '100%' }}>
                <KeyPoitList>
                  <KeyPoitItem>
                    <Icon type="check" />
                    WiLB
                  </KeyPoitItem>
                  <KeyPoitItem>
                    <Icon type="check" />
                    POA
                  </KeyPoitItem>
                  <KeyPoitItem>
                    <Icon type="exclamation" />
                    Death benefit nomination
                  </KeyPoitItem>
                  <KeyPoitItem>
                    <Icon type="exclamation" />
                    Sample lable
                  </KeyPoitItem>
                </KeyPoitList>
              </Card>
            </CardPointPositionStep>
          </StepPositionTop>
          <CardResultsPositionStep>
            <Card title="Key results">
              <Card.Grid>Review your superannuation</Card.Grid>
              <Card.Grid>Retire by the age of 60</Card.Grid>
              <Card.Grid>Review your debt obligations</Card.Grid>
              <Card.Grid>Review your Investment portfolio</Card.Grid>
              <Card.Grid>Review Estate Planning arrangements</Card.Grid>
              <Card.Grid>Review exsting insurance polices</Card.Grid>
            </Card>
          </CardResultsPositionStep>
        </StepPositionRight>
      </StepCurrentPosition>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep2);
