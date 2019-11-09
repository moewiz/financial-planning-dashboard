import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'formik';
import { Card, Icon, Table } from 'antd';
import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import { map } from 'lodash';
import {CardFeesStep, FeesTable, CardListStep7, CardStep7Container, CardItemStyled} from './styled';
import {
  StatisticGroup,
  StatisticLabel,
  StatisticUpDown,
  StatisticValue,
  StatisticWrapper,
} from '../../StrategyPage/styled';

interface CardItem {
  title: string;
  subTitle: string;
  value: string;
  isIncrease: boolean;
  delta: string;
}

const cardLists: CardItem[] = [
  {
    title: 'Net Assets',
    subTitle: '10 year change',
    value: '$ 119,533',
    isIncrease: true,
    delta: '9.23%',
  },
  {
    title: 'Cashflow',
    subTitle: '10 year change',
    value: '$ 6,937',
    isIncrease: false,
    delta: '0.86%',
  },
  {
    title: 'Tax',
    subTitle: '10 year change',
    value: '$ 17,144',
    isIncrease: false,
    delta: '11.4%',
  },
  {
    title: 'Retirement Funding',
    subTitle: 'Funds last until',
    value: '2042',
    isIncrease: true,
    delta: '4 years',
  },
];
const dataSource = [
  {
    key: '1',
    type: 'SoA Preparation Fee',
    fee: ['$1500'],
  },
  {
    key: '2',
    type: 'Ongoing services Fee',
    fee: ['$2,200'],
  },
  {
    key: '3',
    type: 'Investments and Platform Fee',
    fee: ['CFS Investment $325 (0.65%)', 'CFS Super $3,498( 0.87)'],
  },
];

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: '50%',
    className: 'fees-col-type',
  },
  {
    title: 'Fee',
    dataIndex: 'fee',
    key: 'fee',
    width: '0%',
    className: 'fees-col-fee',
    render: (texts: string[]) => (
      <div>
        {texts.map((text: string) => {
          return <p key={text}>{text}</p>;
        })}
      </div>
    ),
  },
];
const PresentationStep7 = (props: FormikPartProps) => {
  const [slideNumber, setSlideNumber] = useState<number>(-1);
  const onClickCard = (index: number) => () => {
    setSlideNumber(index);
  };

  return (
    <StepWrapper>
      <CardFeesStep>
        <CardListStep7>
          {map(cardLists, (card: CardItem, index: number) => (
            <CardItemStyled key={index}>
              <StatisticLabel style={{ fontSize: 16 }}>{card.title}</StatisticLabel>
              <StatisticLabel style={{ color: '#000' }}>{card.subTitle}</StatisticLabel>
              <StatisticValue>{card.value}</StatisticValue>
              <StatisticUpDown>
                {card.isIncrease ? <Icon type="caret-up" /> : <Icon type="caret-down" />}
                {' ' + card.delta}
              </StatisticUpDown>
            </CardItemStyled>
          ))}
        </CardListStep7>
        <FeesTable>
          <Table
            className={'table-general documents-table'}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
        </FeesTable>
        <CardStep7Container>
          <Card title="Our Ongoing Services" bordered={false}>
            <p>
              At Always Right, we want you to live more and worry less. This is why we have a program of ongoing support
              which is designed to give you peace of mind and confidence that your financial affairs are in good hands.
            </p>
            <p>We partner with you to achieve your lifestyle goals - life should be more than just survival.</p>
          </Card>
        </CardStep7Container>
      </CardFeesStep>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep7);
