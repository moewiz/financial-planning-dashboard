import React from 'react';
import { connect } from 'formik';
import { Card, Icon, Table } from 'antd';
import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import {
  CardFeesStep,
  FeesTable,
  FeesRowHead,
  FeesColBoldItem,
  FeesColItem,
  FeesRow,
  FeesColCenterItem,
} from './styled';

const dataSource = [
  {
    key: '1',
    type: 'Initial Advice',
    description:
      'Relates to the skills, expertise and resources of our advisers and specialist consultants (where required) to formulate, model and document strategies for your financial life strategy.',
    amount: 'SoA Preparation Fee - $500',
  },
  {
    key: '2',
    type: 'Advice and Service',
    description:
      'This relates to ongoing advice and services required to keep your Financial Life Strategy relevant and on track. Our client service agreement details these services.',
    amount: 'Ongoing adviser service fee -$2,200',
  },
  {
    key: '3',
    type: 'Investments and Platform',
    description:
      'These are the costs charged by investment administration services and fund managers. This information is contained in product disclosure statements.',
    amount: 'CFS Investment – 0.65%$325 based on current balance.CFS Super – 0.87%3,498 based on current balance.',
  },
];

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: '20%',
    className: 'fees-col-type',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: '50%',
    className: 'fees-col-description',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: '30%',
    className: 'fees-col-amount',
  },
];
const PresentationStep7 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <CardFeesStep>
        <FeesTable>
          <Table dataSource={dataSource} columns={columns} />
        </FeesTable>
      </CardFeesStep>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep7);
