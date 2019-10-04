import React from 'react';
import { Table } from 'antd';
import { connect } from 'formik';

import {
  TitleStep,
  TitleStepSmall,
  StepWrapper,
} from '../styled';
import {
  DocumentsStep7WP,
} from './styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';

class DocumentsStep7 extends React.PureComponent<FormikPartProps> {
  public dataSource = [
    {
      key: '1',
      description: 'Preparation fee',
      cost: '',
      amount: '',
      pratice: '',
      advisor: '',
    },
    {
      key: '2',
      description: 'Ongoing advisor service fee',
      cost: '',
      amount: '',
      pratice: '',
      advisor: '',
    },
    {
      key: '3',
      description: 'Enter Desciption',
      cost: '',
      amount: '',
      pratice: '',
      advisor: '',
    },
  ];
  public columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Cost to you',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'Calculation of amount reviewed by us',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Practice retainer',
      dataIndex: 'pratice',
      key: 'pratice',
    },
    {
      title: 'Advisor retainer',
      dataIndex: 'advisor',
      key: 'advisor',
    },
  ];
  public render(): JSX.Element {
    return (
      <StepWrapper>
        <TitleStep>Cost of advice</TitleStep>
        <TitleStepSmall>List the costs to the client associated with preparing this advice</TitleStepSmall>
        <DocumentsStep7WP>
          <Table
            className={`table-general documents-table`}
            columns={this.columns}
            dataSource={this.dataSource}
            pagination={false}
          />
        </DocumentsStep7WP>
    </StepWrapper>
    );
  }
}

export default connect<{}, DocumentData>(DocumentsStep7);
